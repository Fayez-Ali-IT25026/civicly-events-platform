"use client";

import { Suspense, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Leaf, Eye, EyeOff, Mail, Lock } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { FieldSeparator } from "@/components/ui/field";

// Only allow internal paths, so nobody can redirect users to another site
const getSafeCallback = (value: string | null) =>
  value && value.startsWith("/") && !value.startsWith("//") ? value : "/";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = getSafeCallback(searchParams.get("callbackURL"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success("Welcome back to Civicly!");

      router.push(callbackURL);
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#04241b] px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-white backdrop-blur-xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 text-xl font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8be37a]/15">
            <Leaf size={18} className="text-[#8be37a]" />
          </span>
          Civicly
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-center text-2xl font-bold">Welcome back!</h1>

        <p className="mt-1 text-center text-sm text-gray-400">
          Sign in to continue making an impact.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>

            <div className="relative">
              <Mail
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="border-white/15 bg-white/5 pl-10 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Lock
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="border-white/15 bg-white/5 pl-10 pr-11 text-white placeholder:text-gray-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg bg-[#8be37a] font-semibold text-[#062b20] hover:bg-[#a0f08f]"
          >
            {loading ? "Signing in..." : "Login"}
          </Button>

          <FieldSeparator className="my-5 [&_[data-slot=field-separator-content]]:bg-white">
            Or
          </FieldSeparator>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.05 13.22l7.98 6.19C12.94 13.72 18.01 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.42 37.96 46.98 31.81 46.98 24.55z"
              />
              <path
                fill="#FBBC05"
                d="M10.03 28.59A14.4 14.4 0 0 1 9.25 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.57 10.78l7.46-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-5.99 0-11.06-4.22-12.97-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48z"
              />
            </svg>
            Login With Google
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-[#8be37a] hover:underline"
          >
            Create account
          </Link>
        </p>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-500">
          Together, we make communities stronger.
        </p>
      </div>
    </section>
  );
};

// useSearchParams needs a Suspense boundary
const LoginPage = () => {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;