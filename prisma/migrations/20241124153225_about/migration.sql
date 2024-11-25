/*
  Warnings:

  - You are about to drop the column `aboutImg` on the `Basic` table. All the data in the column will be lost.
  - Added the required column `img` to the `About` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "About" ADD COLUMN     "img" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Basic" DROP COLUMN "aboutImg";
