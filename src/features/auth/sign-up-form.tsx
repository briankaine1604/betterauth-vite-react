import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Google } from "./google";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email().min(1, { message: "Email is required." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await authClient.signUp.email(
        {
          name: values.username,
          email: values.email, // required
          password: values.password, // required
          callbackURL: `${process.env.FRONTEND_URL!}/verify-email`,
        },
        {
          onSuccess: () => {
            setSuccess(true);
            setError("");
            form.reset();
          },
          onError: (ctx) => {
            console.log(ctx);
            setError(ctx.error.message);
            setSuccess(false);
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@example.com"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="****" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-4">
          <Button type="submit" disabled={isLoading}>
            Submit{" "}
            {isLoading && <Loader2 className="size-4 animate-spin ml-2" />}
          </Button>
          {success && (
            <p className="text-emerald-600 bg-emerald-100 opacity-75 p-2 rounded-lg">
              Verification email sent! Please check your inbox.
            </p>
          )}
          {error && (
            <p className="text-pink-600 bg-pink-100 opacity-75 p-2 rounded-lg">
              {error}
            </p>
          )}
          <div className="flex items-center">
            <div className="w-full border-t-1 border-black" />
            <span className="m-4">OR</span>
            <div className="w-full border-t-1 border-black" />
          </div>
          <div>
            {" "}
            <Google />
          </div>
          <div className="mt-2">
            Already have an account?{" "}
            <a href="/sign-in" className="underline text-blue-400">
              Sign In
            </a>
          </div>
        </div>
      </form>
    </Form>
  );
}
