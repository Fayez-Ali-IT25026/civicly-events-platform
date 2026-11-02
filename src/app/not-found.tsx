import Link from "next/link";
import { Leaf, ArrowRight, Home } from "lucide-react";

const NotFound = () => {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#04241b] px-6 py-20 text-white">
      {/* Green glow */}
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#8be37a]/10 blur-[100px]" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#8be37a]/10 blur-[100px]" />

      <div className="relative z-10 max-w-lg text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8be37a]/15 ring-1 ring-[#8be37a]/30">
          <Leaf size={26} className="text-[#8be37a]" />
        </span>

        <p className="mt-6 bg-gradient-to-r from-[#8be37a] to-[#c4f5a8] bg-clip-text text-8xl font-extrabold leading-none text-transparent md:text-9xl">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold md:text-4xl">
          Page Not Found
        </h1>

        <p className="mt-3 text-sm text-gray-400 md:text-base">
          The page you are looking for does not exist, or the event may have
          been removed by its organizer.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-[#8be37a] px-6 py-2.5 text-sm font-bold text-[#062b20] shadow-[0_0_20px_rgba(139,227,122,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a0f08f]"
          >
            <Home size={16} />
            Back to Home
          </Link>

          <Link
            href="/events"
            className="flex items-center gap-2 rounded-full border border-[#8be37a]/50 bg-white/[0.04] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#8be37a]/10"
          >
            Browse Events
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;