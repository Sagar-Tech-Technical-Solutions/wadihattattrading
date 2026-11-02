import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";
import {
  getContactAdminEmail,
  getContactUserAckEmail,
  type ContactFormData,
} from "@/lib/email-templates";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      first_name,
      last_name = "",
      email,
      phone = "",
      city = "",
      type_of_enquiry = "General Inquiry",
      message,
    } = body;

    // Validation
    if (!first_name || typeof first_name !== "string" || !first_name.trim()) {
      return NextResponse.json(
        { success: false, error: "First name is required." },
        { status: 400 },
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 },
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required." },
        { status: 400 },
      );
    }

    const data: ContactFormData = {
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      type_of_enquiry: type_of_enquiry.trim(),
      message: message.trim(),
    };

    const adminEmailAddress =
      process.env.SMTP_ADMIN_EMAIL ||
      process.env.SMTP_USER ||
      process.env.SMTP_EMAIL ||
      "whtdxb@gmail.com";

    // 1. Send notification email to Admin
    const adminMail = getContactAdminEmail(data);
    await sendEmail({
      to: adminEmailAddress,
      subject: adminMail.subject,
      html: adminMail.html,
      text: adminMail.text,
      replyTo: data.email,
    });

    // 2. Send acknowledgment confirmation email to User
    const userMail = getContactUserAckEmail(data);
    await sendEmail({
      to: data.email,
      subject: userMail.subject,
      html: userMail.html,
      text: userMail.text,
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully. Confirmation email sent.",
    });
  } catch (error: any) {
    console.error("API /api/contact error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error?.message || "Failed to process enquiry. Please try again later.",
      },
      { status: 500 },
    );
  }
}

