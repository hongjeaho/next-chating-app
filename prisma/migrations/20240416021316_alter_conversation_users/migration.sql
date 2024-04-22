-- DropForeignKey
ALTER TABLE `ConversationUsers` DROP FOREIGN KEY `ConversationUsers_conversationId_fkey`;

-- AddForeignKey
ALTER TABLE `ConversationUsers` ADD CONSTRAINT `ConversationUsers_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
