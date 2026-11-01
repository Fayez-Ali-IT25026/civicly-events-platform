"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

import type { Event } from "@/types/event";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import gettokenfromclient from "@/lib/gettokenfromclient";

const ManageEventsPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const email = session?.user?.email;

  const [today, setToday] = useState("");

  // Load only the events created by the logged-in user
  useEffect(() => {
    if (!email) return;

    const loadEvents = async () => {

 const token = await gettokenfromclient();

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events?createdBy=${encodeURIComponent(email)}`,
          { cache: "no-store" ,
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to load your events.");

        const data: Event[] = await res.json();
        data.sort((a, b) => a.eventDate.localeCompare(b.eventDate));
        setEvents(data);

        // Today's date (Dhaka), used for the "Past" badge
        setToday(
          new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(
            new Date()
          )
        );
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [email]);

  const handleDelete = async () => {
  if (!deleteId) return;

  try {
    setDeleting(true);

    const token = await gettokenfromclient();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${deleteId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const result = await res.json();
      throw new Error(result.message || "Failed to delete event.");
    }

    setEvents((prev) =>
      prev.filter((event) => event._id !== deleteId)
    );

    toast.success("Event deleted successfully!");
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong."
    );
  } finally {
    setDeleting(false);
    setDeleteId(null);
  }
};

  const formatDate = (date: string) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  // Not logged in
  if (!isPending && !session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">
          Please login to manage your events
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
      <div className="mx-auto max-w-5xl px-5">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">Manage Events</h1>
            <p className="mt-2 text-muted-foreground">
              Update or delete the events you created.
            </p>
          </div>

          <Link
            href="/create-event"
            className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <Plus size={17} />
            Create Event
          </Link>
        </div>

        {/* Loading skeletons */}
        {(isPending || loading) && (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-32 w-full rounded-2xl" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isPending && !loading && events.length === 0 && (
          <div className="rounded-2xl border border-dashed bg-white py-20 text-center dark:bg-gray-900">
            <h2 className="text-xl font-bold">No Events Yet</h2>
            <p className="mt-2 text-muted-foreground">
              You have not created any events. Start one today!
            </p>
          </div>
        )}

        {/* Event list */}
        {!loading && events.length > 0 && (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center"
              >
                {/* Thumbnail */}
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-24 sm:w-36">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 144px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="line-clamp-1 text-lg font-bold">
                      {event.title}
                    </h2>
                    <span className="rounded-full bg-green-50 px-3 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
                      {event.eventType}
                    </span>
                    {today && event.eventDate < today && (
                      <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        Past
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={15} />
                      {formatDate(event.eventDate)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} />
                      {event.location}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:flex-col">
                  <Link
                    href={`/events/${event._id}/edit`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-green-600 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
                  >
                    <Pencil size={15} />
                    Update
                  </Link>

                  <button
                    onClick={() => setDeleteId(event._id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this event?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the event. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default ManageEventsPage;