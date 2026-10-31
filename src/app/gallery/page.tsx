import Image from "next/image";

type Photo = {
  id: number;
  src: string;
  title: string;
  category: string;
};

const photos: Photo[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    title: "Volunteers planting trees",
    category: "Plantation",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
    title: "Donation drive",
    category: "Donation",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    title: "Community food distribution",
    category: "Community Service",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800",
    title: "Beach cleanup drive",
    category: "Cleanup",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
    title: "Volunteers working together",
    category: "Community Service",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    title: "Growing a greener neighbourhood",
    category: "Plantation",
  },
];

const GalleryPage = () => {
  return (
    <main>
      {/* Header */}
      <section className="bg-[#04241b] px-6 py-20 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8be37a]">
          Our Gallery
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Moments That Matter
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 md:text-base">
          Real people. Real stories. Real change from community events across
          our cities.
        </p>
      </section>

      {/* Photo grid */}
      <section className="bg-[#f7f5ee] px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative h-72 overflow-hidden rounded-2xl"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#04241b]/90 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="rounded-full bg-[#8be37a] px-3 py-1 text-xs font-semibold text-[#062b20]">
                  {photo.category}
                </span>
                <h3 className="mt-2 font-semibold">{photo.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;