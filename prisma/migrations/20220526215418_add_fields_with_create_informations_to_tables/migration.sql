/*
  Warnings:

  - A unique constraint covering the columns `[createdBy]` on the table `expensecategories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdBy]` on the table `expensegroups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdBy]` on the table `fixedexpenses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdBy]` on the table `monthlyexpenses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdBy]` on the table `responsibles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdBy` to the `expensecategories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `expensegroups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `fixedexpenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `monthlyexpenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `responsibles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `expensecategories` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `createdBy` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `expensegroups` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `createdBy` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `fixedexpenses` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `createdBy` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `monthlyexpenses` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `createdBy` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `responsibles` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `createdBy` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `expensecategories_createdBy_key` ON `expensecategories`(`createdBy`);

-- CreateIndex
CREATE UNIQUE INDEX `expensegroups_createdBy_key` ON `expensegroups`(`createdBy`);

-- CreateIndex
CREATE UNIQUE INDEX `fixedexpenses_createdBy_key` ON `fixedexpenses`(`createdBy`);

-- CreateIndex
CREATE UNIQUE INDEX `monthlyexpenses_createdBy_key` ON `monthlyexpenses`(`createdBy`);

-- CreateIndex
CREATE UNIQUE INDEX `responsibles_createdBy_key` ON `responsibles`(`createdBy`);

-- AddForeignKey
ALTER TABLE `responsibles` ADD CONSTRAINT `responsibles_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expensecategories` ADD CONSTRAINT `expensecategories_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expensegroups` ADD CONSTRAINT `expensegroups_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fixedexpenses` ADD CONSTRAINT `fixedexpenses_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monthlyexpenses` ADD CONSTRAINT `monthlyexpenses_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
