/*
  Warnings:

  - You are about to drop the `ConversationUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `conversationUserId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ConversationUser` DROP FOREIGN KEY `ConversationUser_conversationId_fkey`;

-- DropForeignKey
ALTER TABLE `ConversationUser` DROP FOREIGN KEY `ConversationUser_userId_fkey`;

-- AlterTable
ALTER TABLE `Conversation` ADD COLUMN `conversationUserId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `ConversationUser`;
