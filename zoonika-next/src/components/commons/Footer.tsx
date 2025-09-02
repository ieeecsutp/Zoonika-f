"use client";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyan-700 text-white px-6 py-7">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-7 text-center md:text-left">
        {/* Logo */}
        <div className="order-1 md:order-1 w-full md:w-1/3">
          <h2 className="font-[var(--font-inter)] text-3xl font-bold">
            Zoo<strong className="text-sky-200">nika</strong>
          </h2>
        </div>
        {/* Redes Sociales */}
        <div className="order-2 md:order-3 flex justify-center md:justify-end items-center gap-4 w-full md:w-1/3">
          <a href="#" aria-label="Facebook" className="hover:text-sky-200 transition">
            <i className="fa-brands fa-facebook text-[1.3rem]"></i>
          </a>
          <a href="#" aria-label="WhatsApp" className="hover:text-sky-200 transition">
            <i className="fa-brands fa-whatsapp text-[1.3rem]"></i>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-sky-200 transition">
            <i className="fa-brands fa-instagram text-[1.3rem]"></i>
          </a>
        </div>
        {/* Créditos/Autor */}
        <div className="order-3 md:order-2 w-full md:w-1/3 flex items-center justify-center md:justify-start">
          <p className="font-[var(--font-inter)] text-base text-gray-50">
            © <span id="year">{new Date().getFullYear()}</span>{" "}
            <strong>Zoonika</strong> Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
