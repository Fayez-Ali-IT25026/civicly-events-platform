import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  return (
    <section className="bg-[#f7f5ee] px-6 py-10 dark:bg-[#0a1d17]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 rounded-3xl bg-gradient-to-r from-[#04241b] to-[#0a3d2e] px-8 py-8 text-white md:flex-row md:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#8be37a]/15 ring-1 ring-[#8be37a]/30">
            <Mail className="text-[#8be37a]" />
          </span>
          <div>
            <h3 className="text-lg font-semibold">Join Our Newsletter</h3>
            <p className="text-sm text-gray-300">
              Get the latest updates on upcoming events, community stories, and
              ways to get involved.
            </p>
          </div>
        </div>

        <div className="flex w-full max-w-md gap-2">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="h-11 rounded-lg border-0 bg-white text-gray-900"
          />
          <Button className="h-11 rounded-lg bg-[#8be37a] px-6 font-semibold text-[#062b20] hover:bg-[#a0f08f]">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;