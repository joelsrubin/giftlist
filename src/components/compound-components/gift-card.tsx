import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';

import { gifts } from '@/db/schema';

import { handleInvalidate } from '@/main';
import { DeleteAlert } from './delete-alert';
import { deleteGift } from '@/api';
import { cn } from '@/lib/utils';

type TGift = typeof gifts.$inferInsert;

async function handleDelete(id: number | undefined) {
  if (id) {
    await deleteGift({ id });
    handleInvalidate();
  }
}
export function GiftCard({ gift }: { gift: TGift }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex gap-2 flex-col">
            <h2 className="text-2xl font-bold">{gift.gift}</h2>
            <Badge
              className={cn('w-fit text-black', {
                'bg-indigo-200 ': gift.category === 'lifestyle',
                'bg-green-200': gift.category === 'books',
                'bg-pink-200': gift.category === 'home',
                'bg-orange-200': gift.category === 'electronics',
                'bg-blue-200': gift.category === 'fashion',
              })}
            >
              {gift.category}
            </Badge>
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
