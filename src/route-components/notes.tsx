import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NamesTable } from '@/components/compound-components/names-table';
import { db } from '@/db';
import { names } from '@/db/schema';
import { handleInvalidate, notesRoute } from '@/main';
import { Link } from '@tanstack/react-router';
import { useRef } from 'react';
import { toast } from 'sonner';

export function Notes() {
  const data = notesRoute.useLoaderData();
  console.log({ data });
  const { userId } = notesRoute.useParams();
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const value = {
      gift: formData.get('gift') as string,
      name: formData.get('name') as string,
      price: formData.get('price') as string,
      userId: Number(userId),
    };
    try {
      await db.insert(names).values(value);
      handleInvalidate();
      toast('success!');
      formRef.current?.reset();
    } catch {
      toast('unable to submit!');
    }
  }
  return (
    <div className="p-2 bg-slate-100 flex flex-col h-screen space-y-4">
      <div className="text-center flex justify-center">
        <h1 className="p-4 text-2xl font-bold underline decoration-wavy decoration-indigo-400 underline-offset-8">
          Gift List
        </h1>
      </div>

      <Link to="/" className="justify-self-start">
        <Button variant="link">Back</Button>
      </Link>
      <div className="grow">
        <NamesTable names={data} />
      </div>
      <form
        ref={formRef}
        className="w-1/2 flex justify-start flex-col items-center mx-auto gap-2 grow"
        onSubmit={handleSubmit}
      >
        <h1 className='p-4 text-xl text-left justify-start items-start font-bold underline decoration-wavy decoration-indigo-400 underline-offset-8"'>
          Add a new gift
        </h1>
        <Input type="text" id="name" name="name" placeholder="Name" required />
        <Input
          type="text"
          id="gift"
          name="gift"
          placeholder="Gift idea"
          required
        />
        <Input
          type="text"
          id="price"
          name="price"
          placeholder="Price"
          required
        />
        <Button type="submit" className="w-full">
          submit
        </Button>
      </form>
    </div>
  );
}
