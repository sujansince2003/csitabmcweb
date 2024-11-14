import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Function to send the email using nodemailer
async function sendEmail(name: string, email: string, message: string) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let info = await transporter.sendMail({
        from: `"Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECIPIENT,
        subject: "New Message From CSITABMC - WEB",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    });

    console.log("Message sent: %s", info.messageId);
}


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;


        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        await sendEmail(name, email, message);

        return NextResponse.json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: "Failed to process your request." }, { status: 500 });
    }
}
