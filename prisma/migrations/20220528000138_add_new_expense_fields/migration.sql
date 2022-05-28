/*
  Warnings:

  - You are about to drop the column `paymentDate` on the `fixedexpenses` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDate` on the `monthlyexpenses` table. All the data in the column will be lost.
  - Added the required column `lastMonthProcessed` to the `fixedexpenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDay` to the `fixedexpenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPaid` to the `monthlyexpenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDay` to the `monthlyexpenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMonth` to the `monthlyexpenses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `monthlyexpenses` DROP FOREIGN KEY `monthlyexpenses_fixedExpenseId_fkey`;

-- AlterTable
ALTER TABLE `fixedexpenses` DROP COLUMN `paymentDate`,
    ADD COLUMN `lastMonthProcessed` INTEGER NOT NULL,
    ADD COLUMN `paymentDay` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `monthlyexpenses` DROP COLUMN `paymentDate`,
    ADD COLUMN `isPaid` BOOLEAN NOT NULL,
    ADD COLUMN `paymentDay` INTEGER NOT NULL,
    ADD COLUMN `paymentMonth` INTEGER NOT NULL,
    MODIFY `fixedExpenseId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `monthlyexpenses` ADD CONSTRAINT `monthlyexpenses_fixedExpenseId_fkey` FOREIGN KEY (`fixedExpenseId`) REFERENCES `fixedexpenses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
