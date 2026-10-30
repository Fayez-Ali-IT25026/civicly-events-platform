
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Leaf, Eye, EyeOff, Mail, Lock } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      console.log("Login successful:", data);

      toast.success("Welcome back to Civicly!");

      router.push("/dashboard");
      router.refresh();

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
        <h1 className="mt-6 text-center text-2xl font-bold">
          Welcome back!
        </h1>

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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>

             
            </div>

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
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg bg-[#8be37a] font-semibold text-[#062b20] hover:bg-[#a0f08f]"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

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

export default LoginPage;
