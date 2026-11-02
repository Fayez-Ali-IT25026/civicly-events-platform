import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Civicly",
};

const contacts = [
  {
    icon: Mail,
    title: "Email Us",
    text: "support@civicly.app",
    note: "We usually reply within two working days.",
  },
  {
    icon: MapPin,
    title: "Our Location",
    text: "Dhaka, Bangladesh",
    note: "Serving communities across the country.",
  },
  {
    icon: Clock,
    title: "Support Hours",
    text: "Sunday to Thursday, 10 AM to 6 PM",
    note: "Bangladesh Standard Time.",
  },
];

const ContactPage = () => {
  return (
    <main>
      {/* Header */}
      <section className="bg-[#04241b] px-6 py-20 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8be37a]">
          Contact
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          We&apos;d Love to Hear From You
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 md:text-base">
          Questions about an event, your account, or how Civicly works? Reach
          out and our team will help.
        </p>
      </section>

      {/* Contact cards */}
      <section className="bg-[#f7f5ee] px-6 py-16 dark:bg-[#0a1d17]">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {contacts.map(({ icon: Icon, title, text, note }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                <Icon size={22} />
              </span>
              <h2 className="mt-4 font-bold text-[#062b20] dark:text-white">
                {title}
              </h2>
              <p className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                {text}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Looking to get involved right away?
          </p>
          <Link
            href="/events"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Browse Events <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;