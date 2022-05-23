-- CreateEnum
CREATE TYPE "incomeType" AS ENUM ('SALARY', 'BUSINESS');

-- CreateTable
CREATE TABLE "income" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "incomeType" NOT NULL DEFAULT E'SALARY',
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "income_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
