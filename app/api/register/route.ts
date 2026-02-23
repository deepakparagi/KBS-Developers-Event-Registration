import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";

type RegistrationPayload = {
  fullName: string;
  contactNumber: string;
  emailAddress: string;
  numberOfAdults: number;
  numberOfKids: number;
};

async function appendToSheet(data: RegistrationPayload): Promise<void> {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  console.log("appendToSheet: Checking environment variables...");
  if (!clientEmail || !privateKey || !spreadsheetId) {
    console.error("appendToSheet: FAILED - Missing environment variables", {
      hasEmail: !!clientEmail,
      hasKey: !!privateKey,
      hasSheetId: !!spreadsheetId
    });
    throw new Error("Missing required environment variables");
  }
  console.log("appendToSheet: Starting Google API auth with email:", clientEmail);
  console.log("appendToSheet: Targeting Spreadsheet ID:", spreadsheetId);

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const sheets = google.sheets({ version: "v4", auth });

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const values = [
    [
      timestamp,
      data.fullName.trim(),
      data.contactNumber.trim(),
      data.emailAddress.trim().toLowerCase(),
      String(data.numberOfAdults),
      String(data.numberOfKids)
    ]
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: { values }
    });
    console.log("appendToSheet: SUCCESS - Entry added to Google Sheet");
  } catch (error) {
    console.error("appendToSheet: GOOGLE API ERROR", error);
    throw error;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const fullName = body.fullName as string | undefined;
    const contactNumber = body.contactNumber as string | undefined;
    const emailAddress = body.emailAddress as string | undefined;
    const numberOfAdults = body.numberOfAdults;
    const numberOfKids = body.numberOfKids;

    if (!fullName || !contactNumber || !emailAddress) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          message:
            "Please provide all required fields: fullName, contactNumber, emailAddress, numberOfAdults, numberOfKids"
        },
        { status: 400 }
      );
    }

    if (numberOfAdults === undefined || numberOfKids === undefined) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          message: "numberOfAdults and numberOfKids are required"
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(emailAddress))) {
      return NextResponse.json(
        { error: "Invalid email format", message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const adults = Number(numberOfAdults);
    const kids = Number(numberOfKids);
    if (isNaN(adults) || isNaN(kids) || adults < 0 || kids < 0) {
      return NextResponse.json(
        {
          error: "Invalid number format",
          message: "numberOfAdults and numberOfKids must be non-negative numbers"
        },
        { status: 400 }
      );
    }

    console.log("Registration API: Request received, triggering background sheet update...");
    // Fire and forget updating the sheet, returning the API response early
    waitUntil(
      appendToSheet({
        fullName,
        contactNumber,
        emailAddress,
        numberOfAdults: adults,
        numberOfKids: kids
      }).catch(err => {
        console.error("Registration background task FAILED:", err);
      })
    );

    return NextResponse.json(
      { success: true, message: "Registration saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unable to save your invitation. Please try again."
      },
      { status: 500 }
    );
  }
}
