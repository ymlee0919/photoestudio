/*
  Warnings:

  - Added the required column `email` to the `settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "settings" ADD COLUMN     "email" TEXT NOT NULL;
