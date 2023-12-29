import { NamesList } from '@/components/compound-components/names-list';

import { notesRoute } from '@/main';

export function Notes() {
  const data = notesRoute.useLoaderData();

  return (
    <div className="p-2 bg-slate-100 flex flex-col h-screen space-y-4">
      <NamesList names={data} />
    </div>
  );
}
