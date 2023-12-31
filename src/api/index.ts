import { db } from '@/db';
import { gifts, names } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

type TName = typeof names.$inferInsert;
type TGift = typeof gifts.$inferInsert;

export async function getNames(id: string) {
  const data = await db.select().from(names).where(eq(names.clerkId, id));
  return data;
}

export async function addName({ name, clerkId, birthDate }: TName) {
  await db.insert(names).values({
    name,
    clerkId,
    birthDate,
  });
}

export async function deleteName({ id }: { id: number }) {
  await db.delete(names).where(eq(names.id, id));
}

export async function getGifts(nameId: string) {
  const data = await db
    .select()
    .from(gifts)
    .where(eq(gifts.nameId, Number(nameId)))
    .orderBy(desc(gifts.createdAt));
  return data;
}
export async function addGift({ gift, price, nameId, category }: TGift) {
  try {
    await db.insert(gifts).values({
      gift,
      price,
      nameId,
      category,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function deleteGift({ id }: { id: number }) {
  await db.delete(gifts).where(eq(gifts.id, id));
}
