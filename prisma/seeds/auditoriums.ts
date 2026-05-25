import { Auditorium, PrismaClient } from "../../src/generated/prisma/client";

export async function seedAuditoriums(prisma: PrismaClient): Promise<Record<string, Auditorium>> {
  const hallA = await prisma.auditorium.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Hall A',
      seats: {
        create: Array.from({ length: 50 }, (_, i) => ({
          row: Math.floor(i / 10) + 1,
          order: (i % 10) + 1,
          tier: 'REGULAR',
        })),
      },
    },
  })

  const hallB = await prisma.auditorium.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Hall B',
      seats: {
        create: Array.from({ length: 30 }, (_, i) => ({
          row: Math.floor(i / 10) + 1,
          order: (i % 10) + 1,
          tier: i < 20 ? 'REGULAR' : 'PREMIUM',
        })),
      },
    },
  })

  const hallVip = await prisma.auditorium.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'VIP Hall',
      seats: {
        create: Array.from({ length: 20 }, (_, i) => ({
          row: Math.floor(i / 5) + 1,
          order: (i % 5) + 1,
          tier: i < 15 ? 'VIP' : 'DISABLED',
        })),
      },
    },
  })

  return { hallA, hallB, hallVip }
}