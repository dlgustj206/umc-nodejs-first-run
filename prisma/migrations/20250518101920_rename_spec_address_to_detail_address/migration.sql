/*
  Warnings:

  - You are about to drop the column `namea` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `spec_address` on the `user` table. All the data in the column will be lost.
  - Added the required column `name` to the `store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detail_address` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store` DROP COLUMN `namea`,
    ADD COLUMN `name` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `spec_address`,
    ADD COLUMN `detail_address` VARCHAR(40) NOT NULL;
