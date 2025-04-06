import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { user, session, account, verification } from "@/db/schema";
import { oneTap } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification
    }
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }
  },
  plugins:[
    oneTap()
  ]
});
