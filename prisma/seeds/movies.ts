import { Movie, PrismaClient } from "../../src/generated/prisma/client";

export async function seedMovies(prisma: PrismaClient): Promise<Record<string, Movie>> {
  const inception = await prisma.movie.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Inception',
      description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      posterImageUrl: 'https://example.com/inception.jpg',
      durationInMinutes: 148,
      genres: ['ACTION', 'SCIFI'],
    },
  })

  const theGodfather = await prisma.movie.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'The Godfather',
      description: 'The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.',
      posterImageUrl: 'https://example.com/godfather.jpg',
      durationInMinutes: 175,
      genres: ['DRAMA'],
    },
  })

  const theHangover = await prisma.movie.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'The Hangover',
      description: 'Three buddies wake up from a bachelor party in Las Vegas with no memory of the previous night and the groom missing.',
      posterImageUrl: 'https://example.com/hangover.jpg',
      durationInMinutes: 100,
      genres: ['COMEDY'],
    },
  })

  return { inception, theGodfather, theHangover }
}