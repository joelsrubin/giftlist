import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { handleInvalidate, notesRoute } from '@/main';
import { Plus } from 'lucide-react';
import { useRef, useState } from 'react';
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

import { IconButton } from './icon-button';
import { addName } from '@/api';
import { DatePicker } from './date-picker';

export function AddNameForm({ isButton }: { isButton: boolean }) {
  const [date, setDate] = useState<Date>();
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { userId } = notesRoute.useParams();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      if (date) {
        await addName({
          name: formData.get('name') as string,
          clerkId: userId,
          birthDate: date?.toISOString(),
        });
        handleInvalidate();
        toast('success!');
        formRef.current?.reset();
        buttonRef.current?.click();
      }
    } catch {
      toast('unable to submit!');
    }
  }
  return (
    <Dialog>
      <DialogClose ref={buttonRef} />
      <DialogTrigger asChild>
        {isButton ? (
          <Button>Add a name</Button>
        ) : (
          <IconButton>
            <Plus className="h-4 w-4" />
          </IconButton>
        )}
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
            <div className="grid grid-cols-2 items-center gap-4">
              <Input
                id="name"
                placeholder="Name"
                name="name"
                className="col-span-2"
                required
              />

              <DatePicker date={date} setDate={setDate} />
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
