"use client";
import React from "react";

// Componente funcional sin props
const Hero: React.FC = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-8 items-center">
        {/* Texto */}
        <div className="space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
          <h1 className="mb-[0.5rem] text-4xl font-semibold text-gray-900">
            Cuidamos con amor cada{" "}
            <strong className="text-cyan-500 font-bold">PATITA</strong>
          </h1>
          <p className="mb-[0.5rem] text-gray-600">
            Cuidado natural, profesional y cercano siempre
          </p>
          <button className="border border-cyan-700 bg-white text-cyan-700 px-6 py-2 rounded-md hover:border-white hover:bg-cyan-50 transition">
            Reserva Ahora
          </button>
        </div>
        {/* Imagen con círculo detrás */}
        <div className="relative flex justify-center items-center">
          {/* Círculo detrás de la imagen */}
          <div className="absolute w-64 h-64 bg-blue-100 rounded-full -z-10 sm:w-72 sm:h-72"></div>
          {/* Imagen principal */}
          <img
            src="/img/hero/hero_img.webp"
            alt="Veterinaria con perro"
            className="w-64 sm:w-80 object-contain relative z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
