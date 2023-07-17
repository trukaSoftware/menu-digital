/*
  Warnings:

  - You are about to drop the column `nome` on the `Complements` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Items` table. All the data in the column will be lost.
  - Added the required column `name` to the `Complements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Complements" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT NOT NULL;
