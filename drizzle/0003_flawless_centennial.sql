ALTER TABLE `users` RENAME TO `gifts`;--> statement-breakpoint
/*
 SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE names ADD `clerkId` text NOT NULL;--> statement-breakpoint
ALTER TABLE gifts ADD `gift` text NOT NULL;--> statement-breakpoint
ALTER TABLE gifts ADD `price` text NOT NULL;--> statement-breakpoint
ALTER TABLE `names` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `names` DROP COLUMN `gift`;--> statement-breakpoint
ALTER TABLE `names` DROP COLUMN `price`;--> statement-breakpoint
ALTER TABLE `gifts` DROP COLUMN `clerkId`;--> statement-breakpoint
ALTER TABLE `gifts` DROP COLUMN `username`;