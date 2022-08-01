/*
  Warnings:

  - You are about to drop the column `categoryId` on the `expensegroups` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `expensegroups` DROP FOREIGN KEY `expensegroups_categoryId_fkey`;

-- AlterTable
ALTER TABLE `expensegroups` DROP COLUMN `categoryId`;

-- AlterTable
ALTER TABLE `fixedexpenses` ADD COLUMN `categoryId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `monthlyexpenses` ADD COLUMN `categoryId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `fixedexpenses` ADD CONSTRAINT `fixedexpenses_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `expensecategories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monthlyexpenses` ADD CONSTRAINT `monthlyexpenses_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `expensecategories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
