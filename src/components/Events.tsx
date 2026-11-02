import { connection } from "next/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Event } from "@/types/event";
import EventCard from "@/components/events/EventCard";

const getEvents = async (): Promise<Event[]> => {
  // Wait for a real request, so this fetch is not run during prerender
  await connection();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-events`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch events");

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Events = async () => {
  const events = await getEvents();

  return (
    <section className="bg-[#f7f5ee] px-6 py-16 dark:bg-[#0a1d17]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-green-700">
              Upcoming Events
            </p>
            <h2 className="mt-2 text-4xl font-bold text-[#062b20] dark:text-white">
              Find Your Next Good Deed.
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Join local events, support your community, and be the change.
            </p>
          </div>

          <Link
            href="/events"
            className="hidden items-center gap-1 text-sm font-medium text-[#062b20] hover:underline dark:text-white sm:flex"
          >
            View All Events <ArrowRight size={14} />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center dark:border-white/20 dark:bg-white/5">
            <h3 className="text-lg font-bold text-[#062b20] dark:text-white">
              No Upcoming Events Yet
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Be the first to create one for your community.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;