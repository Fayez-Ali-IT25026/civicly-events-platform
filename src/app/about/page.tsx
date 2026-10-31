import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Users, Sprout, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Value = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const values: Value[] = [
  {
    icon: Heart,
    title: "Compassion First",
    text: "Every event on Civicly starts with one goal: helping someone in need.",
  },
  {
    icon: Users,
    title: "Community Driven",
    text: "Events are created by neighbours and volunteers, not by big organizations.",
  },
  {
    icon: Sprout,
    title: "Local Impact",
    text: "From Mirpur to Mohammadpur, we focus on change you can see on your street.",
  },
  {
    icon: ShieldCheck,
    title: "Open and Trusted",
    text: "Every event shows who created it, where it is, and when it happens.",
  },
];

const stats = [
  { value: "100+", label: "Events" },
  { value: "5K+", label: "Volunteers" },
  { value: "50+", label: "Communities" },
];

const AboutPage = () => {
  return (
    <main>
      {/* Header */}
      <section className="bg-[#04241b] px-6 py-20 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8be37a]">
          About Civicly
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Bringing People Together to Do Good
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 md:text-base">
          Civicly is a community platform where anyone can create, join and
          track social service events in their local area.
        </p>
      </section>

      {/* Mission */}
      <section className="bg-[#f7f5ee] px-6 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1000"
              alt="Volunteers working together"
              width={1000}
              height={700}
              className="h-80 w-full object-cover md:h-96"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-green-700">
              Our Mission
            </p>
            <h2 className="mt-2 text-4xl font-bold text-[#062b20]">
              Small Actions, Big Change
            </h2>
            <p className="mt-4 text-gray-600">
              Winter clothes for a family in Mirpur, blankets for people on the
              street in Mohammadpur, a clean park for the whole neighbourhood.
              Most good work starts with a few people who decide to show up.
            </p>
            <p className="mt-3 text-gray-600">
              Civicly makes it easy for those people to find each other. Create
              an event, share it with your area, and let volunteers join with a
              single click.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-xl bg-white p-4 text-center shadow-sm"
                >
                  <p className="text-2xl font-bold text-green-700">{value}</p>
                  <p className="mt-1 text-xs text-gray-600">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#04241b] px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8be37a]">
              What We Believe
            </p>
            <h2 className="mt-2 text-4xl font-bold">Our Values</h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#8be37a]/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8be37a]/10 ring-1 ring-[#8be37a]/30">
                  <Icon size={20} className="text-[#8be37a]" />
                </span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-gray-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-[#f7f5ee] px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#062b20] md:text-4xl">
          Ready to Make a Difference?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          Join an event near you, or start one and invite your community.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/events"
            className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Browse Events <ArrowRight size={16} />
          </Link>
          <Link
            href="/create-event"
            className="rounded-xl border border-green-600 px-6 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
          >
            Create an Event
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;