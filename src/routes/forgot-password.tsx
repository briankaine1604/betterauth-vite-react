import { ForgotPasswordForm } from "@/features/auth/forgot-password-form";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot-password")({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();
    if (session?.user) {
      throw redirect({ to: "/profile" }); // already logged in → go to profile
    }
  },
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side (Branding / Illustration) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-800 to-slate-500 text-white items-center justify-center p-12">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Brian's Auth</h1>
          <p className="text-lg text-indigo-100">
            Don't worry, we'll help you get back into your account.
          </p>
        </div>
      </div>

      {/* Right side (Forgot password content) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Forgot Password? 🔐
          </h2>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <div className="mt-10">
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-10 text-center text-gray-400">
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
