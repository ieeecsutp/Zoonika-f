"use client";
import React from "react";

export default function AcercaDeNosotros() {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">
              Acerca de <br />
              <span className="highlight">NOSOTROS</span>
            </h2>
            <p className="about-description">
              Contamos con un equipo de especialistas altamente 
              calificados y más de 6 años de experiencia 
              ofreciendo atención de calidad. Nos dedicamos al 
              seguimiento personalizado de cada paciente, con el 
              firme compromiso de detectar, prevenir y tratar 
              cualquier condición que pueda afectar la salud de su 
              mascota.
            </p>
          </div>
          <div className="about-image">
            <div className="image-container">
              <img src="/img/imgVeterinaria.png" alt="Veterinario atendiendo mascota" />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .about-section {
          padding: 5rem 0;
          background-color: #f0f9ff;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .about-text {
          padding-right: 2rem;
        }
        .about-title {
          font-size: 2.5rem;
          font-weight: 400;
          color: #333;
          margin-bottom: 2rem;
          line-height: 1.2;
        }
        .highlight {
          color: #17a2b8;
          font-weight: 700;
        }
        .about-description {
          font-size: 1rem;
          line-height: 1.8;
          color: #555;
          text-align: justify;
        }
        .about-image {
          display: flex;
          justify-content: center;
        }
        .image-container {
          position: relative;
          width: 100%;
          max-width: 400px;
        }
        .image-container::before {
          content: '';
          position: absolute;
          top: -20px;
          right: -20px;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #17a2b8, #20c997);
          border-radius: 50% 20% 50% 20%;
          z-index: -1;
        }
        .image-container img {
          width: 100%;
          height: auto;
          border-radius: 50% 20% 50% 20%;
          object-fit: cover;
        }
        @media (max-width: 768px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }
          .about-text {
            padding-right: 0;
          }
          .about-title {
            font-size: 2rem;
          }
          .about-description {
            text-align: left;
          }
          .image-container {
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  );
}
