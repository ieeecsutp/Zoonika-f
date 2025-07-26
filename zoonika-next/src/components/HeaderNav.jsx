"use client";
import React from "react";

export default function HeaderNav() {
  return (
    <header id="mainHeader" className="fixed top-0 left-0 w-full bg-transparent shadow-md px-4 py-3 transition-colors duration-300 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="font-inter text-3xl font-bold">
          Zoo<strong className="text-cyan-500">nika</strong>
        </div>
        {/* Menú de navegación - solo visible en md+ */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-cyan-500">Inicio</a>
          <a href="#" className="hover:text-cyan-500">Nosotros</a>
          <a href="#services" className="hover:text-cyan-500">Servicios</a>
          <a href="#testimonio" className="hover:text-cyan-500">Testimonio</a>
          <a href="#" className="hover:text-cyan-500">Contacto</a>
        </nav>
        {/* Iconos */}
        <div className="hidden md:flex space-x-4">
          <i className="fa-brands fa-facebook text-[1.3rem] hover:text-blue-500 transition-colors duration-200"></i>
          <i className="fa-brands fa-whatsapp text-[1.3rem] hover:text-green-500 transition-colors duration-200"></i>
          <i className="fa-brands fa-instagram text-[1.3rem] hover:text-pink-500 transition-colors duration-200"></i>
        </div>
        {/* Botón hamburguesa */}
        <button
          id="menuToggle"
          className="md:hidden text-2xl focus:outline-none"
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>
      {/* Menú desplegable móvil */}
      <div
        id="mobileMenu"
        className="hidden flex-col space-y-4 mt-4 px-4 md:hidden transition-all duration-300 ease-in-out"
      >
        <nav className="flex flex-col space-y-2">
          <a href="#" className="hover:text-cyan-500">Inicio</a>
          <a href="#" className="hover:text-cyan-500">Nosotros</a>
          <a href="#services" className="hover:text-cyan-500">Servicios</a>
          <a href="#testimonio" className="hover:text-cyan-500">Testimonio</a>
        </nav>
      </div>
      <script dangerouslySetInnerHTML={{__html:`
        document.addEventListener('DOMContentLoaded', function() {
          const toggle = document.getElementById('menuToggle');
          const menu = document.getElementById('mobileMenu');
          const header = document.getElementById('mainHeader');
          const handleScroll = () => {
            if(window.scrollY > 10) {
              header.classList.add('bg-white');
            } else {
              header.classList.remove('bg-white');
            }
          };
          toggle?.addEventListener('click', function() {
            menu.classList.toggle('hidden');
          });
          document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
              menu.classList.add('hidden');
            }
          });
          window.addEventListener('scroll', handleScroll);
        });
      `}} />
    </header>
  );
}
