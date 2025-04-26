/*
  Warnings:

  - You are about to drop the column `timeSlot` on the `Photosession` table. All the data in the column will be lost.
  - You are about to drop the `Pappy` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Photosession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestEmail` to the `Photosession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestName` to the `Photosession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestPhone` to the `Photosession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pappy" DROP CONSTRAINT "Pappy_litterId_fkey";

-- DropForeignKey
ALTER TABLE "Pappy" DROP CONSTRAINT "Pappy_ownerId_fkey";

-- AlterTable
ALTER TABLE "Photosession" DROP COLUMN "timeSlot",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "guestEmail" TEXT NOT NULL,
ADD COLUMN     "guestName" TEXT NOT NULL,
ADD COLUMN     "guestPhone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "Pappy";

-- CreateTable
CREATE TABLE "Puppy" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT,
    "nickname" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "litterId" TEXT NOT NULL,

    CONSTRAINT "Puppy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Puppy_nickname_key" ON "Puppy"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Puppy_brand_key" ON "Puppy"("brand");

-- AddForeignKey
ALTER TABLE "Puppy" ADD CONSTRAINT "Puppy_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Puppy" ADD CONSTRAINT "Puppy_litterId_fkey" FOREIGN KEY ("litterId") REFERENCES "Litter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
