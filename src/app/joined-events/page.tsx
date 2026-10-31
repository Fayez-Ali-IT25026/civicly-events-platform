"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import type { Event } from "@/types/event";
import { authClient } from "@/lib/auth-client";
import EventCard from "@/components/events/EventCard";
import { Skeleton } from "@/components/ui/skeleton";

const JoinedEventsPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = session?.user?.id;

  // Load the events joined by the logged-in user (already sorted by date)
  useEffect(() => {
    if (!userId) return;

    const loadEvents = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/joined-events?userId=${encodeURIComponent(userId)}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to load joined events.");

        setEvents(await res.json());
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [userId]);

  // Not logged in
  if (!isPending && !session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">
          Please login to see your joined events
        </h2>
        <Link
          href="/login"
          className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
        >
          Go to Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-5">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold md:text-5xl">Joined Events</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Events you have joined, sorted by event date.
          </p>
        </div>

        {/* Loading skeletons */}
        {(isPending || loading) && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-96 w-full rounded-2xl" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isPending && !loading && events.length === 0 && (
          <div className="rounded-2xl border border-dashed bg-white py-20 text-center dark:bg-gray-900">
            <h2 className="text-xl font-bold">No Joined Events</h2>
            <p className="mt-2 text-muted-foreground">
              You have not joined any event yet.
            </p>
            <Link
              href="/events"
              className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
            >
              Browse Events
            </Link>
          </div>
        )}

        {/* Events */}
        {!loading && events.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default JoinedEventsPage;