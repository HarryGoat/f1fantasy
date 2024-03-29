// Import core functionalities and styles.
import { type AppType } from "next/app";
import "~/styles/globals.css";

// Import Clerk components for user authentication.
import {
  ClerkProvider, // Provides Clerk functionality to the app.
  SignInButton, // Renders a sign-in button.
  SignOutButton, // Renders a sign-out button.
  useUser, // Hook to access user status.
} from "@clerk/nextjs";

// Import Next.js link component for navigation.
import Link from "next/link";
import { api } from "~/utils/api";

// SVGIcon component for rendering SVG icons with custom paths.
const SVGIcon = ({ path }: { path: string }) => (
  <svg className="mb-1 h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
    <path
      d={path}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

// NavigationLink component for creating navigational elements with an icon and text.
const NavigationLink = ({
  href,
  icon,
  text,
}: {
  href: string;
  icon: JSX.Element;
  text: string;
}) => (
  <Link
    href={href}
    className="dark:hover-bg-gray-800 group inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50"
  >
    {icon}
    <span className="sr-only">{text}</span> {/* Screen reader only text for accessibility. */}
  </Link>
);

// MyApp component is the main wrapper for the application, utilizing ClerkProvider for auth.
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ClerkProvider {...pageProps}> {/* ClerkProvider wraps the entire application to provide authentication context. */}
        <div className="bg-red-400 h-screen">
          <Component {...pageProps} /> {/* Renders the current page component. */}
          <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-700">
            <div className="mx-auto grid h-full max-w-lg grid-cols-6">
              {/* Conditional rendering of SignIn or SignOut button based on user's sign-in status. */}
              <SignInOrOutButton />
              {/* Navigation links with icons for different sections of the app. */}
              <NavigationLink href="/races" text="Home" icon={<SVGIcon path="M9 1v16M1 9h16" />} />
              <NavigationLink href="/statistics" text="Bookmark" icon={<SVGIcon path="M9 1v16M1 9h16" />} />
              <NavigationLink href="/" text="New post" icon={<SVGIcon path="M9 1v16M1 9h16" />} />
              <NavigationLink href="/leagues" text="Search" icon={<SVGIcon path="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />} />
              <NavigationLink href="/settings" text="Settings" icon={<SVGIcon path="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />} />
            </div>
          </div>
        </div>
      </ClerkProvider>
    </>
  );
};

// SignInOrOutButton component decides which button to show based on user's authentication status.
const SignInOrOutButton = () => {
  const { isSignedIn } = useUser(); // Checks if the user is signed in.
  return isSignedIn ? (
    // Displays SignOutButton if user is signed in.
    <SignOutButton>
      <button className="dark:hover-bg-gray-800 group col-span-1 inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50">
        <SVGIcon path="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </button>
    </SignOutButton>
  ) : (
    // Displays SignInButton if user is not signed in.
    <SignInButton>
      <button className="dark:hover-bg-gray-800 group col-span-1 inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50">
        <SVGIcon path="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
      </button>
    </SignInButton>
  );
};

export default api.withTRPC(MyApp); // Enhances the MyApp component with TRPC for data fetching.
