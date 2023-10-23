-- DropIndex
DROP INDEX "Requests_branchId_key";

-- DropIndex
DROP INDEX "Requests_companyId_key";

-- AlterTable
ALTER TABLE "Requests" ALTER COLUMN "companyId" DROP NOT NULL;
