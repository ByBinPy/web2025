-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GUEST', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'GUEST',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pappy" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT,
    "nickname" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "litterId" TEXT NOT NULL,

    CONSTRAINT "Pappy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photosession" (
    "id" TEXT NOT NULL,
    "timeSlot" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Photosession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Litter" (
    "id" TEXT NOT NULL,
    "femaleParentId" TEXT NOT NULL,
    "maleParentId" TEXT NOT NULL,

    CONSTRAINT "Litter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Corgi" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Corgi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pappy_nickname_key" ON "Pappy"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Pappy_brand_key" ON "Pappy"("brand");

-- CreateIndex
CREATE UNIQUE INDEX "Corgi_nickname_key" ON "Corgi"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Corgi_brand_key" ON "Corgi"("brand");

-- AddForeignKey
ALTER TABLE "Pappy" ADD CONSTRAINT "Pappy_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pappy" ADD CONSTRAINT "Pappy_litterId_fkey" FOREIGN KEY ("litterId") REFERENCES "Litter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photosession" ADD CONSTRAINT "Photosession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Litter" ADD CONSTRAINT "Litter_femaleParentId_fkey" FOREIGN KEY ("femaleParentId") REFERENCES "Corgi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Litter" ADD CONSTRAINT "Litter_maleParentId_fkey" FOREIGN KEY ("maleParentId") REFERENCES "Corgi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
