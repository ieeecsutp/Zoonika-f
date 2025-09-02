"use client";
import React from "react";

// Componente funcional sin props
const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] bg-hero-img bg-cover bg-center">
      {/* Capa oscura superpuesta */}
      <div className="absolute inset-0 bg-cyan-900 bg-opacity-50"></div>

      {/* Texto centrado */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <h1 className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-widest text-center uppercase">
          DETALLES
        </h1>
      </div>
    </section>
  );
};

export default Hero;
