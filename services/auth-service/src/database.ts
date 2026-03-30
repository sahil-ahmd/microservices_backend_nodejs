import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

// 1. Create a standard 'pg' pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Create the Prisma adapter
const adapter = new PrismaPg(pool as any);

// 3. Pass the adapter to the PrismaClient constructor
// create a single instance of PrismaClient
const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});

// Handle graceful shutdown - Important to close the pool too!
const shutdown = async () => {
  console.log("Shutting down database connections...");
  await prisma.$disconnect();
  await pool.end();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default prisma;
