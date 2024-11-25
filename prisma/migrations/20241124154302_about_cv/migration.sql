/*
  Warnings:

  - Added the required column `cv` to the `About` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "About" ADD COLUMN     "cv" TEXT NOT NULL;
