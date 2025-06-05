import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create a transporter using OAuth2
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    });

    // Format the message
    const message = `
      New Car Rental Request:
      
      Car Type: ${data.carType}
      
      Pickup Details:
      Location: ${data.pickupLocation}
      Date: ${data.pickupDate}
      Time: ${data.pickupTime}
      
      Dropoff Details:
      Location: ${data.dropoffLocation}
      Date: ${data.dropoffDate}
      Time: ${data.dropoffTime}
      
      Customer Information:
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      
      Additional Message:
      ${data.message}
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      subject: 'New Car Rental Request',
      text: message,
      replyTo: data.email
    };

    console.log('Attempting to send email with configuration:', {
      host: "smtp.gmail.com",
      port: 465,
      user: process.env.EMAIL_USER
    });

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    const err = error as Error;
    console.error('Detailed error:', {
      name: err.name,
      message: err.message,
      stack: err.stack
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: err.message 
      },
      { status: 500 }
    );
  }
} 