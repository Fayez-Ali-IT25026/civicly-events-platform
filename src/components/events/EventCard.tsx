
import Image from "next/image";
import Link from "next/link";

import type { Event } from "@/types/event";

import {
  CalendarDays,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function EventCard({ event }: { event: Event }) {
  const formattedDate = new Date(
    `${event.eventDate}T00:00:00`
  ).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">

      {/* Event Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">

        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Event Category */}
        <Badge className="absolute left-4 top-4 border-0 bg-white px-3 py-1 text-xs font-semibold text-green-700 shadow-sm hover:bg-white">
          {event.eventType}
        </Badge>

      </div>

      {/* Event Information */}
      <CardContent className="space-y-4 p-5">

        {/* Event Title */}
        <h2 className="line-clamp-2 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-green-600 dark:text-white">
          {event.title}
        </h2>

        {/* Description */}
        <p className="line-clamp-2 min-h-12 text-sm leading-6 text-gray-500 dark:text-gray-400">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3 border-t border-gray-100 pt-4 dark:border-gray-800">

          {/* Date */}
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="rounded-lg bg-green-50 p-2 text-green-600 dark:bg-green-950">
              <CalendarDays size={17} />
            </div>

            <span>{formattedDate}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="rounded-lg bg-green-50 p-2 text-green-600 dark:bg-green-950">
              <MapPin size={17} />
            </div>

            <span className="line-clamp-1">
              {event.location}
            </span>
          </div>

        </div>

      </CardContent>

      {/* View Event Button */}
      <CardFooter className="p-5 pt-0">

        <Link
          href={`/events/${event._id}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-green-700"
        >
          View Event
          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>

      </CardFooter>

    </Card>
  );
}
