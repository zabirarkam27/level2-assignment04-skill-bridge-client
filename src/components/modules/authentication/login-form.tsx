"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");

      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}`,
        });
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Logged  in successfully", { id: toastId });
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}`,
      });
      console.log(data);
    } catch {
      toast.error("Google login Failed");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-[#611f69]/40 dark:border-[#c084fc]/40">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-[#611f69] dark:text-[#e9d5ff]">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const invalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={invalid}>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={field.state.value}
                        // required
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="focus-visible:ring-[#611f69]/40 dark:focus-visible:ring-[#c084fc]/40 h-10"
                      />
                      {invalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="password"
                children={(field) => {
                  const invalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={invalid}>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={field.state.value}
                        // required
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="focus-visible:ring-[#611f69]/40 dark:focus-visible:ring-[#c084fc]/40 h-10"
                      />
                      {invalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            form="login-form"
            type="submit"
            disabled={form.state.isSubmitting}
            className="w-full bg-[#611f69] text-white hover:bg-[#4a174f] dark:bg-[#c084fc] dark:text-black dark:hover:bg-[#d8b4fe]"
          >
            {form.state.isSubmitting ? "Logging in..." : "Login"}
          </Button>
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            type="button"
            className="
                    w-full border-[#611f69]/40 text-[#611f69] hover:bg-[#611f69]/10  dark:border-[#c084fc]/40 dark:text-[#e9d5ff] dark:hover:bg-white/10
                  "
          >
            Login with Google
          </Button>
          <div className="mx-auto text-center items-center mt-5">
            <a
              href="#"
              className="text-center mx-auto text-muted-foreground hover:text-[#611f69] dark:hover:text-[#d8b4fe] transition-colors inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <FieldDescription className="text-center ">
            Don&apos;t have an account?{" "}
            <span className="text-center mx-auto text-muted-foreground hover:text-[#611f69] dark:hover:text-[#d8b4fe] transition-colors inline-block text-sm underline-offset-4 underline">
              <a href="/sign-up">Sign up</a>
            </span>
          </FieldDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
