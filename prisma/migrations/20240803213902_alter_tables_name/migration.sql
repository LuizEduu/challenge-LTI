/*
  Warnings:

  - You are about to drop the `Benefit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserBenefits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserBenefits` DROP FOREIGN KEY `UserBenefits_benefit_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserBenefits` DROP FOREIGN KEY `UserBenefits_user_id_fkey`;

-- DropTable
DROP TABLE `Benefit`;

-- DropTable
DROP TABLE `UserBenefits`;

-- CreateTable
CREATE TABLE `benefits` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `benefits_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_benefits` (
    `id` VARCHAR(191) NOT NULL,
    `benefit_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_benefits` ADD CONSTRAINT `user_benefits_benefit_id_fkey` FOREIGN KEY (`benefit_id`) REFERENCES `benefits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_benefits` ADD CONSTRAINT `user_benefits_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
