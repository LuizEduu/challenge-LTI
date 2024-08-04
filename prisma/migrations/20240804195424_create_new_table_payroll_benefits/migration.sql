-- CreateTable
CREATE TABLE `payroll_benefits` (
    `id` VARCHAR(191) NOT NULL,
    `payroll_id` VARCHAR(191) NOT NULL,
    `benefit_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payroll_benefits` ADD CONSTRAINT `payroll_benefits_payroll_id_fkey` FOREIGN KEY (`payroll_id`) REFERENCES `Payroll`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payroll_benefits` ADD CONSTRAINT `payroll_benefits_benefit_id_fkey` FOREIGN KEY (`benefit_id`) REFERENCES `benefits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
