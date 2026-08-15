import { google } from "googleapis";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SHEET_TAB = "Sheet1";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFields = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof ContactFields, string>>;

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validateContactForm(body: unknown): {
  fields: ContactFields;
  errors: FieldErrors;
} {
  const values = body && typeof body === "object" ? body as Record<string, unknown> : {};
  const fields: ContactFields = {
    name: asTrimmedString(values.name),
    email: asTrimmedString(values.email),
    phone: asTrimmedString(values.phone),
    subject: asTrimmedString(values.subject),
    message: asTrimmedString(values.message),
  };
  const errors: FieldErrors = {};

  if (!fields.name) errors.name = "Full name is required.";
  else if (fields.name.length > 120) errors.name = "Full name must be 120 characters or fewer.";

  if (!fields.email) errors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(fields.email)) errors.email = "Please enter a valid email address.";
  else if (fields.email.length > 254) errors.email = "Email address is too long.";

  if (fields.phone.length > 50) errors.phone = "Phone number must be 50 characters or fewer.";
  if (fields.subject.length > 120) errors.subject = "Subject must be 120 characters or fewer.";

  if (!fields.message) errors.message = "Message is required.";
  else if (fields.message.length > 5000) errors.message = "Message must be 5,000 characters or fewer.";

  return { fields, errors };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit the form again." }, { status: 400 });
  }

  const { fields, errors } = validateContactForm(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please correct the highlighted fields.", fieldErrors: errors },
      { status: 400 }
    );
  }

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
    console.error("Google Sheets contact form environment variables are not configured.");
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_TAB}!A:F`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          new Date().toISOString(),
          fields.name,
          fields.email,
          fields.phone,
          fields.subject,
          fields.message,
        ]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unable to append contact form submission to Google Sheets.", error);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try again shortly." },
      { status: 502 }
    );
  }
}
