import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dopqjqrbkqplmmotybwo.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API: Starting upload process');
    
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.error('Upload API: NEXT_PUBLIC_SUPABASE_URL is not defined');
      return NextResponse.json(
        { error: 'Server configuration error: Missing Supabase URL' },
        { status: 500 }
      );
    }
    
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Upload API: SUPABASE_SERVICE_ROLE_KEY is not defined');
      return NextResponse.json(
        { error: 'Server configuration error: Missing Supabase service key' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    console.log('Upload API: File received:', {
      name: file?.name,
      size: file?.size,
      type: file?.type
    });

    if (!file) {
      console.error('Upload API: No file provided');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type - support both images and videos
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov', 'video/quicktime'];
    const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload JPEG, PNG, WebP, GIF for images or MP4, WebM, OGG, AVI, MOV for videos.' },
        { status: 400 }
      );
    }

    // Different size limits for images and videos
    const isVideo = allowedVideoTypes.includes(file.type);
    const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024; // 50MB for videos, 5MB for images
    
    if (file.size > maxSize) {
      const maxSizeText = isVideo ? '50MB' : '5MB';
      return NextResponse.json(
        { error: `File size too large. Please upload ${isVideo ? 'videos' : 'images'} smaller than ${maxSizeText}.` },
        { status: 400 }
      );
    }

    // Generate a safe unique filename: <timestamp>-<slugified-name>.<ext>
    const timestamp = Date.now();
    const original = file.name || 'upload';
    const dot = original.lastIndexOf('.');
    const base = dot > -1 ? original.slice(0, dot) : original;
    const ext = dot > -1 ? original.slice(dot + 1) : '';
    const slugBase = base
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    const safeName = ext ? `${slugBase}.${ext.toLowerCase()}` : slugBase;
    const fileName = `${timestamp}-${safeName}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase Storage
    console.log('Upload API: Uploading to Supabase Storage:', {
      fileName,
      contentType: file.type,
      bufferSize: buffer.length
    });

    const { data, error } = await supabaseAdmin.storage
      .from('blog-images')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload API: Storage error:', {
        message: error.message,
        name: error.name
      });
      return NextResponse.json(
        { error: `Upload failed: ${error.message}` },
        { status: 500 }
      );
    }

    console.log('Upload API: Upload successful:', {
      path: data?.path,
      id: data?.id
    });

    // Use the exact stored path returned by Supabase to derive the public URL
    const storedPath = data?.path || fileName;
    const { data: urlData } = supabaseAdmin.storage
      .from('blog-images')
      .getPublicUrl(storedPath);

    return NextResponse.json({
      success: true,
      path: storedPath,
      url: urlData.publicUrl
    });

  } catch (error: any) {
    console.error('Upload API: Unexpected error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileName } = body;

    if (!fileName) {
      return NextResponse.json(
        { error: 'No file name provided' },
        { status: 400 }
      );
    }

    // Delete from Supabase Storage
    const { error } = await supabaseAdmin.storage
      .from('blog-images')
      .remove([fileName]);

    if (error) {
      console.error('Storage error:', error);
      return NextResponse.json(
        { error: `Delete failed: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
