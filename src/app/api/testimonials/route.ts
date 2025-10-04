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

// GET - Fetch approved testimonials for public display
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabaseAdmin
      .from('testimonials')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (featured === 'true') {
      query = query.eq('featured', true);
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

// POST - Submit new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      client_name, 
      client_title, 
      client_company, 
      client_email, 
      testimonial_text, 
      rating, 
      service_type, 
      project_description 
    } = body;

    // Validate required fields
    if (!client_name || !client_email || !testimonial_text) {
      return NextResponse.json(
        { error: 'Missing required fields: client_name, client_email, and testimonial_text are required' },
        { status: 400 }
      );
    }

    // Validate rating if provided
    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { data: testimonial, error: dbError } = await supabaseAdmin
      .from('testimonials')
      .insert({
        client_name,
        client_title: client_title || null,
        client_company: client_company || null,
        client_email,
        testimonial_text,
        rating: rating || null,
        service_type: service_type || null,
        project_description: project_description || null,
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to submit testimonial. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Testimonial submitted successfully. Thank you for your feedback!',
        testimonialId: testimonial.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Testimonial submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
