import { Search, UserPlus, Heart, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  text: string;
};

const steps: Step[] = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    text: "Explore upcoming events in your area.",
  },
  {
    number: "02",
    icon: UserPlus,
    title: "Join",
    text: "Sign up and become a part of the community.",
  },
  {
    number: "03",
    icon: Heart,
    title: "Make Impact",
    text: "Contribute your time, skills, or support.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#04241b] px-6 py-16 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[260px_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8be37a]">
            Our Process
          </p>
          <h2 className="mt-3 text-4xl font-bold leading-tight">How It Works</h2>
          <p className="mt-4 text-sm text-gray-400">
            Just 3 simple steps to make a difference in your community.
          </p>
        </div>

        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {steps.map(({ number, icon: Icon, title, text }, i) => (
            <div key={title} className="contents">
              <div className="relative flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-[#8be37a]/40">
                <span className="absolute -top-3 left-5 flex h-7 w-7 items-center justify-center rounded-full bg-[#8be37a] text-xs font-bold text-[#062b20]">
                  {number}
                </span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8be37a]/10 ring-1 ring-[#8be37a]/30">
                  <Icon size={22} className="text-[#8be37a]" />
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-gray-400">{text}</p>
                </div>
              </div>

              {i < steps.length - 1 && (
                <ArrowRight className="hidden text-[#8be37a]/60 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;