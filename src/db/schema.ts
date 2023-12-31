import { GIFTS_TYPES } from '@/constants';
import { relations, sql } from 'drizzle-orm';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const gifts = sqliteTable('gifts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nameId: integer('name_id').references(() => names.id, {
    onDelete: 'cascade',
  }),
  gift: text('gift').notNull(),
  price: text('price').notNull(),
  category: text('category', { enum: GIFTS_TYPES }).notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const names = sqliteTable('names', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clerkId: text('clerkId').notNull(),
  name: text('name').notNull(),
  birthDate: text('birth_date').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
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
