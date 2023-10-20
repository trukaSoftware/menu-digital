/*
  Warnings:

  - Added the required column `required` to the `Complements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Complements" ADD COLUMN     "required" BOOLEAN NOT NULL;
