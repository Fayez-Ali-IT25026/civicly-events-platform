
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  MapPin,
  UserRound,
  ArrowLeft,
  Clock,
  Share2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import JoinEventButton from "./JoinEventButton";

import type { Event } from "@/types/event";

interface Props {
  params: Promise<{ id: string }>;
}

// Fetch event from backend
async function getEvent(id: string): Promise<Event | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;

    return response.json();
  } catch {
    return null;
  }
}

export default async function EventDetailsPage({ params }: Props) {
  const { id } = await params;

  const event = await getEvent(id);

  if (!event) notFound();

  const eventDate = new Date(event.eventDate);

  const formattedDate = eventDate.toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = eventDate.toLocaleTimeString("en-BD", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">

        {/* Back Button */}
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-600 dark:text-gray-300"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        {/* Event Image */}
        <div className="relative overflow-hidden rounded-2xl bg-gray-200">
          <Image
            src={event.image}
            alt={event.title}
            width={1200}
            height={600}
            priority
            className="h-[260px] w-full object-cover md:h-[430px]"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 md:p-10">
            <Badge className="mb-3 border-0 bg-green-500 text-white">
              {event.eventType}
            </Badge>

            <h1 className="max-w-3xl text-3xl font-bold text-white md:text-5xl">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* Left Section */}
          <div className="space-y-8 lg:col-span-2">

            {/* Event Information */}
            <section className="grid gap-4 sm:grid-cols-2">

              <div className="flex items-center gap-4 rounded-xl border bg-white p-5 dark:bg-gray-900">
                <div className="rounded-lg bg-green-100 p-3 text-green-700 dark:bg-green-950 dark:text-green-400">
                  <CalendarDays size={23} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Event Date</p>
                  <p className="font-semibold">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border bg-white p-5 dark:bg-gray-900">
                <div className="rounded-lg bg-green-100 p-3 text-green-700 dark:bg-green-950 dark:text-green-400">
                  <Clock size={23} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Event Time</p>
                  <p className="font-semibold">{formattedTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border bg-white p-5 dark:bg-gray-900 sm:col-span-2">
                <div className="rounded-lg bg-green-100 p-3 text-green-700 dark:bg-green-950 dark:text-green-400">
                  <MapPin size={23} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold">{event.location}</p>
                </div>
              </div>

            </section>

            {/* Description */}
            <section className="rounded-xl border bg-white p-6 dark:bg-gray-900 md:p-8">

              <h2 className="mb-4 text-2xl font-bold">
                About This Event
              </h2>

              <p className="whitespace-pre-line leading-8 text-gray-600 dark:text-gray-300">
                {event.description}
              </p>

            </section>

            {/* Organizer */}
            <section className="rounded-xl border bg-white p-6 dark:bg-gray-900">

  <h2 className="mb-5 text-xl font-bold">
    Event Organizer
  </h2>

  <div className="flex items-center gap-4">

    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
      <UserRound size={24} />
    </div>

    <div>
      <p className="font-semibold">
        {event.createdBy}
      </p>

      <p className="text-sm text-gray-500">
        Event Host
      </p>
    </div>

    <Badge className="ml-auto bg-green-100 text-green-700 hover:bg-green-100">
      Organizer
    </Badge>

  </div>

</section>

          </div>

          {/* Right Sidebar */}
          <aside>

            <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm dark:bg-gray-900">

              <Badge variant="outline" className="mb-4 border-green-500 text-green-600">
                Community Event
              </Badge>

              <h2 className="text-2xl font-bold">
                Join This Event
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Be part of something meaningful. Connect with people,
                share ideas, and make a difference in your community.
              </p>

              <div className="my-6 border-t" />

              <JoinEventButton eventId={event._id} />

              <p className="mt-4 text-center text-xs text-gray-500">
                Login is required to join this event.
              </p>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}
