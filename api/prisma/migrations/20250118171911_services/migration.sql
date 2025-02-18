/*
  Warnings:

  - Added the required column `main` to the `offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offers" ADD COLUMN     "main" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Offer';

-- CreateTable
CREATE TABLE "Services" (
    "service_id" SERIAL NOT NULL,
    "service" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("service_id")
);
