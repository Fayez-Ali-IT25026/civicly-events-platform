"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  Leaf,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Fundraising",
  "Awareness",
  "Community Service",
  "Other",
];

export default function CreateEventPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    image: "",
    location: "",
    eventDate: "",
  });

  // Get today's date in Bangladesh
  const getToday = () => {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    return parts;
  };

  // Protect the page
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.eventDate <= getToday()) {
      toast.error("Please select a future event date.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event");
      }

      toast.success("Your event has been created successfully!");

      router.push("/events");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <Link
          href="/events"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-green-600"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        <div className="mb-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <Leaf size={25} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Create an Event
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Bring your community together and make a positive impact.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8"
        >
          {/* Event Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Event Title *
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Community Tree Plantation"
              required
              maxLength={120}
              className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 dark:border-gray-700"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Event Description *
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event, its purpose and activities..."
              rows={5}
              required
              maxLength={3000}
              className="w-full resize-none rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 dark:border-gray-700"
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Event Type *
            </label>

            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-600 dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="" disabled>
                Select event type
              </option>

              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
         <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <ImageIcon size={17} />
              Thumbnail Image URL *
            </label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 dark:border-gray-700"
            />

            {formData.image && (
              <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                <Image
                  src={formData.image}
                  alt="Event thumbnail preview"
                  width={800}
      height={400}
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </div> 
         
          {/* Location */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <MapPin size={17} />
              Event Location *
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Tangail, Bangladesh"
              required
              maxLength={200}
              className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 dark:border-gray-700"
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <CalendarDays size={17} />
              Event Date *
            </label>

            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              min={getToday()}
              required
              className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 dark:border-gray-700"
            />

            <p className="mt-2 text-xs text-gray-500">
              Select a date after today.
            </p>
          </div>

          {/* Creator */}
          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              EVENT ORGANIZER
            </p>

            <p className="mt-1 font-medium text-green-800 dark:text-green-400">
              {session.user.email}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3.5 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={19} className="animate-spin" />
                Creating Event...
              </>
            ) : (
              <>
                <Leaf size={19} />
                Create Event
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}