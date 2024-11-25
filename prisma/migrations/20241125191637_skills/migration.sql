/*
  Warnings:

  - The primary key for the `Social` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `name` column on the `Social` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CATAGORY" AS ENUM ('FRONTEND', 'BACKEND', 'TOOLS');

-- CreateEnum
CREATE TYPE "SOCIAL" AS ENUM ('INSTAGRAM', 'GITHUB', 'LINKEDIN', 'X');

-- AlterTable
ALTER TABLE "Social" DROP CONSTRAINT "Social_pkey",
DROP COLUMN "name",
ADD COLUMN     "name" "SOCIAL" NOT NULL DEFAULT 'GITHUB',
ADD CONSTRAINT "Social_pkey" PRIMARY KEY ("name");

-- CreateTable
CREATE TABLE "Catagory" (
    "name" "CATAGORY" NOT NULL DEFAULT 'FRONTEND',
    "icon" TEXT NOT NULL,

    CONSTRAINT "Catagory_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Skill" (
    "name" TEXT NOT NULL,
    "level" INTEGER,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "_CatagoryToSkill" (
    "A" "CATAGORY" NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CatagoryToSkill_AB_unique" ON "_CatagoryToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_CatagoryToSkill_B_index" ON "_CatagoryToSkill"("B");

-- AddForeignKey
ALTER TABLE "_CatagoryToSkill" ADD CONSTRAINT "_CatagoryToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Catagory"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CatagoryToSkill" ADD CONSTRAINT "_CatagoryToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("name") ON DELETE CASCADE ON UPDATE CASCADE;
