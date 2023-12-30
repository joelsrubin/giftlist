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
import logo from '@/assets/avatar.png';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';

import { NotesPage } from './route-components/notes-page';
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

import { DropdownMenuComponent as DropDown } from './components/compound-components/dropdown-menu';
import { NamesPage } from './route-components/name-page';
import { getGifts, getNames } from './api';
const rootRoute = new RootRoute({
  component: function Root() {
    const { isSignedIn } = useAuth();

    return (
      <div className="bg-slate-100 h-svh">
        <nav className="flex items-center justify-between px-4">
          <Link to="/">
            <h1 className="text-center p-4 text-3xl font-bold underline decoration-wavy decoration-indigo-400 underline-offset-8">
              Wish List
            </h1>
          </Link>
          <Button className="text-xl" variant="default" asChild>
            {isSignedIn ? <DropDown /> : <SignInButton />}
          </Button>
        </nav>
        <SignedIn>
          <Outlet />
        </SignedIn>
        <SignedOut>
          <div className="w-[400px] mx-auto h-full text-center flex justify-center items-center gap-8">
            <img src={logo} />
          </div>
        </SignedOut>
        <Toaster />
        {import.meta.env.DEV && <TanStackRouterDevtools />}
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
        </div>
      </div>
    );
  },
});

export const signInRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/signIn',
  component: () => {
    return <SignIn />;
  },
});

export const notesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/notes/$userId',
  loader: async ({ params }) => {
    const data = getNames(params.userId);
    return data;
  },
  component: NotesPage,
});

export const namesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: `/names/$nameId`,
  loader: async ({ params }) => {
    const data = await getGifts(params.nameId);
    return data;
  },
  component: NamesPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  notesRoute,
  signInRoute,
  namesRoute,
]);

const router = new Router({
  routeTree,
});

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
