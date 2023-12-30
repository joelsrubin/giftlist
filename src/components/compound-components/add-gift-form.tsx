import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { handleInvalidate, namesRoute } from '@/main';
import { Plus } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { IconButton } from './icon-button';
import { addGift } from '@/api';

export function AddGiftForm({ isButton }: { isButton: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { nameId } = namesRoute.useParams();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await addGift({
        gift: formData.get('gift') as string,
        price: formData.get('price') as string,
        nameId: Number(nameId),
      });
      handleInvalidate();
      toast('success!');
      formRef.current?.reset();
      buttonRef.current?.click();
    } catch {
      toast('unable to submit!');
    }
  }
  return (
    <Dialog>
      <DialogClose ref={buttonRef} />
      <DialogTrigger asChild>
        {isButton ? (
          <Button>Add a gift</Button>
        ) : (
          <IconButton>
            <Plus className="h-4 w-4" />
          </IconButton>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a gift</DialogTitle>
          <DialogDescription>
            Make changes to your name list. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gift" className="text-left">
                Gift
              </Label>
              <Input
                id="gift"
                placeholder="Gift"
                name="gift"
                className="col-span-3"
              />
              <Label htmlFor="price" className="text-left">
                Price
              </Label>
              <Input
                id="price"
                placeholder="Price"
                name="price"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
