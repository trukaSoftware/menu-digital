/*
  Warnings:

  - You are about to drop the `Materials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Materials" DROP CONSTRAINT "Materials_productId_fkey";

-- DropTable
DROP TABLE "Materials";

-- CreateTable
CREATE TABLE "ProductsComplements" (
    "productsId" TEXT NOT NULL,
    "complementsId" TEXT NOT NULL,

    CONSTRAINT "ProductsComplements_pkey" PRIMARY KEY ("productsId","complementsId")
);

-- CreateTable
CREATE TABLE "Complements" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "maxAmount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Complements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "price" MONEY,
    "complementsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductsComplements" ADD CONSTRAINT "ProductsComplements_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsComplements" ADD CONSTRAINT "ProductsComplements_complementsId_fkey" FOREIGN KEY ("complementsId") REFERENCES "Complements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_complementsId_fkey" FOREIGN KEY ("complementsId") REFERENCES "Complements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
