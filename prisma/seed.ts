import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { seedUsers } from "./seeds/users";
import { seedMovies } from "./seeds/movies";
import { seedAuditoriums } from "./seeds/auditoriums";
import { seedShowtimes } from "./seeds/showtimes";
import { seedReservations } from "./seeds/reservations";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  const users = await seedUsers(prisma);
  const movies = await seedMovies(prisma);
  const auditoriums = await seedAuditoriums(prisma);
  const showtimes = await seedShowtimes(prisma, movies, auditoriums)
  await seedReservations(prisma, users, showtimes);

  console.log('✅ Seeding completed', {
    users: Object.keys(users).length,
    movies: Object.keys(movies).length,
    auditoriums: Object.keys(auditoriums).length,
    showtimes: Object.keys(showtimes).length,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });