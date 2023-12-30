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
        <div className="flex justify-between flex-row pb-4">
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
          <AddGiftForm isButton={false} darkHover />
        </div>
        {data.length ? (
          <div className="sm:grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-4">
            {data.map((gift) => (
              <GiftCard gift={gift} key={gift.id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <img width={400} height={400} src={noGift} />
            <div className="w-fit mx-auto pb-4">
              <AddGiftForm isButton />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
