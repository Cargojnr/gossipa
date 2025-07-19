// utils/mailer.js or mailer.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail(email, token) {
  const resetUrl = `http://localhost:5173/reset/${token}`; // change to prod domain in deployment

  try {
    await resend.emails.send({
      from: "Gossipa <no-reply@gossipa.app>", // ✅ set up in Resend dashboard
      to: email,
      subject: "Reset Your Gossipa Password",
      html: `
        <h2>Reset Your Password</h2>
        <p>Click the link below to reset your password. This link will expire in 15 minutes.</p>
        <a href="${resetUrl}" style="color: #7f5af0;">Reset Password</a>
        <p>If you didn’t request this, just ignore this email.</p>
      `,
    });
    console.log(`✅ Reset email sent to ${resetUrl} ${email}`);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
    throw new Error("Could not send reset email");
  }
}
