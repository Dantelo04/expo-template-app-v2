import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL,
  betterAuthUrl: process.env.BETTER_AUTH_URL || "",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  appUrl: process.env.APP_URL || "financetrackerapp",
  appScheme: process.env.APP_SCHEME || "financetrackerapp",
  appleClientId: process.env.APPLE_CLIENT_ID || "",
  appleClientSecret: process.env.APPLE_SECRET || "",
};