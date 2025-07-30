"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

// Tipos para usuario y comentarios
const initialAuth = { email: "", password: "" };

export default function Galeria() {
  const [galerias, setGalerias] = useState([]);
  const [loading, setLoading] = useState(true);
  // Solo galería visual, sin autenticación ni comentarios

  // Cargar galerías
  useEffect(() => {
    fetch("http://localhost:4000/galerias")
      .then((res) => res.json())
      .then((data) => {
        setGalerias(data);
        setLoading(false);
      });
  }, []);



  return (
    <section className="galerias-section">
      <div className="container">
        <h2 className="galerias-title">Galeria</h2>
        <p className="galerias-subtitle">Conoce más sobre nuestro trabajo y el cariño con el que cuidamos a tus mascotas</p>


        {/* Solo galería visual, sin autenticación ni comentarios */}

        {/* Galería visual */}
        {loading ? (
          <div className="text-center py-10">Cargando galería...</div>
        ) : (
          <div className="galerias-grid">
            {galerias.map((galeria) => (
              <Link href={`/galeria/${galeria.id}`} key={galeria.id} className="galeria-card-link">
                <div className="galeria-card">
                  <img src={galeria.imagenUrl} className="galeria-card-image" alt="Galería veterinaria" />
                </div>
              </Link>
            ))}
          </div>
        )}
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
        .galeria-card-link {
          text-decoration: none;
          color: inherit;
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
      .comentarios-section {
        margin: 2.5rem 0 2rem 0;
        background: #f6fcff;
        border-radius: 8px;
        padding: 1.5rem 1rem;
      }
      .comentario-card {
        background: #fff;
        border: 1px solid #e1e8ed;
        border-radius: 6px;
        margin-bottom: 1rem;
        padding: 0.7rem 1rem;
        box-shadow: 0 1px 4px rgba(0,0,0,0.03);
      }
      .comentario-nombre {
        font-weight: 600;
        color: #17a2b8;
      }
      .comentario-texto {
        margin: 0.3rem 0 0.2rem 0;
      }
      .comentario-valoracion {
        font-size: 0.95rem;
        color: #888;
      }
      .comentario-propio {
        color: #1cae4e;
        font-size: 0.9rem;
        margin-left: 0.5rem;
      }
      .comentario-form {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
      }
      .comentario-form textarea {
        border: 1px solid #b2d8e6;
        border-radius: 5px;
        padding: 0.5rem;
        font-size: 1rem;
        resize: vertical;
      }
      .valoracion-row {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .comentario-form button {
        background: #17a2b8;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 0.4rem 1rem;
        font-weight: 600;
        cursor: pointer;
      }
      .logout-btn {
        background: #e74c3c !important;
        margin-left: 1rem;
      }
      `}</style>
    </section>
  );
}
