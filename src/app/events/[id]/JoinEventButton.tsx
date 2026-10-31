"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function JoinEventButton({
  eventId,
}: {
  eventId: string;
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!session?.user) {
      toast.error("Please login to join this event");
      router.push(
        `/login?callbackURL=${encodeURIComponent(`/events/${eventId}`)}`
      );
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: session.user.id,
            userEmail: session.user.email,
            userName: session.user.name,
          }),
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