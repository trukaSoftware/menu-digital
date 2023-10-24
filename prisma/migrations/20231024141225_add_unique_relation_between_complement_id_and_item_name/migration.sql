/*
  Warnings:

  - A unique constraint covering the columns `[name,complementId]` on the table `Items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Items_name_complementId_key" ON "Items"("name", "complementId");
