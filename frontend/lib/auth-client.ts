import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.EXPO_PUBLIC_BETTER_AUTH_URL,
    fetchOptions: {
        credentials: "include",
    },
    plugins: [
        expoClient({
            scheme: process.env.EXPO_PUBLIC_APP_SCHEME || "financetrackerapp",
            storagePrefix: process.env.EXPO_PUBLIC_APP_SCHEME || "financetrackerapp",
            storage: SecureStore,
        }),
        inferAdditionalFields({
            user: {
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
              },
            }
        })
    ],
});