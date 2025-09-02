
"use client";
// @ts-nocheck

import HeaderNav from "../components/commons/HeaderNav";
import Hero from "../components/Hero/heroMain";
import AcercaDeNosotros from "../section/AcercaDeNosotros";
import Services from "../section/Services";
import Testimonials from "../section/Testimonials";
import Galeria from "../section/Galeria";
import Contacto from "../section/Contacto";
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

