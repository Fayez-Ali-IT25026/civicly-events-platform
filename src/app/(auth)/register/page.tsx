
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Leaf } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { FieldSeparator } from "@/components/ui/field";

const validatePassword = (password: string): string | null => {
  if (password.length < 6)
    return "Password must be at least 6 characters.";

  if (!/[A-Z]/.test(password))
    return "Password must have an uppercase letter.";

  if (!/[a-z]/.test(password))
    return "Password must have a lowercase letter.";

  return null;
};

const RegisterPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validatePassword(password);

    setPasswordError(error);

    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } =
        await authClient.signUp.email({
          name,
          email,
          password,
          image: photoURL || undefined,
          callbackURL: "/login",
        });

      if (authError) {
        toast.error(
          authError.message || "Registration failed. Try again."
        );
        return;
      }

      console.log("Registration successful:", data);

      toast.success("Account created successfully!");

      router.push("/login");
      router.refresh();

    } catch (error) {
      console.error("Registration error:", error);

      toast.error("Something went wrong. Please try again.");

    } finally {
      setLoading(false);
    }
  };

    const handelGoogleRegister = async () => {


 const data = await authClient.signIn.social({
    provider: "google",
  });
    }

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#04241b] px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-white backdrop-blur-xl">

        <div className="flex items-center justify-center gap-2 text-xl font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8be37a]/15">
            <Leaf size={18} className="text-[#8be37a]" />
          </span>
          Civicly
        </div>

        <h1 className="mt-6 text-center text-2xl font-bold">
          Create your account
        </h1>

        <p className="mt-1 text-center text-sm text-gray-400">
          Join the community and start making an impact.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your full name"
              className="border-white/15 bg-white/5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="border-white/15 bg-white/5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photoURL">Photo URL</Label>
            <Input
              id="photoURL"
              name="photoURL"
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="border-white/15 bg-white/5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••"
              className="border-white/15 bg-white/5"
            />

            {passwordError && (
              <p className="text-xs text-red-400">
                {passwordError}
              </p>
            )}
          </div>

  


          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg bg-[#8be37a] font-semibold text-[#062b20] hover:bg-[#a0f08f]"
          >
            {loading ? "Creating account..." : "Register"}
          </Button>
 <FieldSeparator className="my-5 [&_[data-slot=field-separator-content]]:bg-white">
              Or
            </FieldSeparator>
          <Button
              type="button"
              variant="outline"
                   onClick={handelGoogleRegister}
              className="h-11 w-full gap-3 rounded-xl border-sky-100 bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="size-5"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.05 13.22l7.98 6.19C11.96 13.72 17.48 9.5 24 9.5Z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.43 37.95 46.98 31.83 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.03 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.89 2.3-8.18 2.3-6.52 0-12.04-4.22-13.97-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>
              Sign up with Google
            </Button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#8be37a] hover:underline"
          >
            Login
          </Link>

        </p>

      </div>
    </section>
  );
};

export default RegisterPage;
