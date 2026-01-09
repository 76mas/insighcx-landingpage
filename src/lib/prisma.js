import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

/**
 * Global Prisma Client instance for Prisma 7
 * Uses PostgreSQL adapter as required by Prisma 7
 */
const globalForPrisma = globalThis;

// Create PostgreSQL connection pool
const createPool = () => {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
  });
};

// Initialize Prisma Client with adapter
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg(createPool()),
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
