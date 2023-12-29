import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Outlet,
  RouterProvider,
  Router,
  Route,
  RootRoute,
  Link,
  useNavigate,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import './index.css';

import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';

import { db } from '@/db';

import { eq } from 'drizzle-orm';
import { names } from '@/db/schema';

import { Notes } from './route-components/notes';
import {
  SignedIn,
  SignedOut,
  ClerkProvider,
  SignIn,
  useUser,
  SignOutButton,
  useAuth,
  SignInButton,
} from '@clerk/clerk-react';

import { PersonIcon } from '@radix-ui/react-icons';
const rootRoute = new RootRoute({
  component: function Root() {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();
    return (
      <div className="bg-slate-100 h-full">
        <nav className="flex items-center justify-between px-4">
          <Button variant="link" asChild>
            {isSignedIn ? (
              <SignOutButton signOutCallback={() => navigate({ to: '/' })} />
            ) : (
              <SignInButton />
            )}
          </Button>

          <h1 className="text-center p-4 text-2xl font-bold underline decoration-wavy decoration-indigo-400 underline-offset-8">
            Wish List
          </h1>
          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-300">
            <span className="sr-only">Add name</span>
            <PersonIcon className="h-4 w-4" />
          </Button>
        </nav>
        <Outlet />
        <Toaster />
        <TanStackRouterDevtools />
      </div>
    );
  },
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    const { user } = useUser();
    return (
      <div className="p-2 bg-slate-100 flex flex-col gap-4 h-screen w-full space-y-4 items-center justify-center">
        <div className="w-[400px] text-center flex justify-between flex-col gap-8">
          <SignedIn>
            <div className="flex mx-auto">
              <Link
                to="/notes/$userId"
                params={{
                  userId: user?.id,
                }}
                preload="intent"
              >
                <Button className="mx-auto" variant="link">
                  Continue
                </Button>
              </Link>
              <Button variant="link" asChild>
                <SignOutButton />
              </Button>
            </div>
          </SignedIn>
          <SignedOut>
            <Link to="/signIn">
              <Button className="mx-auto" variant="link">
                Sign In
              </Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    );
  },
});

export const signInRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/signIn',
  component: () => {
    return (
      <div className="h-screen flex justify-center items-center flex-col">
        <h1 className="p-4 text-2xl font-bold hover:underline decoration-wavy decoration-indigo-400 underline-offset-8">
          Sign In
        </h1>
        <SignIn />
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
      .where(eq(names.clerkId, params.userId));

    return data;
  },
  component: Notes,
});

const routeTree = rootRoute.addChildren([indexRoute, notesRoute, signInRoute]);

const router = new Router({ routeTree });

export function handleInvalidate() {
  router.invalidate();
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </StrictMode>
  );
}
