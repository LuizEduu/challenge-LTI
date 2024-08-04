/*
  Warnings:

  - Added the required column `emplooyeId` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Payroll` ADD COLUMN `emplooyeId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Payroll` ADD CONSTRAINT `Payroll_emplooyeId_fkey` FOREIGN KEY (`emplooyeId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payroll` ADD CONSTRAINT `Payroll_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
