import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import { names } from '@/db/schema';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { handleInvalidate } from '@/main';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';
import { deleteName } from '@/api';

export function NameComponent({ name }: { name: typeof names.$inferInsert }) {
  const firstLetter = name.name.charAt(0).toUpperCase();
  const secondLetter = name.name.split(' ')[1]?.charAt(0).toUpperCase();
  const [month, day] = new Date(name.birthDate).toLocaleString().split('/');
  function getFormattedDate() {
    if (Number(month) < 10) {
      return `0${month}/${day}`;
    }
    return `${month}/${day}`;
  }
  return (
    <div className="flex justify-between">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="/avatars/01.png" />
          <AvatarFallback>
            {firstLetter}
            {secondLetter ?? ''}
          </AvatarFallback>
        </Avatar>
        <div>
          <Link to="/names/$nameId" params={{ nameId: String(name.id) }}>
            <p className="text-sm font-medium leading-none hover:underline">
              {name.name}
            </p>
          </Link>
        </div>
        <p className="text-xs font-light text-slate-400">
          {getFormattedDate()}
        </p>
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
                if (name.id) {
                  await deleteName({ id: name.id });
                  handleInvalidate();
                  toast('Deleted!');
                }
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
