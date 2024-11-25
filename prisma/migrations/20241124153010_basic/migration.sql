/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- DropTable
DROP TABLE "account";

-- DropTable
DROP TABLE "session";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "verification";

-- CreateTable
CREATE TABLE "Basic" (
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "slogan" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "mainImg" TEXT NOT NULL,
    "aboutImg" TEXT NOT NULL,

    CONSTRAINT "Basic_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "About" (
    "text1" TEXT NOT NULL,
    "text2" TEXT NOT NULL,
    "text3" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("text1","text2","text3")
);

-- CreateTable
CREATE TABLE "Social" (
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("name")
);
