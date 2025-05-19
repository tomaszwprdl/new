import { useEffect, useState } from "react";

const destinations = [
  { src: "/images/places/Castillo-de-Santa-Barbara.jpeg", name: "Castillo de Santa Barbara" },
  { src: "/images/places/gora.jpeg", name: "Góra" },
  { src: "/images/places/Santa_Pola_Parqu.jpeg", name: "Santa Pola Park" },
  { src: "/images/places/Santa_Pola.jpeg", name: "Santa Pola" },
  { src: "/images/places/murcia-mountains.jpeg", name: "Murcia Mountains" },
  { src: "/images/places/barbara alicante.jpeg", name: "Barbara Alicante" },
  { src: "/images/places/playas-torrevieja-la-mata.jpeg", name: "Playas Torrevieja La Mata" },
  { src: "/images/places/deptak.jpeg", name: "Deptak" },
  { src: "/images/places/lake pink.jpeg", name: "Lake Pink" },
  { src: "/images/places/Tabarca.jpeg", name: "Tabarca" },
  { src: "/images/places/torrevieja flamingos.jpeg", name: "Torrevieja Flamingos" },
  { src: "/images/places/flamingos.jpeg", name: "Flamingos" },
  { src: "/images/places/alicante castle.jpeg", name: "Alicante Castle" },
  { src: "/images/places/torrevieja.jpeg", name: "Torrevieja" },
  { src: "/images/places/VALENCIA.jpeg", name: "Valencia" },
  { src: "/images/places/castillo-de-monteagudo.jpeg", name: "Castillo de Monteagudo" },
  { src: "/images/places/murcia.jpeg", name: "Murcia" },
  { src: "/images/places/pink lake .jpeg", name: "Pink Lake" },
  { src: "/images/places/alicante.jpeg", name: "Alicante" },
  { src: "/images/places/mountains.jpeg", name: "Mountains" },
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
      {destinations.map((dest, i) => (
        <img
          key={dest.src}
          src={dest.src}
          alt={dest.name}
          className={`absolute w-full h-full object-cover object-center transition-opacity duration-1000 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ transitionProperty: "opacity" }}
        />
      ))}
      {/* Optional overlay with place name */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 text-white text-3xl font-bold tracking-wide">
        {destinations[index].name}
      </div>
    </section>
  );
} 