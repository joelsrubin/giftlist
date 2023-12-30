import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';

import { names } from '@/db/schema';
import { NameComponent } from './name-component';
import { AddNameForm } from './add-name-form';

type TName = typeof names.$inferInsert;
export function NamesList({ names }: { names: TName[] }) {
  return (
    <Card className="w-[90%] sm:w-[80%] mx-auto">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Names</CardTitle>
          <CardDescription>Add more names to your list.</CardDescription>
        </div>
        <AddNameForm isButton={false} />
      </CardHeader>
      <CardContent className="grid gap-6">
        {names.length ? (
          names.map((name) => <NameComponent key={name.id} name={name} />)
        ) : (
          <AddNameForm isButton />
        )}
      </CardContent>
    </Card>
  );
}
