import React from "react";
import Head from "next/head";

export default function ZoonikaLayout({ title, description = "Zoonika - Cuidamos con amor cada mascota", children }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content={description} />
        <title>{title}</title>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>
      {children}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #fff;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .section {
          padding: 80px 0;
        }
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 20px;
          color: #2c3e50;
        }
        .section-subtitle {
          font-size: 1.1rem;
          text-align: center;
          color: #7f8c8d;
          margin-bottom: 60px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .btn {
          display: inline-block;
          padding: 12px 30px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }
        .btn-primary {
          background: linear-gradient(135deg, #3498db, #2980b9);
          color: white;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
        }
        .btn-outline {
          border: 2px solid #3498db;
          color: #3498db;
          background: transparent;
        }
        .btn-outline:hover {
          background: #3498db;
          color: white;
        }
        @media (max-width: 768px) {
          .section {
            padding: 40px 0;
          }
        }
      `}</style>
    </>
  );
}
