import { relations } from 'drizzle-orm';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const gifts = sqliteTable('gifts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nameId: integer('name_id').references(() => names.id),
  gift: text('gift').notNull(),
  price: text('price').notNull(),
});

export const names = sqliteTable('names', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clerkId: text('clerkId').notNull(),
  name: text('name').notNull(),
});

export const usersRelations = relations(names, ({ many }) => ({
  gifts: many(gifts),
}));

export const giftsRelations = relations(gifts, ({ one }) => ({
  name: one(names, {
    fields: [gifts.id],
    references: [names.id],
  }),
}));
