import nodemailer from "nodemailer";

export interface MailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }[];
}

/**
 * Creates and caches the reusable nodemailer transporter
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER || process.env.SMTP_EMAIL;
  let pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  // Guard against Next.js dotenv-expand stripping '$Eb' if unescaped
  if (pass === "bP@yuCxtKG.V") {
    pass = "bP@$Eb}yuCxtKG.V";
  }

  // If secure is explicitly defined in env, use it; otherwise default port 465 to true
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === "true" || process.env.SMTP_SECURE === "1"
      : port === 465;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Unified helper to send emails via Nodemailer with graceful fallback in development
 */
export async function sendEmail(options: MailOptions) {
  const from =
    process.env.SMTP_FROM ||
    `"Wadi Hattat Trading" <${process.env.SMTP_USER || process.env.SMTP_EMAIL || "info@wadihattat.com"}>`;

  const transporter = getTransporter();

  if (!transporter) {
    console.warn(
      "⚠️ [Nodemailer] SMTP credentials not fully configured in environment (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS). Simulating email dispatch:",
      {
        to: options.to,
        subject: options.subject,
      },
    );
    return {
      success: true,
      simulated: true,
      message: "SMTP credentials not provided. Email simulated successfully.",
    };
  }

  try {
    const info = await transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
      attachments: options.attachments,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: any) {
    console.error("❌ [Nodemailer] Failed to send email:", error);
    throw new Error(error?.message || "Failed to send email");
  }
}

