-- DropForeignKey
ALTER TABLE "ProductsComplements" DROP CONSTRAINT "ProductsComplements_complementId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsComplements" DROP CONSTRAINT "ProductsComplements_productsId_fkey";

-- AddForeignKey
ALTER TABLE "ProductsComplements" ADD CONSTRAINT "ProductsComplements_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsComplements" ADD CONSTRAINT "ProductsComplements_complementId_fkey" FOREIGN KEY ("complementId") REFERENCES "Complements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
