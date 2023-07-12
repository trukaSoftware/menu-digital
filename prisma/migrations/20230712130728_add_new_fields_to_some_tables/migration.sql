/*
  Warnings:

  - Added the required column `phoneNumber` to the `Info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Info" ADD COLUMN     "deliveryPhoneNumber" TEXT,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "discount" INTEGER;
