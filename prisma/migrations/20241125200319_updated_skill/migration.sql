/*
  Warnings:

  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Social` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Catagory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CatagoryToSkill` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Social` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Skill` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Social` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "_CatagoryToSkill" DROP CONSTRAINT "_CatagoryToSkill_A_fkey";

-- DropForeignKey
ALTER TABLE "_CatagoryToSkill" DROP CONSTRAINT "_CatagoryToSkill_B_fkey";

-- AlterTable
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Skill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Social" DROP CONSTRAINT "Social_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "name" DROP DEFAULT,
ADD CONSTRAINT "Social_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Catagory";

-- DropTable
DROP TABLE "_CatagoryToSkill";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" "CATAGORY" NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SkillCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SkillCategory_AB_unique" ON "_SkillCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_SkillCategory_B_index" ON "_SkillCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Social_name_key" ON "Social"("name");

-- AddForeignKey
ALTER TABLE "_SkillCategory" ADD CONSTRAINT "_SkillCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillCategory" ADD CONSTRAINT "_SkillCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
