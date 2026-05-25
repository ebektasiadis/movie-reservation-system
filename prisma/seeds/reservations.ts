import { User, PrismaClient, Showtime } from "../../src/generated/prisma/client";

export async function seedReservations(
  prisma: PrismaClient,
  users: Record<string, User>,
  showtimes: Record<string, Showtime>
) {
  const hallASeats = await prisma.seat.findMany({
    where: { auditoriumId: showtimes.inceptionHallA.auditoriumId },
  })

  const hallBSeats = await prisma.seat.findMany({
    where: { auditoriumId: showtimes.inceptionHallB.auditoriumId },
  })

  const vipSeats = await prisma.seat.findMany({
    where: { auditoriumId: showtimes.hangoverVip.auditoriumId },
  })

  const aliciaPayment = await prisma.payment.create({
    data: {
      amount: 1200,
      currency: 'EUR',
      status: 'COMPLETED',
    },
  })

  await prisma.reservation.create({
    data: {
      userId: users.alicia.id,
      showtimeId: showtimes.inceptionHallA.id,
      paymentId: aliciaPayment.id,
      reservedSeats: {
        create: hallASeats.slice(0, 2).map((seat) => ({
          seatId: seat.id,
          showtimeId: showtimes.inceptionHallA.id,
        })),
      },
    },
  })

  const bobPayment = await prisma.payment.create({
    data: {
      amount: 1800,
      currency: 'EUR',
      status: 'COMPLETED',
    },
  })

  await prisma.reservation.create({
    data: {
      userId: users.bob.id,
      showtimeId: showtimes.inceptionHallB.id,
      paymentId: bobPayment.id,
      reservedSeats: {
        create: hallBSeats.slice(0, 3).map((seat) => ({
          seatId: seat.id,
          showtimeId: showtimes.inceptionHallB.id,
        })),
      },
    },
  })

  const aliciaVipPayment = await prisma.payment.create({
    data: {
      amount: 3000,
      currency: 'EUR',
      status: 'COMPLETED',
    },
  })

  await prisma.reservation.create({
    data: {
      userId: users.alicia.id,
      showtimeId: showtimes.hangoverVip.id,
      paymentId: aliciaVipPayment.id,
      reservedSeats: {
        create: vipSeats.slice(0, 1).map((seat) => ({
          seatId: seat.id,
          showtimeId: showtimes.hangoverVip.id,
        })),
      },
    },
  })
}