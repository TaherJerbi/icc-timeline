// api/index.ts
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { server } from "./server";
import * as dotenv from "dotenv";

dotenv.config(); // Load the environment variables

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB
async function startServer() {
  console.log("DATABASE_URL :: ", process.env.DATABASE_URL);
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      return {
        prisma,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
