/*
  Warnings:

  - You are about to drop the `Payroll` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Payroll` DROP FOREIGN KEY `Payroll_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `Payroll` DROP FOREIGN KEY `Payroll_emplooyeId_fkey`;

-- DropForeignKey
ALTER TABLE `payroll_benefits` DROP FOREIGN KEY `payroll_benefits_payroll_id_fkey`;

-- AlterTable
ALTER TABLE `benefits` ALTER COLUMN `value` DROP DEFAULT;

-- DropTable
DROP TABLE `Payroll`;

-- CreateTable
CREATE TABLE `payroll` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `first_period` DATETIME(3) NOT NULL,
    `last_period` DATETIME(3) NOT NULL,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `total_payment` DOUBLE NOT NULL,
    `department_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `emplooye_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payroll` ADD CONSTRAINT `payroll_emplooye_id_fkey` FOREIGN KEY (`emplooye_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payroll` ADD CONSTRAINT `payroll_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payroll_benefits` ADD CONSTRAINT `payroll_benefits_payroll_id_fkey` FOREIGN KEY (`payroll_id`) REFERENCES `payroll`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
