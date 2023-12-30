import { GiftCard } from '@/components/compound-components/gift-card';
import { namesRoute } from '@/main';
import noGift from '@/assets/no_gift.png';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useUser } from '@clerk/clerk-react';

import { ArrowLeft } from 'lucide-react';
import { AddGiftForm } from '@/components/compound-components/add-gift-form';

export function NamesPage() {
  const data = namesRoute.useLoaderData();
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <div className="p-2 bg-slate-100 flex flex-col h-screen space-y-4">
      <section className="p-6">
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-slate-300"
          onClick={() =>
            navigate({ to: '/notes/$userId', params: { userId: user?.id } })
          }
        >
          <span className="sr-only">Account Info</span>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:p-6">
          {data.length ? (
            data.map((gift) => <GiftCard gift={gift} key={gift.id} />)
          ) : (
            <div className="flex flex-col justify-center items-center">
              <img width={400} height={400} src={noGift} />
            </div>
          )}
          <div className="w-fit mx-auto">
            <AddGiftForm isButton />
          </div>
        </div>
      </section>
    </div>
  );
}
