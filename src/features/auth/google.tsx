"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { GoogleIcon } from "./google-icon";

export const Google = () => {
  const handleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:5173",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      type="button"
      className="w-full"
      variant={"outline"}
    >
      Sign in with Google
      <GoogleIcon />
    </Button>
  );
};
