import { db } from '@/db';
import { gifts, names } from '@/db/schema';
import { eq } from 'drizzle-orm';

type TName = typeof names.$inferInsert;
type TGift = typeof gifts.$inferInsert;

export async function addName({ name, clerkId }: TName) {
  await db.insert(names).values({
    name,
    clerkId,
  });
}

export async function deleteName({ id }: { id: number }) {
  await db.delete(names).where(eq(names.id, id));
}

export async function addGift({ gift, price, nameId }: TGift) {
  await db.insert(gifts).values({
    gift,
    price,
    nameId,
  });
}

export async function deleteGift({ id }: { id: number }) {
  await db.delete(gifts).where(eq(gifts.id, id));
}
