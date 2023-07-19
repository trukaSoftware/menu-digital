-- DropForeignKey
ALTER TABLE "Requests" DROP CONSTRAINT "Requests_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Requests" DROP CONSTRAINT "Requests_companyId_fkey";

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
