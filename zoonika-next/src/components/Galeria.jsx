"use client";
import React from "react";

const galerias = [
  { imagen: "/img/imgVeterinaria.png" },
  { imagen: "/img/imgVeterinaria2.png" },
  { imagen: "/img/imgVeterinaria3.png" },
  { imagen: "/img/imgVeterinaria4.png" },
  { imagen: "/img/imgVeterinaria5.png" },
  { imagen: "/img/imgVeterinaria6.png" },
  { imagen: "/img/imgVeterinaria7.png" },
  { imagen: "/img/imgVeterinaria8.png" }
];

export default function Galeria() {
  return (
    <section className="galerias-section">
      <div className="container">
        <h2 className="galerias-title">Galeria</h2>
        <p className="galerias-subtitle">Conoce más sobre nuestro trabajo y el cariño con el que cuidamos a tus mascotas</p>
        <div className="galerias-grid">
          {galerias.map((galeria, idx) => (
            <div className="galeria-card" key={idx}>
              <img src={galeria.imagen} className="galeria-card-image" alt="Galería veterinaria" />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .galerias-section {
          padding: 4rem 0;
          background: #f8f9fa;
        }
        .container {
          max-width: 1500px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .galerias-title {
          font-size: 2.5rem;
          text-align: center;
          color: #17a2b8;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .galerias-subtitle {
          text-align: center;
          color: #6c757d;
          font-size: 1.1rem;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .galerias-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        .galeria-card {
          background: #17a3b836;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #e1e8ed;
        }
        .galeria-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }
        .galeria-card-image {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
        @media (max-width: 768px) {
          .galerias-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
          }
          .galeria-card {
            padding: 1.5rem;
          }
          .galerias-title {
            font-size: 2rem;
          }
          .galeria-card-image {
            width: 100%;
            height: auto;
            border-radius: 10px;
          }
        }
      `}</style>
    </section>
  );
}
