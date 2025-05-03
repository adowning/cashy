/**
 * Cloudflare Email Worker to process incoming Cash App receipts.
 * It parses the email, extracts relevant information, and sends a POST request
 * to a webhook endpoint on your server to confirm the deposit.
 */

// Configure your webhook URL and a shared secret
const WEBHOOK_URL = "http://localhost:3001/confirm-deposit"; // Replace with the actual URL of your webhook endpoint
const WEBHOOK_SECRET = "asdfasdfasdfasdf1234xxx"; // Replace with a strong, unique secret

// Expected sender email address from Cash App
const CASHAPP_SENDER_EMAIL = "cash@square.com";

// Regular expressions to extract data from the email body (adjust as needed)
// These are based on the provided example email. Email formats can change!
const AMOUNT_REGEX = /\$([\d,]+\.?\d*)/; // Matches "$200"
const SENDER_NAME_REGEX = /by\s+([A-Z\s]+)\s+\./; // Matches "by HAMILTON ."
const TRANSACTION_ID_REGEX = /#([A-Z0-9]+)/; // Matches "#D-NP3JP2J9"

// Add a listener to handle the email and send a custom fetch
// Corrected: Make the handler async and return the promise from handleEmail
// Fixed TypeScript error by casting 'email' to any
addEventListener("email" as any, async (event) => {
  // The Workers runtime will wait for the promise returned by handleEmail to settle
  return handleEmail(event);
});

async function handleEmail(event) {
  const email = event.request;
  const from = email.headers.get("From");
  const subject = email.headers.get("Subject");

  console.log(`Received email from: ${from} with subject: ${subject}`);

  // 1. Basic check for sender email
  if (!from || !from.includes(CASHAPP_SENDER_EMAIL)) {
    console.log("Email is not from Cash App. Skipping.");
    // Optionally, forward non-Cash App emails to a different address
    // event.forward('other-inbox@yourdomain.com'); // Note: event.forward might require specific setup
    return; // Ignore non-Cash App emails
  }

  // 2. Read the email body
  let emailText = "";
  let emailHtml = "";

  try {
    // Parse the email using MailChannels helper (available in Workers)
    // Note: This requires the MailChannels Email Receiving service enabled
    // or using a compatible email parsing library if not using MailChannels.
    // For a basic example, we'll try to read the text and html parts directly
    // from the email request body stream, which is more complex in practice
    // due to multipart emails.

    // A more reliable approach for complex emails is to use a library or service
    // that handles MIME parsing. Since we don't have external libraries easily
    // available in standard Workers, we'll attempt basic parsing from the text/html parts
    // of the multipart email if present.

    // Let's assume the email body is accessible as a ReadableStream.
    // We need to parse the multipart structure to get text/html parts.
    // This is non-trivial in a simple Worker.

    // Alternative simplified approach: Try to extract from the raw email content
    // This is less robust but demonstrates the parsing idea.
    const rawEmail = await new Response(email.body).text();

    // Find the text/plain and text/html parts based on boundaries
    const boundaryMatch = email.headers.get("Content-Type")?.match(/boundary="?([^"]*)"?/);
    const boundary = boundaryMatch ? boundaryMatch[1] : null;

    if (boundary) {
      const parts = rawEmail.split(`--${boundary}`);
      for (const part of parts) {
        if (part.includes("Content-Type: text/plain")) {
          emailText = part.split("\r\n\r\n")[1]?.trim() || "";
        } else if (part.includes("Content-Type: text/html")) {
          // Decode quoted-printable if necessary
          const htmlContent = part.split("\r\n\r\n")[1]?.trim() || "";
          emailHtml = htmlContent.replace(/=3D/g, "=").replace(/=\r\n/g, ""); // Basic quoted-printable decode
        }
      }
    } else {
      // If not multipart, assume it's plain text or HTML directly
      emailText = rawEmail; // Or try to detect HTML
    }
  } catch (error) {
    console.error("Error reading email body:", error);
    // Log the error and potentially send an alert
    return; // Stop processing this email
  }

  // 3. Extract data from the email body (prioritize plain text if available)
  let amount = null;
  let senderName = null;
  let transactionId = null;

  const contentToParse = emailText || emailHtml; // Use plain text if available, otherwise HTML

  if (contentToParse) {
    const amountMatch = contentToParse.match(AMOUNT_REGEX);
    if (amountMatch && amountMatch[1]) {
      amount = parseFloat(amountMatch[1].replace(/,/g, "")); // Remove commas and parse as float
    }

    const senderNameMatch = contentToParse.match(SENDER_NAME_REGEX);
    if (senderNameMatch && senderNameMatch[1]) {
      senderName = senderNameMatch[1].trim();
    }

    const transactionIdMatch = contentToParse.match(TRANSACTION_ID_REGEX);
    if (transactionIdMatch && transactionIdMatch[1]) {
      transactionId = transactionIdMatch[1].trim();
    }
  }

  console.log(`Extracted - Amount: ${amount}, Sender: ${senderName}, Transaction ID: ${transactionId}`);

  // 4. Validate extracted data
  if (amount === null || senderName === null || transactionId === null) {
    console.error("Failed to extract all required data from email.");
    // Log the failure, potentially send an alert, or forward the original email for manual review
    // event.forward('manual-review@yourdomain.com'); // Note: event.forward might require specific setup
    return; // Stop processing
  }

  // 5. Prepare payload for the webhook
  const webhookPayload = {
    transactionId: transactionId,
    amount: amount,
    senderName: senderName,
    // Include other relevant data if needed, e.g., timestamp from email headers
    timestamp: new Date(email.headers.get("Date") || Date.now()).toISOString(),
    rawEmailSubject: subject, // Include subject for logging/debugging
  };

  // 6. Send POST request to the webhook URL
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Secret": WEBHOOK_SECRET, // Include the shared secret
      },
      body: JSON.stringify(webhookPayload),
    });

    console.log(`Webhook response status: ${response.status}`);
    if (!response.ok) {
      const responseBody = await response.text();
      console.error(`Webhook failed: ${response.status} - ${responseBody}`);
      // Log the failure and response for debugging
      // Potentially retry or send an alert
    } else {
      console.log("Webhook successfully sent and processed.");
      // Log success
    }
  } catch (error) {
    console.error("Error sending webhook request:", error);
    // Log the error, potentially retry, or send an alert
  }
}
