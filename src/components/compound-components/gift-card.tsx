import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';

import { gifts } from '@/db/schema';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { handleInvalidate } from '@/main';
import { DeleteAlert } from './delete-alert';

type TGift = typeof gifts.$inferInsert;

async function handleDelete(id: number | undefined) {
  if (id) {
    await db.delete(gifts).where(eq(gifts.id, id));
    handleInvalidate();
  }
}
export function GiftCard({ gift }: { gift: TGift }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold">{gift.gift}</h2>
            <Badge className="w-fit">Book</Badge>
          </div>
          <DeleteAlert handleDelete={handleDelete} id={gift.id} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-lg text-gray-500">
          A famous classic novel by F. Scott Fitzgerald
        </p>
        <div className="flex gap-4">
          <Button variant="outline">Buy Now</Button>
        </div>
      </CardContent>
    </Card>
  );
}
