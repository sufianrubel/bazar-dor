import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { dash } from "@better-auth/infra";
import { clientPromise } from "@/lib/mongodb";

const client = await clientPromise;

export const auth = betterAuth({
  database: mongodbAdapter(client.db(process.env.MONGODB_DB), {
    client,
  }),

  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    dash(),
  ],
});