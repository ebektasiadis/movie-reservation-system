/*
  Warnings:

  - You are about to drop the column `status` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmountInEuros` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `_ReservationToSeat` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[paymentId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[auditoriumId,row,order]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startsAt` to the `Showtime` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('EUR', 'USD', 'CZK', 'CHF', 'TRY');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- DropForeignKey
ALTER TABLE "_ReservationToSeat" DROP CONSTRAINT "_ReservationToSeat_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReservationToSeat" DROP CONSTRAINT "_ReservationToSeat_B_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "status",
DROP COLUMN "totalAmountInEuros",
ADD COLUMN     "paymentId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Showtime" ADD COLUMN     "startsAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_ReservationToSeat";

-- DropEnum
DROP TYPE "ReservationStatus";

-- CreateTable
CREATE TABLE "ReservedSeat" (
    "reservationId" INTEGER NOT NULL,
    "seatId" INTEGER NOT NULL,
    "showtimeId" INTEGER NOT NULL,

    CONSTRAINT "ReservedSeat_pkey" PRIMARY KEY ("reservationId","seatId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "currency" "Currency" NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReservedSeat_seatId_showtimeId_key" ON "ReservedSeat"("seatId", "showtimeId");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_paymentId_key" ON "Reservation"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Seat_auditoriumId_row_order_key" ON "Seat"("auditoriumId", "row", "order");

-- AddForeignKey
ALTER TABLE "ReservedSeat" ADD CONSTRAINT "ReservedSeat_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservedSeat" ADD CONSTRAINT "ReservedSeat_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservedSeat" ADD CONSTRAINT "ReservedSeat_showtimeId_fkey" FOREIGN KEY ("showtimeId") REFERENCES "Showtime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
