import nodemailer from "nodemailer";
import config from "../config/config.js";

let cachedTransporter = null;
let verifyPromise = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: config.GOOGLE_USER,
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      refreshToken: config.GOOGLE_REFRESH_TOKEN,
    },
  });

  return cachedTransporter;
}

async function verifyTransporterOnce() {
  if (!verifyPromise) {
    const transporter = getTransporter();
    verifyPromise = transporter
      .verify()
      .then(() => {
        console.log("Email server is ready to send messages");
      })
      .catch((err) => {
        console.error("Error connecting to email server:", err);
        throw err;
      });
  }

  return verifyPromise;
}

export const sendEmail = async ({ to, subject, text, html }) => {
  await verifyTransporterOnce();

  const transporter = getTransporter();
  const info = await transporter.sendMail({
    from: `"Complete Auth System" <${config.GOOGLE_USER}>`,
    to,
    subject,
    text,
    html,
  });

  console.log("Message sent: %s", info.messageId);
  return info;
};
