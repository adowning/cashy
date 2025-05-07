import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import * as z from "zod";
// import type { User } from "shared";
import { bearer } from "better-auth/plugins";

import { resend } from "./email";
import db from "../db/prisma";
import { Gender, UserStatus } from "../prisma/client";
import { VipInfo } from "shared";

// eslint-disable-next-line node/no-process-env
const { BETTER_AUTH_URL, JWT_SECRET, ALLOWED_ORIGINS, PORT } = process.env;

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL || `http://localhost:${PORT}`,
  secret: JWT_SECRET || "secret",

  trustedOrigins: JSON.parse(ALLOWED_ORIGINS || "[]"),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
    resetPasswordTokenExpiresIn: 10 * 60, // 10 minutes
    sendResetPassword: async ({ user, token }, request) => {
      const url = new URL(request?.headers.get("origin") || "");
      url.pathname = "/reset-password";
      url.searchParams.append("token", token);

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [user.email],
        subject: "Reset your password",
        html: `
            <div style="max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <h1 style="color: #000000; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 16px;">Reset your password</h1>

            <p style="color: #333333; font-size: 16px; margin-bottom: 24px;">
              Click the button below to reset your password.
            </p>

            <div style="margin-bottom: 24px;">
              <a href="${url}" style="display: inline-block; background-color: #000000; color: white; font-weight: 500; text-decoration: none; padding: 10px 20px; border-radius: 4px;">
                Reset password
              </a>
            </div>

            <p style="color: #666666; font-size: 14px; margin-bottom: 12px;">
              If you didn't request a password reset, you can ignore this email.
            </p>

            <p style="color: #666666; font-size: 14px; margin-bottom: 12px;">
              Your password won't change until you access the link above and create a new one.
            </p>

            <p style="color: #666666; font-size: 14px; margin-bottom: 0;">
              This link will expire in 10 minutes.
            </p>
          </div>
          `,
      });
    },
  },
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  verification: {
    disableCleanup: true,
  },
  plugins: [bearer()],

  user: {
    // fields: {
    //   id: { type: "string" },
    //   email: { type: "string" },
    //   name: { type: "string" },
    //   emailVerified: { type: "boolean" },
    //   image: { type: "string" },
    //   createdAt: { type: "date" },
    //   updatedAt: { type: "date" },
    //   username: { type: "string" },
    //   totalXp: { type: "number" },
    //   balance: { type: "number" },
    //   isVerified: { type: "boolean" },
    //   active: { type: "boolean" },
    //   lastLogin: { type: "date" },
    //   verificationToken: { type: "string" },
    //   avatar: { type: "string" },
    //   activeProfileId: { type: "string" },
    //   gender: { type: "string" },
    //   status: { type: "string" },
    //   cashtag: { type: "string" },
    //   phpId: { type: "number" },
    //   accessToken: { type: "string" },
    //   twoFactorEnabled: { type: "boolean" },
    //   banned: { type: "boolean" },
    //   banReason: { type: "string" },
    //   banExpires: { type: "date" },
    //   lastDailySpin: { type: "date" },
    // },
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
      },
      // fields: {
      id: { type: "string" },
      email: { type: "string" },
      name: { type: "string" },
      emailVerified: { type: "boolean" },
      image: { type: "string" },
      createdAt: { type: "date" },
      updatedAt: { type: "date" },
      username: { type: "string" },
      totalXp: { type: "number" },
      balance: { type: "number" },
      isVerified: { type: "boolean" },
      active: { type: "boolean" },
      lastLogin: { type: "date" },
      verificationToken: { type: "string" },
      avatar: { type: "string" },
      activeProfileId: { type: "string" },
      gender: { type: Object.values(Gender) },
      status: { type: Object.values(UserStatus) },
      cashtag: { type: "string" },
      phpId: { type: "number" },
      accessToken: { type: "string" },
      twoFactorEnabled: { type: "boolean" },
      banned: { type: "boolean" },
      banReason: { type: "string" },
      banExpires: { type: "date" },
      lastDailySpin: { type: "date" },
      // activeProfile: { type: Profile },
      //   vipInfo: { type: Object.values(VipInfo) },
      // },
      //   id: { type: "string" },
      // },
      // vipInfo: { type: Object.values(VipInfo) },
      // },
    },
  },
  advanced: {
    cookiePrefix: "token",
    cookies: {
      session_token: {
        attributes: {
          httpOnly: true,
          sameSite: "none",
          path: "/",
        },
      },
    },
  },
});
