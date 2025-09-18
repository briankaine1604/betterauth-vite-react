import { SignInForm } from "@/features/auth/sign-in-form";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();
    if (session?.user) {
      throw redirect({ to: "/profile" }); // already logged in → go to profile
    }
  },
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side (Branding / Illustration) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-800 to-slate-500 text-white items-center justify-center p-12">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Brian’s Auth</h1>
          <p className="text-lg text-indigo-100">
            A beautiful and secure way to manage authentication for your apps.
          </p>
        </div>
      </div>

      {/* Right side (Sign in content) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back 👋</h2>
          <p className="text-gray-600">
            Sign in to continue to{" "}
            <span className="font-semibold">Brian’s Auth</span>
          </p>

          {/* Placeholder for form later */}
          <div className="mt-10">
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-10 text-center text-gray-400">
              <SignInForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
