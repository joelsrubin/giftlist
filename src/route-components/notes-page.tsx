import { NamesList } from '@/components/compound-components/names-list';

import { notesRoute } from '@/main';
import { useAuth } from '@clerk/clerk-react';
import { redirect } from '@tanstack/react-router';

export function NotesPage() {
  const data = notesRoute.useLoaderData();
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    throw redirect({ to: '/' });
  }
  return (
    <div className="p-2 bg-slate-100 flex flex-col h-screen space-y-4">
      <NamesList names={data} />
    </div>
  );
}
