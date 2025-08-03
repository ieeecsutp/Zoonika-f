"use client";
import React, { useState, useEffect } from "react";

export default function HeaderNav({ isLanding = true }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isLanding) {
      const handleScroll = () => {
        const header = document.getElementById('mainHeader');
        if (header) {
          if (window.scrollY > 10) {
            header.classList.add('bg-white');
          } else {
            header.classList.remove('bg-white');
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isLanding]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header
      id="mainHeader"
      className={`w-full shadow-md px-4 py-2 transition-colors duration-300 z-50 ${isLanding ? "bg-transparent fixed top-0 left-0" : "bg-white border-b border-gray-200"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="font-inter text-2xl md:text-3xl font-bold">
          Zoo<strong className="text-cyan-500">nika</strong>
        </div>
        {/* Menú de navegación - solo visible en md+ */}
        <nav className="hidden md:flex space-x-6">
          {isLanding ? (
            <>
              <a href="#" className="hover:text-cyan-500">Inicio</a>
              <a href="#acerca" className="hover:text-cyan-500">Nosotros</a>
              <a href="#services" className="hover:text-cyan-500">Servicios</a>
              <a href="#galeria" className="hover:text-cyan-500">Galería</a>
              <a href="#testimonio" className="hover:text-cyan-500">Testimonio</a>
              <a href="#contacto" className="hover:text-cyan-500">Contacto</a>
            </>
          ) : (
            <a href="/" className="hover:text-cyan-500">Volver al inicio</a>
          )}
        </nav>
        {/* Iconos solo en landing */}
        {isLanding && (
          <div className="hidden md:flex space-x-4">
            <i className="fa-brands fa-facebook text-[1.3rem] hover:text-blue-500 transition-colors duration-200"></i>
            <i className="fa-brands fa-whatsapp text-[1.3rem] hover:text-green-500 transition-colors duration-200"></i>
            <i className="fa-brands fa-instagram text-[1.3rem] hover:text-pink-500 transition-colors duration-200"></i>
          </div>
        )}
        {/* Botón hamburguesa solo en landing */}
        {isLanding && (
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl focus:outline-none"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        )}
      </div>
      {/* Menú desplegable móvil solo en landing */}
      {isLanding && (
        <div
          className={`flex-col space-y-4 mt-4 px-4 md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'flex' : 'hidden'
          }`}
        >
          <nav className="flex flex-col space-y-2">
            <a href="#" className="hover:text-cyan-500">Inicio</a>
            <a href="#acerca" className="hover:text-cyan-500">Nosotros</a>
            <a href="#services" className="hover:text-cyan-500">Servicios</a>
            <a href="#galeria" className="hover:text-cyan-500">Galería</a>
            <a href="#testimonio" className="hover:text-cyan-500">Testimonio</a>
            <a href="#contacto" className="hover:text-cyan-500">Contacto</a>
          </nav>
        </div>
      )}
    </header>
  );
}
