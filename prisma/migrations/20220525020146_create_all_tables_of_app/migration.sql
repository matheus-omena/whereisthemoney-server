-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `responsibles` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expensecategories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expensegroups` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `paymentDate` DATETIME(3) NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `expensegroups_categoryId_key`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fixedexpenses` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,
    `paymentDate` DATETIME(3) NULL,
    `totalInstallments` INTEGER NULL,
    `currentInstallment` INTEGER NULL,
    `responsibleId` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `fixedexpenses_responsibleId_key`(`responsibleId`),
    UNIQUE INDEX `fixedexpenses_groupId_key`(`groupId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monthlyexpenses` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,
    `paymentDate` DATETIME(3) NULL,
    `totalInstallments` INTEGER NULL,
    `currentInstallment` INTEGER NULL,
    `responsibleId` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `fixedExpenseId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `monthlyexpenses_responsibleId_key`(`responsibleId`),
    UNIQUE INDEX `monthlyexpenses_groupId_key`(`groupId`),
    UNIQUE INDEX `monthlyexpenses_fixedExpenseId_key`(`fixedExpenseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `expensegroups` ADD CONSTRAINT `expensegroups_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `expensecategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fixedexpenses` ADD CONSTRAINT `fixedexpenses_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `responsibles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fixedexpenses` ADD CONSTRAINT `fixedexpenses_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `expensegroups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monthlyexpenses` ADD CONSTRAINT `monthlyexpenses_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `responsibles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monthlyexpenses` ADD CONSTRAINT `monthlyexpenses_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `expensegroups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monthlyexpenses` ADD CONSTRAINT `monthlyexpenses_fixedExpenseId_fkey` FOREIGN KEY (`fixedExpenseId`) REFERENCES `fixedexpenses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
