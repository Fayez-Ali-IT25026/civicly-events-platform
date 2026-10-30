
import {
  Leaf,
  ArrowRight,
  Calendar,
  Users,
  Globe,
} from "lucide-react";
import Image from "next/image";

const stats = [
  { icon: Calendar, value: "100+", label: "Events" },
  { icon: Users, value: "5K+", label: "Volunteers" },
  { icon: Globe, value: "50+", label: "Communities" },
];

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#021d18] text-white">

      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=90"
        alt="Hands planting a green sapling"
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover object-center"
      />

      {/* Background Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#021d18] via-[#021d18]/90 via-40% to-[#021d18]/10" />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#021d18]/90 via-transparent to-[#021d18]/10" />

      {/* Green Glow */}
      <div className="absolute -left-32 top-10 z-10 h-80 w-80 rounded-full bg-[#8be37a]/10 blur-[100px]" />

      {/* Main Content */}
      <div className="relative z-20 mx-auto flex min-h-[480px] max-w-[1400px] items-center justify-between px-6 py-16 lg:min-h-[330px] lg:px-12 lg:py-10">

        {/* Left Content */}
        <div className="max-w-xl">

          {/* Category Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[11px] font-medium tracking-wide text-gray-200 backdrop-blur-md">
            Community
            <span className="text-[#8be37a]">•</span>
            Volunteering
            <span className="text-[#8be37a]">•</span>
            Social Impact
          </span>

          {/* Brand */}
          <div className="mt-5 flex items-center gap-2.5">
            <Leaf
              size={29}
              strokeWidth={2}
              className="fill-[#8be37a]/20 text-[#8be37a]"
            />
            <span className="text-2xl font-bold tracking-tight">
              Civicly
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-2 text-[42px] font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Small Acts.
            <br />
            <span className="bg-gradient-to-r from-[#8be37a] to-[#c4f5a8] bg-clip-text text-transparent">
              Big Impact.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-gray-300 md:text-sm">
            A community-driven platform that connects people
            with meaningful social events, helping build a
            kinder, healthier, and more sustainable world.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">

            <a
              href="/events"
              className="group flex items-center gap-2 rounded-full bg-[#8be37a] px-5 py-2.5 text-xs font-bold text-[#062b20] shadow-[0_0_20px_rgba(139,227,122,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a0f08f]"
            >
              Explore Events
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="/about"
              className="group flex items-center gap-2 rounded-full border border-[#8be37a]/50 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-[#8be37a]/10"
            >
              Learn More
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#8be37a] text-[#8be37a]">
                <ArrowRight size={10} />
              </span>
            </a>

          </div>
        </div>

        {/* Right Side: Tagline + Stats */}
        <div className="hidden items-center gap-5 xl:flex">

          {/* Decorative Tagline */}
          <div className="relative -rotate-6 text-right">
            <p className="font-serif text-[22px] italic leading-tight text-white/90">
              Better
              <br />
              Communities
              <br />
              Brighter
              <br />
              Futures
            </p>

            <div className="ml-auto mt-2 h-[3px] w-12 rotate-[-15deg] rounded-full bg-[#8be37a]" />
          </div>

          {/* Statistics Card */}
          <div className="w-[180px] divide-y divide-white/[0.08] rounded-2xl border border-emerald-400/15 bg-[#04241b]/75 px-4 backdrop-blur-xl">

            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 py-3.5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#8be37a]/30 bg-[#8be37a]/10">
                  <Icon
                    size={19}
                    strokeWidth={1.7}
                    className="text-[#8be37a]"
                  />
                </span>

                <div>
                  <p className="text-base font-bold leading-none text-white">
                    {value}
                  </p>
                  <p className="mt-1 text-[10px] text-gray-400">
                    {label}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
