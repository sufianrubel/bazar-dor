import "server-only";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { dash } from "@better-auth/infra";
import { MongoClient } from "mongodb";

function requireEnvironmentVariable(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getOAuthProvider(clientId, clientSecret) {
  const id = process.env[clientId]?.trim();
  const secret = process.env[clientSecret]?.trim();

  if (Boolean(id) !== Boolean(secret)) {
    throw new Error(`${clientId} and ${clientSecret} must both be configured.`);
  }

  return id && secret ? { clientId: id, clientSecret: secret } : null;
}

const client = new MongoClient(requireEnvironmentVariable("MONGODB_URI"));
const database = client.db(requireEnvironmentVariable("MONGODB_DB"));
const google = getOAuthProvider("GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET");
const github = getOAuthProvider("GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET");

export const enabledSocialProviders = [
  ...(google ? ["google"] : []),
  ...(github ? ["github"] : []),
];

export const auth = betterAuth({
  database: mongodbAdapter(database, { client }),
  baseURL: requireEnvironmentVariable("BETTER_AUTH_URL"),
  secret: requireEnvironmentVariable("BETTER_AUTH_SECRET"),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    ...(google ? { google } : {}),
    ...(github ? { github } : {}),
  },
  plugins: [dash()],
});
