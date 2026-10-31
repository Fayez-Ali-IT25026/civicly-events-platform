import { ArrowRight } from "lucide-react";
import Image from "next/image";

type Photo = {
  id: number;
  src: string;
  alt: string;
};

const photos: Photo[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500",
    alt: "Volunteers planting trees",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500",
    alt: "Volunteers at a donation event",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500",
    alt: "Community food distribution",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=500",
    alt: "Beach cleanup drive",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500",
    alt: "Volunteers working together",
  },
];

const Gallery = () => {
  return (
    <section className="bg-[#f7f5ee] px-6 pt-16 dark:bg-[#0a1d17]">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-green-700">
              Our Gallery
            </p>
            <h2 className="mt-2 text-4xl font-bold text-[#062b20] dark:text-white">
              Moments That Matter
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Real people. Real stories. Real change.
            </p>
          </div>
          <a
            href="#"
            className="hidden items-center gap-1 text-sm font-medium text-[#062b20] hover:underline dark:text-white sm:flex"
          >
            View More Photos <ArrowRight size={14} />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
  {photos.map((photo) => (
    <div
      key={photo.id}
      className="group overflow-hidden rounded-xl"
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={500}
        height={300}
        className="h-40 w-full object-cover transition duration-300 group-hover:scale-110"
      />
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default Gallery;