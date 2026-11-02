import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";
import {
  getCareerAdminEmail,
  getCareerUserAckEmail,
  type CareerFormData,
} from "@/lib/email-templates";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone =
      formData.get("full_phone")?.toString() ||
      formData.get("phone")?.toString() ||
      "";
    const resumeFile = formData.get("resume") as File | null;

    // Validation
    if (!name.trim()) {
      return NextResponse.json(
        { success: false, error: "Full name is required." },
        { status: 400 },
      );
    }

    if (!email.trim() || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 },
      );
    }

    if (!phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Phone number is required." },
        { status: 400 },
      );
    }

    let resumeAttachment:
      | {
          filename: string;
          content: Buffer;
          contentType?: string;
        }
      | undefined = undefined;

    let resumeFilename = "";

    if (resumeFile && typeof resumeFile.arrayBuffer === "function") {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      resumeFilename = resumeFile.name || "Resume.pdf";
      resumeAttachment = {
        filename: resumeFilename,
        content: buffer,
        contentType: resumeFile.type || "application/octet-stream",
      };
    }

    const data: CareerFormData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      hasResume: Boolean(resumeAttachment),
      resumeFilename,
    };

    const adminEmailAddress =
      process.env.SMTP_ADMIN_EMAIL ||
      process.env.SMTP_USER ||
      process.env.SMTP_EMAIL ||
      "whtdxb@gmail.com";

    // 1. Send notification email to Admin with resume attachment
    const adminMail = getCareerAdminEmail(data);
    await sendEmail({
      to: adminEmailAddress,
      subject: adminMail.subject,
      html: adminMail.html,
      text: adminMail.text,
      replyTo: data.email,
      attachments: resumeAttachment ? [resumeAttachment] : undefined,
    });

    // 2. Send acknowledgment confirmation email to Candidate
    const userMail = getCareerUserAckEmail(data);
    await sendEmail({
      to: data.email,
      subject: userMail.subject,
      html: userMail.html,
      text: userMail.text,
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully. Confirmation email sent.",
    });
  } catch (error: any) {
    console.error("API /api/career error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Failed to submit application. Please try again later.",
      },
      { status: 500 },
    );
  }
}

