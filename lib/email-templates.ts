export interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  type_of_enquiry: string;
  message: string;
}

export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
  hasResume: boolean;
  resumeFilename?: string;
}

// Common styles & brand header
const brandHeader = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #070913; border-radius: 12px 12px 0 0; padding: 32px 24px; text-align: center;">
    <tr>
      <td>
        <span style="font-family: 'Times New Roman', serif, 'Georgia'; font-size: 22px; letter-spacing: 0.15em; color: #ffffff; text-transform: uppercase; font-weight: normal; display: block;">
          WADI HATTAT TRADING
        </span>
        <div style="width: 48px; height: 2px; background-color: #ddaf4d; margin: 12px auto 8px auto;"></div>
        <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing: 0.2em; color: #ddaf4d; text-transform: uppercase; font-weight: 500; display: block;">
          Luxury Textiles & Wholesale Trading • Dubai
        </span>
      </td>
    </tr>
  </table>
`;

const brandFooter = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; border-radius: 0 0 12px 12px; padding: 24px 24px; text-align: center; margin-top: 24px;">
    <tr>
      <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #6b7280; line-height: 1.6;">
        <strong style="color: #111827;">Wadi Hattat Trading Co. LLC</strong><br />
        Main Showroom: Al Sabkha, Deira • Branches across Bur Dubai, UAE<br />
        Phone: <a href="tel:+97143536515" style="color: #ddaf4d; text-decoration: none;">+971 4 353 6515</a> &nbsp;|&nbsp;
        Email: <a href="mailto:whtdxb@gmail.com" style="color: #ddaf4d; text-decoration: none;">whtdxb@gmail.com</a><br />
        <span style="font-size: 11px; color: #9ca3af; margin-top: 8px; display: inline-block;">
          Rooted in Oman. Growing from Dubai. Connecting Textile Markets Worldwide.
        </span>
      </td>
    </tr>
  </table>
`;

function wrapEmail(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wadi Hattat Trading</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); overflow: hidden;" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              ${brandHeader}
              <div style="padding: 32px 28px;">
                ${content}
              </div>
              ${brandFooter}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * 1. Contact Form - Admin Notification Email
 */
export function getContactAdminEmail(data: ContactFormData) {
  const fullName = `${data.first_name} ${data.last_name}`.trim();

  const content = `
    <div style="margin-bottom: 24px;">
      <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.18em; color: #ddaf4d; display: block; margin-bottom: 4px;">
        NEW ENQUIRY RECEIVED
      </span>
      <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #111827;">
        Website Contact &amp; Wholesale Lead
      </h2>
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; border-collapse: collapse;">
      <tr style="border-bottom: 1px solid #f3f4f6;">
        <td style="padding: 10px 0; font-size: 13px; color: #6b7280; width: 140px; font-weight: 500;">Client Name:</td>
        <td style="padding: 10px 0; font-size: 14px; color: #111827; font-weight: 600;">${fullName}</td>
      </tr>
      <tr style="border-bottom: 1px solid #f3f4f6;">
        <td style="padding: 10px 0; font-size: 13px; color: #6b7280; font-weight: 500;">Email:</td>
        <td style="padding: 10px 0; font-size: 14px; color: #111827;">
          <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #f3f4f6;">
        <td style="padding: 10px 0; font-size: 13px; color: #6b7280; font-weight: 500;">Phone / WhatsApp:</td>
        <td style="padding: 10px 0; font-size: 14px; color: #111827; font-family: monospace;">
          <a href="tel:${data.phone}" style="color: #111827; text-decoration: none;">${data.phone}</a>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #f3f4f6;">
        <td style="padding: 10px 0; font-size: 13px; color: #6b7280; font-weight: 500;">City / Country:</td>
        <td style="padding: 10px 0; font-size: 14px; color: #111827;">${data.city || "Not provided"}</td>
      </tr>
      <tr style="border-bottom: 1px solid #f3f4f6;">
        <td style="padding: 10px 0; font-size: 13px; color: #6b7280; font-weight: 500;">Enquiry Type:</td>
        <td style="padding: 10px 0; font-size: 14px; color: #ddaf4d; font-weight: 600;">${data.type_of_enquiry}</td>
      </tr>
    </table>

    <div style="background-color: #f9fafb; border-left: 3px solid #ddaf4d; border-radius: 4px; padding: 16px 20px; margin-top: 20px;">
      <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #6b7280; display: block; margin-bottom: 8px;">
        CLIENT MESSAGE
      </span>
      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1f2937; white-space: pre-wrap;">${data.message}</p>
    </div>

    <div style="margin-top: 28px; text-align: center;">
      <a href="mailto:${data.email}?subject=RE: Wadi Hattat Trading Enquiry - ${encodeURIComponent(data.type_of_enquiry)}" style="display: inline-block; background-color: #070913; color: #ffffff; padding: 12px 28px; border-radius: 50px; font-size: 13px; font-weight: 500; text-decoration: none; letter-spacing: 0.1em; text-transform: uppercase;">
        Reply to Client
      </a>
    </div>
  `;

  return {
    subject: `New Enquiry [${data.type_of_enquiry}] from ${fullName}`,
    html: wrapEmail(content),
    text: `New Enquiry from ${fullName} (${data.email}, ${data.phone})\nEnquiry Type: ${data.type_of_enquiry}\nCity: ${data.city}\n\nMessage:\n${data.message}`,
  };
}

/**
 * 2. Contact Form - User Acknowledgment Confirmation Email
 */
export function getContactUserAckEmail(data: ContactFormData) {
  const content = `
    <div style="margin-bottom: 24px;">
      <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.18em; color: #ddaf4d; display: block; margin-bottom: 4px;">
        ENQUIRY CONFIRMATION
      </span>
      <h2 style="margin: 0; font-size: 22px; font-weight: 600; color: #111827;">
        Thank You for Reaching Out
      </h2>
    </div>

    <p style="font-size: 15px; line-height: 1.6; color: #374151; margin-top: 0;">
      Dear <strong>${data.first_name}</strong>,
    </p>

    <p style="font-size: 14px; line-height: 1.7; color: #4b5563;">
      Thank you for contacting <strong>Wadi Hattat Trading</strong>. We have received your inquiry regarding <strong>${data.type_of_enquiry}</strong>.
    </p>

    <p style="font-size: 14px; line-height: 1.7; color: #4b5563;">
      Our wholesale textile specialists in Dubai are reviewing your request and will reach out to you within <strong>24 to 48 business hours</strong> via email or WhatsApp.
    </p>

    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px 20px; margin: 24px 0;">
      <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #6b7280; display: block; margin-bottom: 10px;">
        SUMMARY OF YOUR INQUIRY
      </span>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #4b5563;">
        <tr>
          <td style="padding: 4px 0; width: 120px; color: #6b7280;">Subject:</td>
          <td style="padding: 4px 0; color: #111827; font-weight: 500;">${data.type_of_enquiry}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #6b7280;">Phone:</td>
          <td style="padding: 4px 0; color: #111827;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #6b7280;">Message:</td>
          <td style="padding: 4px 0; color: #111827;">${data.message}</td>
        </tr>
      </table>
    </div>

    <p style="font-size: 13px; line-height: 1.6; color: #6b7280;">
      If your requirement is urgent, you can also connect directly with our Dubai sales desk via WhatsApp at <a href="https://wa.me/97143536515" style="color: #25D366; text-decoration: none; font-weight: 600;">+971 4 353 6515</a>.
    </p>
  `;

  return {
    subject: `We have received your enquiry — Wadi Hattat Trading`,
    html: wrapEmail(content),
    text: `Dear ${data.first_name},\n\nThank you for contacting Wadi Hattat Trading. We have received your inquiry regarding ${data.type_of_enquiry}.\n\nOur team in Dubai will get back to you shortly.\n\nBest regards,\nWadi Hattat Trading Co. LLC`,
  };
}

/**
 * 3. Career Form - Admin Notification Email
 */
export function getCareerAdminEmail(data: CareerFormData) {
  const content = `
    <div style="margin-bottom: 24px;">
      <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.18em; color: #ddaf4d; display: block; margin-bottom: 4px;">
        NEW JOB APPLICATION
      </span>
      <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #111827;">
        Candidate Application Submitted
      </h2>
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; border-collapse: collapse;">
      <tr style="border-bottom: 1px solid #f3f4f6;">
        <td style="padding: 10px 0; font-size: 13px; color: #6b7280; width: 140px; font-weight: 500;">Candidate Name:</td>
        <td style="padding: 10px 0; font-size: 14px; color: #111827; font-weight: 600;">${data.name}</td>
      </tr>
      <tr style="border-bottom: 1px solid #f3f4f6;">
        <td style="padding: 10px 0; font-size: 13px; color: #6b7280; font-weight: 500;">Email:</td>
        <td style="padding: 10px 0; font-size: 14px; color: #111827;">
          <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #f3f4f6;">
        <td style="padding: 10px 0; font-size: 13px; color: #6b7280; font-weight: 500;">Phone / WhatsApp:</td>
        <td style="padding: 10px 0; font-size: 14px; color: #111827; font-family: monospace;">
          <a href="tel:${data.phone}" style="color: #111827; text-decoration: none;">${data.phone}</a>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #f3f4f6;">
        <td style="padding: 10px 0; font-size: 13px; color: #6b7280; font-weight: 500;">Resume Attached:</td>
        <td style="padding: 10px 0; font-size: 14px; color: ${data.hasResume ? "#059669" : "#dc2626"}; font-weight: 600;">
          ${data.hasResume ? `Yes (${data.resumeFilename || "Resume attached"})` : "No"}
        </td>
      </tr>
    </table>

    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; text-align: center; margin-top: 20px;">
      <p style="margin: 0; font-size: 13px; color: #6b7280;">
        ${data.hasResume ? "📎 Candidate's resume is attached to this email." : "No resume file was attached."}
      </p>
    </div>

    <div style="margin-top: 28px; text-align: center;">
      <a href="mailto:${data.email}?subject=RE: Application at Wadi Hattat Trading - ${encodeURIComponent(data.name)}" style="display: inline-block; background-color: #070913; color: #ffffff; padding: 12px 28px; border-radius: 50px; font-size: 13px; font-weight: 500; text-decoration: none; letter-spacing: 0.1em; text-transform: uppercase;">
        Contact Candidate
      </a>
    </div>
  `;

  return {
    subject: `New Job Application: ${data.name}`,
    html: wrapEmail(content),
    text: `New Job Application from ${data.name} (${data.email}, ${data.phone})\nResume: ${data.hasResume ? data.resumeFilename : "None"}`,
  };
}

/**
 * 4. Career Form - User Acknowledgment Confirmation Email
 */
export function getCareerUserAckEmail(data: CareerFormData) {
  const content = `
    <div style="margin-bottom: 24px;">
      <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.18em; color: #ddaf4d; display: block; margin-bottom: 4px;">
        APPLICATION CONFIRMATION
      </span>
      <h2 style="margin: 0; font-size: 22px; font-weight: 600; color: #111827;">
        Application Received
      </h2>
    </div>

    <p style="font-size: 15px; line-height: 1.6; color: #374151; margin-top: 0;">
      Dear <strong>${data.name}</strong>,
    </p>

    <p style="font-size: 14px; line-height: 1.7; color: #4b5563;">
      Thank you for your interest in joining <strong>Wadi Hattat Trading</strong>. We have successfully received your application and resume.
    </p>

    <p style="font-size: 14px; line-height: 1.7; color: #4b5563;">
      Our talent management team in Dubai reviews applications on a rolling basis. If your skills, experience, and background align with our current showroom, sales, or logistics vacancies, our recruitment team will get in touch with you directly.
    </p>

    <div style="background-color: #f9fafb; border-left: 3px solid #ddaf4d; border-radius: 4px; padding: 16px 20px; margin: 24px 0;">
      <span style="font-size: 13px; color: #4b5563; font-style: italic; line-height: 1.5; display: block;">
        "We value integrity, passion for quality textiles, and dedication to client service across all our UAE showroom operations."
      </span>
    </div>

    <p style="font-size: 13px; line-height: 1.6; color: #6b7280;">
      We appreciate your time and wish you every success in your career journey.
    </p>
  `;

  return {
    subject: `Application Received – Wadi Hattat Trading`,
    html: wrapEmail(content),
    text: `Dear ${data.name},\n\nThank you for applying to Wadi Hattat Trading. We have received your application and resume.\n\nOur team will review your profile and reach out if there is a match with our open roles.\n\nBest regards,\nWadi Hattat Trading Co. LLC`,
  };
}

