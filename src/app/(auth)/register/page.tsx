
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
          callbackURL: "/dashboard",
        });

      if (authError) {
        toast.error(
          authError.message || "Registration failed. Try again."
        );
        return;
      }

      console.log("Registration successful:", data);

      toast.success("Account created successfully!");

      router.push("/dashboard");
      router.refresh();

    } catch (error) {
      console.error("Registration error:", error);

      toast.error("Something went wrong. Please try again.");

    } finally {
      setLoading(false);
    }
  };

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
