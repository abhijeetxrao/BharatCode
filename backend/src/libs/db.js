import {PrismaClient} from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("FATAL ERROR: DATABASE_URL is not defined in .env file");
  process.exit(1); 
}

// Create a connection pool (required for the adapter)
const pool = new Pool({ connectionString })

// Create the adapter
const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis

// Pass the adapter to PrismaClient
export const db = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db