import { useEffect, useState } from "react";

const destinations = [
  { src: "/images/places/Castillo-de-Santa-Barbara.webp", name: "Castillo de Santa Barbara" },
  { src: "/images/places/gora.webp", name: "Góra" },
  { src: "/images/places/Santa_Pola_Parqu.webp", name: "Santa Pola Park" },
  { src: "/images/places/Santa_Pola.webp", name: "Santa Pola" },
  { src: "/images/places/murcia-mountains.webp", name: "Murcia Mountains" },
  { src: "/images/places/barbara alicante.webp", name: "Barbara Alicante" },
  { src: "/images/places/playas-torrevieja-la-mata.webp", name: "Playas Torrevieja La Mata" },
  { src: "/images/places/deptak.webp", name: "Deptak" },
  { src: "/images/places/lake pink.webp", name: "Lake Pink" },
  { src: "/images/places/Tabarca.webp", name: "Tabarca" },
  { src: "/images/places/torrevieja flamingos.webp", name: "Torrevieja Flamingos" },
  { src: "/images/places/flamingos.webp", name: "Flamingos" },
  { src: "/images/places/alicante castle.webp", name: "Alicante Castle" },
  { src: "/images/places/torrevieja.webp", name: "Torrevieja" },
  { src: "/images/places/VALENCIA.webp", name: "Valencia" },
  { src: "/images/places/castillo-de-monteagudo.webp", name: "Castillo de Monteagudo" },
  { src: "/images/places/murcia.webp", name: "Murcia" },
  { src: "/images/places/pink lake.webp", name: "Pink Lake" },
  { src: "/images/places/alicante.webp", name: "Alicante" },
  { src: "/images/places/mountains.webp", name: "Mountains" },
];

export default function DestinationsGallery() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % destinations.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full h-[600px] md:h-[750px] relative overflow-hidden my-16 rounded-2xl shadow-2xl">
      <img
        key={destinations[index].src}
        src={destinations[index].src}
        alt={destinations[index].name}
        className="absolute w-full h-full object-cover object-center transition-opacity duration-1000 opacity-100 z-10"
        style={{ transitionProperty: "opacity" }}
        loading="eager"
      />
      {/* Optional overlay with place name */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 text-white text-3xl font-bold tracking-wide">
        {destinations[index].name}
      </div>
    </section>
  );
} 