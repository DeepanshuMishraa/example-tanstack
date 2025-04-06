import 'dotenv/config';

import { createAuthClient } from "better-auth/react"
import { oneTapClient } from "better-auth/client/plugins";


export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined'
    ? window.location.origin
    : process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  plugins: [
    oneTapClient({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      autoSelect: false,
      cancelOnTapOutside: true,
      context: "signin",
      promptOptions: {
        baseDelay: 1000,
        maxAttempts: 5
      }
    })
  ]
})
