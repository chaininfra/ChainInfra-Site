import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client with service role key for admin operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    console.log('Starting URL update process...')

    // Get all blog posts that contain image references
    const { data: blogPosts, error: fetchError } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .like('content', '%/images/%')

    if (fetchError) {
      throw new Error(`Failed to fetch blog posts: ${fetchError.message}`)
    }

    console.log(`Found ${blogPosts?.length || 0} blog posts with image references`)

    // List of all images that should be updated
    const imageFiles = [
      'NAAs.png', 'Win10Boot-Part1.png', 'Win10Boot-Part2.png', 'Win10Boot-Part3.png',
      'Win10Boot-Part4.png', 'Win10Boot-Part5.png', 'Win10Boot-Part6.png', 'Win10Boot-Part7.png',
      'az.png', 'az900.png', 'bcd-file.png', 'bcdvars.png', 'boot-screen.png', 'bscp.png',
      'btl1.png', 'c2-inf.png', 'client-push.png', 'collection-vars.png', 'collections.png',
      'cps-challenges.jpg', 'cps.png', 'cstm-logo.png', 'cstm.png', 'meow.png',
      'pxeclient.png', 'sccm-part-2.png', 'sccm-topology.png', 'sccm.png',
      'task-sequence-editor.png', 'tcm.png', 'tftp.png', 'tsbootshell.png',
      'tying.png', 'variablesdat.png'
    ]

    // Update each blog post's content to use Supabase URLs
    const updateResults = []
    for (const post of blogPosts || []) {
      try {
        let updatedContent = post.content

        // Replace all /images/ references with Supabase URLs
        for (const fileName of imageFiles) {
          const oldPath = `/images/${fileName}`
          const newPath = `${supabaseUrl}/storage/v1/object/public/blog-images/${fileName}`
          updatedContent = updatedContent.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath)
        }

        // Only update if content actually changed
        if (updatedContent !== post.content) {
          const { error: updateError } = await supabaseAdmin
            .from('blog_posts')
            .update({ content: updatedContent })
            .eq('slug', post.slug)

          if (updateError) {
            console.error(`Failed to update blog post ${post.slug}:`, updateError)
            continue
          }

          console.log(`Updated blog post: ${post.slug}`)
          updateResults.push(post.slug)
        } else {
          console.log(`No changes needed for: ${post.slug}`)
        }
      } catch (error) {
        console.error(`Error updating blog post ${post.slug}:`, error)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `URL update completed successfully`,
        updatedPosts: updateResults.length,
        details: {
          updatedPosts: updateResults
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('URL update error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})