// import Features from "@/components/Feature";
// import Hero from "@/components/Hero";
// import Events from "@/components/Events";
// import HowItWorks from "@/components/HowItWorks";
// import Gallery from "@/components/Gallery";
// import Newsletter from "@/components/Newsletter";

// export default function Home() {
//   return (
//     <>
//     <Hero/>
//     <Features/>

//     <Events/>
//     <HowItWorks/>
//     <Gallery/>
//     <Newsletter/>
//     </>
//   );
// }
import { Suspense } from "react";

import Features from "@/components/Feature";
import Hero from "@/components/Hero";
import Events from "@/components/Events";
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import Newsletter from "@/components/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />

      <Suspense fallback={<div className="h-96 bg-[#f7f5ee]" />}>
        <Events />
      </Suspense>

      <HowItWorks />
      <Gallery />
      <Newsletter />
    </>
  );
};

export default Home;