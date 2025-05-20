/*
  Warnings:

  - You are about to drop the column `ddress` on the `store` table. All the data in the column will be lost.
  - Added the required column `address` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store` DROP COLUMN `ddress`,
    ADD COLUMN `address` VARCHAR(50) NOT NULL;
