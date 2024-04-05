/*
  Warnings:

  - You are about to drop the column `userId` on the `Conversation` table. All the data in the column will be lost.
  - Added the required column `isOnwer` to the `ConversationUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Conversation` DROP FOREIGN KEY `Conversation_userId_fkey`;

-- AlterTable
ALTER TABLE `Conversation` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `ConversationUsers` ADD COLUMN `isOnwer` BOOLEAN NOT NULL;
