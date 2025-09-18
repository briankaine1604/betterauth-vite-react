import { authClient } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();
    if (!session) {
      throw redirect({ to: "/sign-in" });
    }
    return { session };
  },
  component: Profile,
});

function Profile() {
  const session = Route.useRouteContext();
  console.log(session);

  return (
    <div className="p-2">
      {session ? (
        <p>Welcome {session.session.user.name}</p>
      ) : (
        <p>No session found</p>
      )}
    </div>
  );
}
