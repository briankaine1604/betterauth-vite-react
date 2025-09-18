import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/verify-email")({
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-medium mb-4">Email Verified</h1>
        <p className="text-gray-600 mb-6">
          Your account has been successfully verified
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Continue
        </button>
      </div>
    </div>
  );
}
