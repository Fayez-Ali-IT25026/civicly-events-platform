"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays, MapPin, ImagePlus } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import gettokenfromclient from "@/lib/gettokenfromclient";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Fundraising",
  "Awareness",
  "Community Service",
  "Other",
];

// Today's date in Dhaka (yyyy-mm-dd). Only called in effects and handlers.
const getTodayInDhaka = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(
    new Date()
  );

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    image: "",
    location: "",
    eventDate: "",
  });

  // The date input's "min" is set after mount, so no past date can be picked
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dateRef.current) {
      dateRef.current.min = getTodayInDhaka();
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "image") {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending) return;

    if (!session?.user?.email) {
      toast.error("Please login before creating an event.");
      router.push("/login");
      return;
    }

    if (formData.eventDate <= getTodayInDhaka()) {
      toast.error("Please select a future date.");
      return;
    }

    try {
      setLoading(true);

      const token = await gettokenfromclient();

      if (!token) {
        throw new Error("Please login again.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...formData,
            // createdBy: session.user.email,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event.");
      }

      toast.success("Event created successfully!");

      router.push("/events");
      router.refresh();
    } catch (error) {
      console.error("Create event error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">
          Please login to create an event
        </h2>

        <Link
  href="/login"
  className="rounded-md bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
>
  Login
</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 dark:text-gray-300"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>

        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8">

          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Create an Event
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Organize a community event and bring people together.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Event Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
                className="w-full rounded-lg border bg-transparent px-4 py-3 outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event..."
                rows={5}
                required
                className="w-full resize-none rounded-lg border bg-transparent px-4 py-3 outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Event Type
              </label>

             <select
  name="eventType"
  value={formData.eventType}
  onChange={handleChange}
  required
  className="w-full rounded-lg border bg-white px-4 py-3 text-gray-900 outline-none focus:border-green-600 dark:bg-gray-900 dark:text-white"
>
  <option value="" className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
    Select event type
  </option>

  {eventTypes.map((type) => (
    <option
      key={type}
      value={type}
      className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
    >
      {type}
    </option>
  ))}
</select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Event Image URL
              </label>

              <div className="relative">
                <ImagePlus
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  required
                  className="w-full rounded-lg border bg-transparent py-3 pl-10 pr-4 outline-none focus:border-green-600"
                />
              </div>

              {imagePreview && (
                <div className="relative mt-4 h-48 w-full overflow-hidden rounded-lg border">
                  <Image
                    src={imagePreview}
                    alt="Event preview"
                    fill
                    unoptimized
                    className="object-cover"
                    onError={() => setImagePreview("")}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Location
              </label>

              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter event location"
                  required
                  className="w-full rounded-lg border bg-transparent py-3 pl-10 pr-4 outline-none focus:border-green-600"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Event Date
              </label>

              <div className="relative">
                <CalendarDays
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />

                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  ref={dateRef}
                  required
                  className="w-full rounded-lg border bg-transparent py-3 pl-10 pr-4 outline-none focus:border-green-600"
                />
              </div>
            </div>

            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/30">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                Event Organizer
              </p>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {session.user.name || "Community Organizer"}
              </p>

              <p className="text-xs text-gray-500">
                {session.user.email}
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 py-6 text-white hover:bg-green-700"
            >
              {loading ? "Creating Event..." : "Create Event"}
            </Button>

          </form>
        </div>
      </div>
    </main>
  );
}