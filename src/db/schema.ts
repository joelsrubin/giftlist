import { relations } from 'drizzle-orm';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull(),
});

export const names = sqliteTable('names', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  name: text('name').notNull(),
  gift: text('gift').notNull(),
  price: text('price').notNull(),
});

export const userNamesRelations = relations(users, ({ one }) => ({
  names: one(names, {
    fields: [users.id],
    references: [names.userId],
  }),
}));
