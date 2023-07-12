-- AlterTable
ALTER TABLE "Info" ADD COLUMN     "deliveryPhoneNumber" TEXT,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "discount" INTEGER;
