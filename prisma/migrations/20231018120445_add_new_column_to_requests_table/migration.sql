/*
  Warnings:

  - Added the required column `totalValue` to the `Requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Requests" ADD COLUMN     "totalValue" MONEY NOT NULL;
