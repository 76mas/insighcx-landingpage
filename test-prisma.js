const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const pg = require("pg");

async function test() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const adminCount = await prisma.admin.count();
    console.log("Admin count:", adminCount);
  } catch (error) {
    console.error("Prisma test failed:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

test();
