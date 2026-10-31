"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function JoinEventButton({
  eventId,
}: {
  eventId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/join`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        toast.error("Please login to join this event");

        router.push(
          `/login?callbackURL=${encodeURIComponent(
            `/events/${eventId}`
          )}`
        );

        return;
      }

      if (!res.ok) {
        toast.error(data.message || "Failed to join event");
        return;
      }

      toast.success("Successfully joined the event!");
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleJoin}
      disabled={loading}
      className="w-full bg-green-600 py-6 hover:bg-green-700"
    >
      <Users className="mr-2 h-5 w-5" />
      {loading ? "Joining..." : "Join Event"}
    </Button>
  );
}