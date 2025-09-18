import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        Brian’s <span className="text-indigo-400">Auth</span>
      </h1>
      <p className="mt-4 text-lg text-slate-300 max-w-md text-center">
        Secure authentication made simple. Built with Better Auth + Vite +
        Tailwind + Hono. Using Bun runtime!
      </p>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        {isPending ? (
          <span className="text-slate-400">Loading...</span>
        ) : session ? (
          <>
            <a
              href="/profile"
              className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition font-medium shadow-lg"
            >
              Profile
            </a>
            <button
              onClick={() => authClient.signOut()}
              className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition font-medium shadow-lg"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <a
              href="/sign-in"
              className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition font-medium shadow-lg"
            >
              Sign In
            </a>
            <a
              href="/sign-up"
              className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition font-medium shadow-lg"
            >
              Get Started
            </a>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-slate-400">
        © {new Date().getFullYear()} Brian’s Auth. All rights reserved.
      </footer>
    </main>
  );
}
