import { MapPin, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const events = [
  {
    id: 1,
    title: "Green Dhaka Initiative",
    category: "Plantation",
    color: "bg-green-600",
    date: "Nov 15, 2026",
    location: "Dhanmondi, Dhaka",
    joined: 12,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600",
  },
  {
    id: 2,
    title: "Winter Warmth Drive",
    category: "Donation",
    color: "bg-orange-500",
    date: "Nov 20, 2026",
    location: "Mirpur, Dhaka",
    joined: 24,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600",
  },
  {
    id: 3,
    title: "River Cleanup Drive",
    category: "Cleanup",
    color: "bg-blue-500",
    date: "Nov 25, 2026",
    location: "Sadar, Dhaka",
    joined: 18,
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600",
  },
];

const Events = () => {
  return (
    <section className="bg-[#f7f5ee] px-6 py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[260px_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-green-700">
            Upcoming Events
          </p>
          <h2 className="mt-3 text-4xl font-bold leading-tight text-[#062b20]">
            Find Your Next Good Deed.
          </h2>
          <p className="mt-4 text-sm text-gray-600">
            Join local events, support your community, and be the change.
          </p>
          <Button className="mt-6 rounded-full bg-[#062b20] px-6 hover:bg-[#0a3d2e]">
            View All Events
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden rounded-2xl border-0 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-40 w-full object-cover"
                />
                <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur">
                  <Heart size={14} />
                </button>
                <Badge className={`absolute bottom-3 left-3 ${event.color} text-white`}>
                  {event.category}
                </Badge>
                <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white">
                  {event.date}
                </span>
              </div>

              <CardContent className="space-y-3 p-4">
                <h3 className="font-semibold text-[#062b20]">{event.title}</h3>

                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin size={12} /> {event.location}
                </p>

                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {["A", "B", "C"].map((letter) => (
                      <Avatar key={letter} className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="bg-green-100 text-[10px]">
                          {letter}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">+{event.joined} are joining</span>
                </div>

                <Button className="w-full rounded-lg bg-[#062b20] hover:bg-[#0a3d2e]">
                  View Details <ArrowRight size={14} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;