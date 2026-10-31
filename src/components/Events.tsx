import Image from "next/image";
import { connection } from "next/server";
import Link from "next/link";
import { MapPin, CalendarDays, ArrowRight } from "lucide-react";

import type { Event } from "@/types/event";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const arrowClass =
  "static! size-10 rounded-full border-zinc-300 bg-white text-zinc-500 hover:text-zinc-900 dark:border-white/20 dark:bg-transparent dark:text-gray-300 dark:hover:text-white";

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
      <Carousel opts={{ align: "start" }} className="mx-auto max-w-7xl">
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

          <div className="flex items-center gap-3">
            <CarouselPrevious className={arrowClass} />
            <CarouselNext className={arrowClass} />
          </div>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 dark:border-white/20 dark:bg-white/5 text-center">
            <h3 className="text-lg font-bold text-[#062b20] dark:text-white">
              No Upcoming Events Yet
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Be the first to create one for your community.
            </p>
          </div>
        ) : (
          <CarouselContent>
            {events.map((event) => (
              <CarouselItem
                key={event._id}
                className="sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full overflow-hidden rounded-2xl border-0 shadow-md dark:bg-[#04241b]">
                  <div className="relative h-44 w-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <Badge className="absolute bottom-3 left-3 bg-green-600 text-white">
                      {event.eventType}
                    </Badge>
                  </div>

                  <CardContent className="flex flex-1 flex-col gap-3 p-4">
                    <h3 className="line-clamp-1 font-semibold text-[#062b20] dark:text-white">
                      {event.title}
                    </h3>

                    <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <CalendarDays size={12} /> {event.eventDate}
                    </p>

                    <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <MapPin size={12} />
                      <span className="line-clamp-1">{event.location}</span>
                    </p>

                    <Link
                      href={`/events/${event._id}`}
                      className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-[#062b20] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0a3d2e] dark:bg-green-600 dark:hover:bg-green-700"
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        )}
      </Carousel>
    </section>
  );
};

export default Events;