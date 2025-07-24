import HeaderNav from "../components/HeaderNav.jsx";
import Hero from "../components/hero.jsx";
import AcercaDeNosotros from "../components/AcercaDeNosotros.jsx";
import Services from "../components/Services.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Galeria from "../components/Galeria.jsx";
import Contacto from "../components/Contacto.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
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

