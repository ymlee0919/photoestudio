/*
  Warnings:

  - Added the required column `categoryId` to the `offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offers" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "category" (
    "category_id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
