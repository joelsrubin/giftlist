import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Outlet,
  RouterProvider,
  Router,
  Route,
  RootRoute,
  Link,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import './index.css';

import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';

import { db } from '@/db';

import { eq } from 'drizzle-orm';
import { names } from '@/db/schema';

import { Notes } from './route-components/notes';

const rootRoute = new RootRoute({
  component: () => (
    <div className="bg-slate-100 h-full">
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </div>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className="p-2 bg-slate-100 flex flex-col gap-4 h-screen w-full space-y-4 items-center justify-center">
        <div className="w-[400px] text-center flex justify-between flex-col gap-8">
          <h1 className="p-4 text-2xl font-bold hover:underline decoration-wavy decoration-indigo-400 underline-offset-8">
            Gifts App
          </h1>
          <Link
            to="/notes/$userId"
            params={{
              userId: '1',
            }}
            preload="intent"
          >
            <Button className="mx-auto" variant="link">
              Continue
            </Button>
          </Link>
        </div>
      </div>
    );
  },
});

export const notesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/notes/$userId',
  loader: async ({ params }) => {
    const data = await db
      .select()
      .from(names)
      .where(eq(names.userId, Number(params.userId)));

    return data;
  },
  component: Notes,
});

const routeTree = rootRoute.addChildren([indexRoute, notesRoute]);

const router = new Router({ routeTree });

export function handleInvalidate() {
  router.invalidate();
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
