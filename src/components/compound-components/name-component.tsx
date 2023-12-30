import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import { names } from '@/db/schema';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { db } from '@/db';
import { handleInvalidate } from '@/main';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';

export function NameComponent({ name }: { name: typeof names.$inferInsert }) {
  const firstLetter = name.name.charAt(0).toUpperCase();
  return (
    <div className="flex justify-between">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="/avatars/01.png" />
          <AvatarFallback>{firstLetter}</AvatarFallback>
        </Avatar>
        <div>
          <Link to="/names/$nameId" params={{ nameId: String(name.id) }}>
            <p className="text-sm font-medium leading-none hover:underline">
              {name.name}
            </p>
          </Link>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <div className="text-right">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={async () => {
                await db.delete(names).where(eq(names.id, name.id!));
                handleInvalidate();
                toast('Deleted!');
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
