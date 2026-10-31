"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function EventOwnerActions({
  eventId,
  createdBy,
}: {
  eventId: string;
  createdBy?: string;
}) {
  const { data: session, isPending } = authClient.useSession();

  const isOwner =
    !!createdBy &&
    !!session?.user?.email &&
    session.user.email.toLowerCase() === createdBy.toLowerCase();

  if (isPending || !isOwner) return null;

  return (
    <Link
      href={`/events/${eventId}/edit`}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-green-600 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
    >
      <Pencil size={16} />
      Edit Event
    </Link>
  );
}