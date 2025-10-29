import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { config } from "../config";
import { expo } from "@better-auth/expo";
import { bearer, openAPI } from "better-auth/plugins";

const auth = betterAuth({
  database: new Pool({
    connectionString: config.dbUrl,
  }),
  plugins: [expo(), openAPI(), bearer()],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      mainCurrency: {
        type: "string",
        required: false,
      },
      currency: {
        type: "string[]",
        required: false,
      },
      categories: {
        type: "string[]",
        required: false,
      },
      permissions: {
        type: "string",
        required: false,
      },
      wallets: {
        type: "string[]",
        required: false,
        default: ["building-columns.bank"],
      }
    },
    deleteUser: {
      enabled: true,
    },
  },
  trustedOrigins: [config.appUrl, config.betterAuthUrl, config.appScheme, "https://appleid.apple.com"],
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
      redirectUri: `${config.appScheme}://home`,
    },
    apple: {
      clientId: config.appleClientId,
      clientSecret: config.appleClientSecret,
      redirectUri: `${config.appScheme}://home`,
    },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  },
});

export { auth };
