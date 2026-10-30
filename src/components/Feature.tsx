
import { Sprout, Users, Heart, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Sprout,
    title: "Discover",
    text: "Find local events that match your interests and values.",
  },
  {
    icon: Users,
    title: "Connect",
    text: "Meet like-minded people in your community.",
  },
  {
    icon: Heart,
    title: "Participate",
    text: "Join events and be part of real change.",
  },
  {
    icon: Globe,
    title: "Make an Impact",
    text: "Together we can build a better tomorrow.",
  },
];

const Features = () => {
  return (
    <section className="bg-[#04241b] px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <Card
            key={title}
            className="group border-white/10 bg-white/5 text-white backdrop-blur transition hover:-translate-y-1 hover:border-[#8be37a]/40 hover:bg-white/10"
          >
            <CardContent className="space-y-3 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8be37a]/10 ring-1 ring-[#8be37a]/30 transition group-hover:bg-[#8be37a]/20">
                <Icon size={20} className="text-[#8be37a]" />
              </span>
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;