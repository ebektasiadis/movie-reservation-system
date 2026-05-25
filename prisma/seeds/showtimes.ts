import { Auditorium, Movie, PrismaClient, Showtime } from "../../src/generated/prisma/client";


export async function seedShowtimes(
  prisma: PrismaClient,
  movies: Record<string, Movie>,
  auditoriums: Record<string, Auditorium>
): Promise<Record<string, Showtime>> {
  const inceptionHallA = await prisma.showtime.upsert({
    where: { id: 1 },
    update: {},
    create: {
      movieId: movies.inception.id,
      auditoriumId: auditoriums.hallA.id,
      startsAt: new Date('2026-06-01T20:00:00Z'),
    },
  })

  const inceptionHallB = await prisma.showtime.upsert({
    where: { id: 2 },
    update: {},
    create: {
      movieId: movies.inception.id,
      auditoriumId: auditoriums.hallB.id,
      startsAt: new Date('2026-06-02T18:00:00Z'),
    },
  })

  const godfatherHallA = await prisma.showtime.upsert({
    where: { id: 3 },
    update: {},
    create: {
      movieId: movies.theGodfather.id,
      auditoriumId: auditoriums.hallA.id,
      startsAt: new Date('2026-06-03T21:00:00Z'),
    },
  })

  const hangoverVip = await prisma.showtime.upsert({
    where: { id: 4 },
    update: {},
    create: {
      movieId: movies.theHangover.id,
      auditoriumId: auditoriums.hallVip.id,
      startsAt: new Date('2026-06-04T19:00:00Z'),
    },
  })

  return { inceptionHallA, inceptionHallB, godfatherHallA, hangoverVip }
}