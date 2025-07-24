"use client";
import React from "react";

const services = [
  {
    icon: "🩺",
    title: "Consultas Generales",
    description: "Exámenes de rutina, diagnósticos y seguimiento de la salud de tu mascota",
    features: ["Revisiones completas", "Diagnósticos de enfermedades", "Control de peso y nutrición"]
  },
  {
    icon: "🛡️",
    title: "Vacunación",
    description: "Programas de vacunación personalizados para proteger a tu mascota",
    features: ["Vacunas básicas y opcionales", "Calendarios personalizados", "Certificados oficiales"]
  },
  {
    icon: "🔬",
    title: "Cirugías",
    description: "Procedimientos quirúrgicos con tecnología avanzada y cuidado especializado",
    features: ["Esterilizaciones", "Cirugías de emergencia", "Procedimientos especializados"]
  },
  {
    icon: "💙",
    title: "Cuidados Intensivos",
    description: "Atención especializada para mascotas en condiciones críticas",
    features: ["Hospitalización", "Monitoreo 24/7", "Tratamientos intensivos"]
  },
  {
    icon: "🚨",
    title: "Emergencias",
    description: "Servicio de urgencia disponible las 24 horas del día",
    features: ["Atención inmediata", "Disponible 24/7", "Equipo especializado"]
  },
  {
    icon: "✂️",
    title: "Peluquería",
    description: "Servicios de estética y cuidado personal para tu mascota",
    features: ["Baño y secado", "Corte de pelo", "Corte de uñas"]
  }
];

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <h2 className="services-title">Nuestros Servicios</h2>
        <p className="services-subtitle">Ofrecemos una amplia gama de servicios veterinarios para mantener a tu mascota saludable y feliz</p>
        <div className="services-grid">
          {services.map((service, idx) => (
            <div className="service-card" key={idx}>
              <div className="service-icon" style={{fontSize: '2.5rem'}}>{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .services-section {
          padding: 4rem 0;
          background: #f8f9fa;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .services-title {
          font-size: 2.5rem;
          text-align: center;
          color: #17a2b8;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .services-subtitle {
          text-align: center;
          color: #6c757d;
          font-size: 1.1rem;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        .service-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
        }
        .service-card:hover {
          box-shadow: 0 8px 30px rgba(23, 162, 184, 0.12);
          transform: translateY(-8px);
        }
        .service-icon {
          margin-bottom: 1rem;
        }
        .service-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #17a2b8;
          margin-bottom: 0.5rem;
        }
        .service-description {
          color: #555;
          margin-bottom: 1rem;
        }
        .service-features {
          list-style: disc inside;
          color: #333;
        }
        .service-features li {
          margin-bottom: 0.3rem;
        }
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          .services-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
