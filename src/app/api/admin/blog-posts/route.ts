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
    const body = await request.json();
    const { title, excerpt, content, slug, readTime, author, tags, featured, newest, published, headerImage } = body;

    // Validate required fields
    if (!title || !excerpt || !content || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert blog post
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert({
        slug,
        title,
        excerpt,
        content,
        date: new Date().toISOString().split('T')[0],
        read_time: readTime || '5 min read',
        tags: tags || [],
        featured: featured || false,
        newest: newest || false,
        author: author || 'ChainInfra',
        published: published || false,
        header_image: headerImage || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: `Failed to create blog post: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, excerpt, content, readTime, author, tags, featured, newest, published, headerImage } = body;

    // Validate required fields
    if (!slug) {
      return NextResponse.json(
        { error: 'Missing slug for update' },
        { status: 400 }
      );
    }

    // Update blog post
    const updateData: any = {};
    
    if (title) updateData.title = title;
    if (excerpt) updateData.excerpt = excerpt;
    if (content) updateData.content = content;
    if (readTime) updateData.read_time = readTime;
    if (tags) updateData.tags = tags;
    if (featured !== undefined) updateData.featured = featured;
    if (newest !== undefined) updateData.newest = newest;
    if (author) updateData.author = author;
    if (published !== undefined) updateData.published = published;
    if (headerImage !== undefined) updateData.header_image = headerImage;

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update(updateData)
      .eq('slug', slug)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: `Failed to update blog post: ${error.message}` },
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

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: `Failed to fetch blog posts: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
