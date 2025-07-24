"use client";
import React from "react";

const testimonials = [
  {
    name: "Sofía Ruiz",
    text: "Muy buen servicio. Me ayudaron con la vacunación completa de mi cachorra y me asesoraron sobre su alimentación. Todos muy atentos, precios promocionales.",
    rating: 5
  },
  {
    name: "Roberto Quispe",
    text: "Tenía que inyectar a mis gatos azul y siamés. Soy recibido esa atención de primera. Los veterinarios son muy profesionales, es recomendable y lo hacen después de cada tratamiento si es de gran ayuda.",
    rating: 5
  },
  {
    name: "Maricielo López",
    text: "Excelente atención al trato con mi mascota. El equipo fue muy profesional, me explicaron todo con detalle y mi perrito se sintió cómodo desde el primer momento. Recomendado al 100%!",
    rating: 5
  },
  {
    name: "Nathi Córdova",
    text: "Mi mascota estaba muy mal y gracias a ellos ahora está perfectamente bien, me explican todo lo que necesito saber. Estoy muy agradecida por su compromiso y dedicación.",
    rating: 5
  },
  {
    name: "Pedro Páez",
    text: "Las instalaciones están limpias y el personal es amable. Son profesionales y me dan mucha confianza en el poco los tiempos de espera, pero en general, mi lugar de confianza.",
    rating: 5
  },
  {
    name: "Flavia Guerrero",
    text: "Desde que conocí esta veterinaria no he llevado a mi perrita a otro lugar. Son muy profesionales, el trato y la atención están ponderdados de excelencia. ¡Gracias por tanto!",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonio" className="testimonials-section">
      <div className="container">
        <h2 className="testimonials-title">Opiniones de nuestros clientes</h2>
        <p className="testimonials-subtitle">La lealtad y confianza de nuestros clientes son la mayor recompensa a nuestro esfuerzo</p>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, idx) => (
            <div className="testimonial-card" key={idx}>
              <div className="stars">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span className="star" key={i}>★</span>
                ))}
              </div>
              <div className="testimonial-name">{testimonial.name}</div>
              <div className="testimonial-text">{testimonial.text}</div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .testimonials-section {
          padding: 4rem 0;
          background: white;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .testimonials-title {
          font-size: 2.5rem;
          text-align: center;
          color: #17a2b8;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .testimonials-subtitle {
          text-align: center;
          color: #6c757d;
          font-size: 1.1rem;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        .testimonial-card {
          background: #f0f9ff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 30px rgba(23, 162, 184, 0.12);
        }
        .stars {
          color: #ffc107;
          margin-bottom: 0.5rem;
        }
        .star {
          font-size: 1.2rem;
        }
        .testimonial-name {
          font-weight: 600;
          color: #17a2b8;
          margin-bottom: 0.5rem;
        }
        .testimonial-text {
          color: #555;
        }
        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          .testimonials-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
