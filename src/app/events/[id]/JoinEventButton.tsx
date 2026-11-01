"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import gettokenfromclient from "@/lib/gettokenfromclient";

const JoinEventButton = ({ eventId }: { eventId: string }) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [checking, setChecking] = useState(true);

  const userId = session?.user?.id;

  // Check if this user already joined (works after a reload)
  useEffect(() => {
    if (isPending) return;

    if (!userId) return;

    let cancelled = false;

    const checkJoined = async () => {
      try {
        const token = await gettokenfromclient();
        if (!token) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/join`,
          {
            cache: "no-store",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) return;

        const data = await res.json();
        if (!cancelled) setJoined(Boolean(data.joined));
      } catch {
        // If the check fails, the button stays usable
        // and the server still blocks duplicate joins.
      } finally {
        if (!cancelled) setChecking(false);
      }
    };

    checkJoined();

    return () => {
      cancelled = true;
    };
  }, [eventId, userId, isPending]);

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

      const token = await gettokenfromclient();

      if (!token) {
        throw new Error("Please login again.");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/join`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        toast.error("Please login to join this event");
        router.push(
          `/login?callbackURL=${encodeURIComponent(`/events/${eventId}`)}`
        );
        return;
      }

      if (res.status === 409) {
        setJoined(true);
        toast.info("You have already joined this event.");
        return;
      }

      if (!res.ok) {
        toast.error(data.message || "Failed to join event");
        return;
      }

      setJoined(true);
      toast.success("Successfully joined the event!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  // Only treat as joined while a user is logged in
  if (joined && Boolean(userId)) {
    return (
      <Button
        disabled
        className="w-full bg-green-100 py-6 text-green-700 opacity-100 dark:bg-green-950 dark:text-green-400"
      >
        <CheckCircle2 className="mr-2 h-5 w-5" />
        Already Joined
      </Button>
    );
  }

  return (
    <Button
      onClick={handleJoin}
      disabled={loading || isPending || (Boolean(userId) && checking)}
      className="w-full bg-green-600 py-6 hover:bg-green-700"
    >
      <Users className="mr-2 h-5 w-5" />
      {loading ? "Joining..." : "Join Event"}
    </Button>
  );
};

export default JoinEventButton;
