-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "expiry" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "gallery" ADD COLUMN     "expiry" INTEGER NOT NULL DEFAULT 0;
