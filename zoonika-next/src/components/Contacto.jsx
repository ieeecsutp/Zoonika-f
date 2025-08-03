"use client";
import React from "react";

export default function Contacto() {
  return (
    <section id="contacto" className="contact-section">
      <div className="container">
        <div className="contact-content">
          <div className="contact-image">
            <img src="/img/imgContacto.png" alt="Veterinaria con un perro" />
          </div>
          <div className="contact-form-container">
            <h2 className="contact-title">CONTACTENOS</h2>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="nombre">Nombre Completo</label>
                <input type="text" id="nombre" placeholder="Ingresa tu Nombre" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Ingresa tu Email" />
              </div>
              <div className="form-group">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea id="mensaje" rows="4" placeholder="Ingresa tu mensaje"></textarea>
              </div>
              <button type="submit" className="submit-btn">Enviar</button>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        .contact-section {
          padding: 5rem 0;
          background-color: #eaf6f6;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .contact-content {
          display: flex;
          align-items: center;
          gap: 3rem;
        }
        .contact-image {
          flex: 1;
        }
        .contact-image img {
          width: 100%;
          border-radius: 20px;
        }
        .contact-form-container {
          flex: 1;
          background-color: #17a2b8;
          padding: 3rem;
          border-radius: 20px;
          color: white;
        }
        .contact-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 2rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: white;
          color: #333;
        }
        .submit-btn {
          width: 100%;
          padding: 1rem;
          background-color: #0f7a8a;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .submit-btn:hover {
          background-color: #0d6775;
        }
        @media (max-width: 768px) {
          .contact-content {
            flex-direction: column;
          }
          .contact-form-container {
            width: 100%;
            order: 1;
          }
          .contact-image {
            order: 2;
          }
        }
      `}</style>
    </section>
  );
}
