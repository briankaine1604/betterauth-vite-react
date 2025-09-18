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

const formSchema = z.object({
  email: z.email().min(1, { message: "Email is required." }),
});

export function ForgotPasswordForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await authClient.forgetPassword(
      {
        email: values.email,
        redirectTo: `${process.env.FRONTEND_URL!}/reset-password`,
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
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          <Button type="submit">Send Reset Link</Button>

          {success && (
            <p className="text-emerald-600 bg-emerald-100 opacity-75 p-2 rounded-lg">
              Reset link sent! Check your email.
            </p>
          )}
          {error && (
            <p className="text-pink-600 bg-pink-100 opacity-75 p-2 rounded-lg">
              {error}
            </p>
          )}

          <div className="mt-2 text-center">
            Remember your password?{" "}
            <a href="/sign-in" className="underline text-blue-400">
              Sign In
            </a>
          </div>
        </div>
      </form>
    </Form>
  );
}
