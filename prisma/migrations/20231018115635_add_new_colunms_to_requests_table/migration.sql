-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('OPEN', 'CLOSE');

-- AlterTable
ALTER TABLE "Requests" ADD COLUMN     "status" "RequestStatus" NOT NULL DEFAULT 'OPEN',
ADD COLUMN     "table" TEXT;
