import { authClient } from "@/lib/auth-client";
import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function Navbar() {
  // use the built-in hook from better-auth
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const logout = () => {
    authClient.signOut();
    router.invalidate(); // re-runs loaders so session disappears everywhere
    router.navigate({ to: "/" }); // redirect to home after logout
  };

  return (
    <nav className="w-full bg-slate-900/70 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold text-indigo-400">
          Brian’s Auth
        </Link>

        {/* Nav Links */}
        <div className="flex gap-6 text-slate-300 items-center">
          <Link
            to="/"
            className="[&.active]:text-indigo-400 hover:text-white transition"
          >
            Home
          </Link>

          {/* only show when logged in */}
          {session && (
            <Link
              to="/profile"
              className="[&.active]:text-indigo-400 hover:text-white transition"
            >
              Profile
            </Link>
          )}

          {/* only show when not logged in */}
          {session && !isPending && (
            <Button
              onClick={logout}
              className="[&.active]:text-indigo-400 hover:text-white transition"
            >
              Sign Out
              <LogOut className="ml-2 inline size-3" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
