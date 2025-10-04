import { NextRequest, NextResponse } from 'next/server';
import { validatorConfig } from '@/lib/validator-config';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

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
    const { name, email, organization, 'project-type': projectType, timeline, requirements, 'additional-info': additionalInfo } = body;

    // Validate required fields
    if (!name || !email || !projectType || !requirements) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { data: contactRequest, error: dbError } = await supabaseAdmin
      .from('contact_requests')
      .insert({
        name,
        email,
        organization: organization || null,
        project_type: projectType,
        timeline: timeline || null,
        budget: null,
        requirements,
        additional_info: additionalInfo || null,
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save request. Please try again.' },
        { status: 500 }
      );
    }

    // Create email content
    const emailContent = `
New Metal Node Build Request

Contact Information:
- Name: ${name}
- Email: ${email}
- Organization: ${organization || 'Not provided'}

Project Details:
- Project Type: ${projectType}
- Timeline: ${timeline || 'Not specified'}

Requirements:
${requirements}

Additional Information:
${additionalInfo || 'None provided'}

---
This request was submitted through the ChainInfra website contact form.
Request ID: ${contactRequest.id}
Timestamp: ${new Date().toISOString()}
    `.trim();

    // Log the submission for email processing
    console.log('Contact form submission:', {
      requestId: contactRequest.id,
      to: validatorConfig.contactEmails.primary,
      cc: validatorConfig.contactEmails.secondary,
      subject: 'New Metal Node Build Request',
      content: emailContent
    });

    // Send actual email notification
    const emailSent = await sendEmailNotification({
      to: process.env.EMAIL_USER || validatorConfig.contactEmails.primary,
      subject: `New Metal Node Build Request - ${name} (${contactRequest.id})`,
      content: emailContent
    });

    if (emailSent) {
      return NextResponse.json(
        { 
          message: 'Request submitted successfully. We will contact you soon.',
          requestId: contactRequest.id
        },
        { status: 200 }
      );
    } else {
      // Even if email fails, the request is saved in database
      return NextResponse.json(
        { 
          message: 'Request submitted successfully. We will contact you soon.',
          requestId: contactRequest.id,
          warning: 'Email notification may be delayed'
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Send actual email notification using Nodemailer
async function sendEmailNotification(emailData: {
  to: string;
  subject: string;
  content: string;
}): Promise<boolean> {
  try {
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || validatorConfig.contactEmails.primary,
        pass: process.env.EMAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD
      }
    });

    // Email options
    const mailOptions = {
      from: `"ChainInfra Contact Form" <${process.env.EMAIL_USER || validatorConfig.contactEmails.primary}>`,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.content,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Metal Node Build Request</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${emailData.content.replace(/\n/g, '<br>')}
          </div>
          <p style="color: #64748b; font-size: 14px;">
            This email was sent from the ChainInfra website contact form.
          </p>
        </div>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}
