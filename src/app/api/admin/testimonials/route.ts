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

// GET - Fetch all testimonials for admin management
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabaseAdmin
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: `Failed to fetch testimonials: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update testimonial status (approve/reject/feature)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, featured } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Missing required field: id' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    
    if (status) {
      if (!['pending', 'approved', 'rejected'].includes(status)) {
        return NextResponse.json(
          { error: 'Invalid status. Must be pending, approved, or rejected' },
          { status: 400 }
        );
      }
      updateData.status = status;
    }

    if (featured !== undefined) {
      updateData.featured = Boolean(featured);
    }

    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: `Failed to update testimonial: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete testimonial
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing required parameter: id' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: `Failed to delete testimonial: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Testimonial deleted successfully' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
