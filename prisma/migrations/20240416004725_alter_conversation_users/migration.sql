-- DropForeignKey
ALTER TABLE `ConversationUsers` DROP FOREIGN KEY `ConversationUsers_userId_fkey`;

-- AddForeignKey
ALTER TABLE `ConversationUsers` ADD CONSTRAINT `ConversationUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
