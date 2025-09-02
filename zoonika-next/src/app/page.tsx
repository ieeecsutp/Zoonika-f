
"use client";
// @ts-nocheck

import HeaderNav from "../components/commons/HeaderNav";
import Hero from "../components/Hero/heroMain";
import AcercaDeNosotros from "../components/AcercaDeNosotros";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Galeria from "../components/Galeria";
import Contacto from "../components/Contacto";
import Footer from "../components/commons/Footer";
import React from "react";

export default function HomePage() {
  return (
    <>
      <HeaderNav />
      <Hero />
      <main>
        <AcercaDeNosotros />
        <Services />
        <Testimonials />
        <Galeria />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}

