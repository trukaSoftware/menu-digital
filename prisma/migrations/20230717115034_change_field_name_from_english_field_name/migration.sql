-- AlterTable
ALTER TABLE "Complements" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT NOT NULL;
