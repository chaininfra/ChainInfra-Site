import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
export const dynamic = 'force-dynamic';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(request: NextRequest) {
  // Return empty array if Supabase is not configured
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json([]);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type || (type !== 'images' && type !== 'videos')) {
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    let bucketName: string;
    let fileExtensions: string[];

    if (type === 'images') {
      bucketName = 'blog-images';
      fileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    } else {
      bucketName = 'blog-videos';
      fileExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    }

    // List all files in the bucket
    const { data: files, error } = await supabase.storage
      .from(bucketName)
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      console.error('Error listing files:', error);
      return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
    }

    if (!files || files.length === 0) {
      return NextResponse.json([]);
    }

    // Filter files by extension and get public URLs
    const mediaFiles = files
      .filter(file => {
        const extension = file.name.toLowerCase();
        return fileExtensions.some(ext => extension.endsWith(ext));
      })
      .map(file => {
        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(file.name);
        
        return publicUrl;
      })
      .filter(Boolean);

    return NextResponse.json(mediaFiles);

  } catch (error) {
    console.error('Error in bucket-media API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
