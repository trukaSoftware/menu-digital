-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_ProductCategoriesId_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "ProductCategoriesId",
ADD COLUMN     "productCategoriesId" TEXT;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_productCategoriesId_fkey" FOREIGN KEY ("productCategoriesId") REFERENCES "ProductCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
