import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { db } from '@/db';
import { names } from '@/db/schema';
import { handleInvalidate, notesRoute } from '@/main';
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

export function AddNameForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { userId } = notesRoute.useParams();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await db.insert(names).values({
        name: formData.get('name') as string,
        clerkId: userId,
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
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Add name</span>
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new name</DialogTitle>
          <DialogDescription>
            Make changes to your name list. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Name"
                name="name"
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
