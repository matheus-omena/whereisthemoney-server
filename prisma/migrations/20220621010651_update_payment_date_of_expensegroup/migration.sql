/*
  Warnings:

  - You are about to drop the column `paymentDate` on the `expensegroups` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `expensegroups` DROP COLUMN `paymentDate`,
    ADD COLUMN `paymentDay` INTEGER NULL;

-- AlterTable
ALTER TABLE `monthlyexpenses` MODIFY `isPaid` BOOLEAN NOT NULL DEFAULT false;
