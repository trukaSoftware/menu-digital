-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_complementsId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsComplements" DROP CONSTRAINT "ProductsComplements_complementsId_fkey";

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "complementsId",
ADD COLUMN     "complementId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductsComplements" DROP CONSTRAINT "ProductsComplements_pkey",
DROP COLUMN "complementsId",
ADD COLUMN     "complementId" TEXT NOT NULL,
ADD CONSTRAINT "ProductsComplements_pkey" PRIMARY KEY ("productsId", "complementId");

-- AddForeignKey
ALTER TABLE "ProductsComplements" ADD CONSTRAINT "ProductsComplements_complementId_fkey" FOREIGN KEY ("complementId") REFERENCES "Complements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_complementId_fkey" FOREIGN KEY ("complementId") REFERENCES "Complements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
