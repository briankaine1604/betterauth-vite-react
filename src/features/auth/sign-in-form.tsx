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
  email: z.email().min(1, { message: "Email is required." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export function SignInForm() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await authClient.signIn.email(
        {
          email: values.email, // required
          password: values.password, // required
          callbackURL: `${process.env.FRONTEND_URL!}/profile`,
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
              {/* 👇 Forgot password link here */}
              <div className="mt-2 text-right">
                <a
                  href="/forgot-password"
                  className="text-sm text-gray-500 hover:text-indigo-500 hover:underline transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          <Button type="submit" disabled={isLoading}>
            Submit
            {isLoading && <Loader2 className="size-4 animate-spin ml-2" />}
          </Button>

          {success && (
            <p className="text-emerald-600 bg-emerald-100 opacity-75 p-2 rounded-lg">
              Sign In successful!
            </p>
          )}
          {error && (
            <p className="text-pink-600 bg-pink-100 opacity-75 p-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center">
            <div className="w-full border-t border-black" />
            <span className="mx-4">OR</span>
            <div className="w-full border-t border-black" />
          </div>

          <Google />

          <div className="mt-2 text-center">
            Don’t have an account?{" "}
            <a href="/sign-up" className="underline text-blue-400">
              Sign Up
            </a>
          </div>
        </div>
      </form>
    </Form>
  );
}
