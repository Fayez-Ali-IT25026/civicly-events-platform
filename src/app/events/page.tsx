import { Suspense } from "react";
import { connection } from "next/server";
import { Skeleton } from "@/components/ui/skeleton";
import type { Event } from "@/types/event";
import EventCard from "@/components/events/EventCard";

async function getEvents(): Promise<Event[]> {
  // Wait for a real request, so this fetch is not run during prerender
  await connection();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

function getTodayInDhaka() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

async function UpcomingEvents() {
  const allEvents = await getEvents();

  const today = getTodayInDhaka();

  const upcomingEvents = allEvents
    .filter((event) => event.eventDate >= today)
    .sort((a, b) =>
      a.eventDate.localeCompare(b.eventDate)
    );

  return (
    <main className="min-h-screen bg-gray-50 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-5">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-green-600">
            Make A Difference Together
          </p>

          <h1 className="text-3xl font-bold md:text-5xl">
            Upcoming Events
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Discover upcoming community events, connect with
            people, and make a positive impact.
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            {upcomingEvents.length} events available
          </p>
        </div>

        {/* Events */}
        {upcomingEvents.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed bg-white py-20 text-center dark:bg-gray-900">
            <h2 className="text-xl font-bold">
              No Upcoming Events
            </h2>

            <p className="mt-2 text-muted-foreground">
              There are currently no upcoming events.
              Check back later!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

const UpcomingEventsPage = () => {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 py-16 dark:bg-gray-950">
          <div className="mx-auto grid max-w-7xl gap-7 px-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-96 w-full rounded-2xl" />
            ))}
          </div>
        </main>
      }
    >
      <UpcomingEvents />
    </Suspense>
  );
};

export default UpcomingEventsPage;