/*
  Warnings:

  - Made the column `categoryId` on table `fixedexpenses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `monthlyexpenses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `fixedexpenses` DROP FOREIGN KEY `fixedexpenses_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `monthlyexpenses` DROP FOREIGN KEY `monthlyexpenses_categoryId_fkey`;

-- AlterTable
ALTER TABLE `fixedexpenses` MODIFY `categoryId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `monthlyexpenses` MODIFY `categoryId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `fixedexpenses` ADD CONSTRAINT `fixedexpenses_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `expensecategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monthlyexpenses` ADD CONSTRAINT `monthlyexpenses_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `expensecategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
