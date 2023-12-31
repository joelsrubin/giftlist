CREATE TABLE `gifts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name_id` integer,
	`gift` text NOT NULL,
	`price` text NOT NULL,
	`category` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`name_id`) REFERENCES `names`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `names` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`clerkId` text NOT NULL,
	`name` text NOT NULL,
	`birth_date` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
