"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/authContext";

interface HeaderNavProps {
  isLanding?: boolean;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ isLanding = true }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú si hago clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header
      id="mainHeader"
      className={`w-full shadow-md px-4 py-2 transition-colors duration-300 z-50 ${
        isLanding
          ? "bg-transparent fixed top-0 left-0"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="font-inter text-2xl md:text-3xl font-bold">
          Zoo<strong className="text-cyan-500">nika</strong>
        </div>

        {/* Menú de navegación - solo visible en md+ */}
        <nav className="hidden md:flex space-x-6">
          {isLanding ? (
            <>
              <a href="#" className="hover:text-cyan-500">
                Inicio
              </a>
              <a href="#" className="hover:text-cyan-500">
                Nosotros
              </a>
              <a href="#services" className="hover:text-cyan-500">
                Servicios
              </a>
              <a href="#testimonio" className="hover:text-cyan-500">
                Testimonio
              </a>
              <a href="#" className="hover:text-cyan-500">
                Contacto
              </a>
            </>
          ) : (
            <a href="/" className="hover:text-cyan-500">
              Volver al inicio
            </a>
          )}
        </nav>

        {/* Iconos solo en landing */}
        {isLanding && (
          <div className="hidden md:flex space-x-4">
            {!user ? (
              <Link
                href="/auth/login"
                className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
                aria-label="inicio de sesion"
              >
                Iniciar Sesión
              </Link>
            ) : (
              <>
                {/* Icono de Usuario con nombre */}
                <div className="flex items-center gap-2">
                  <div className="relative" ref={menuRef}>
                    {/* Botón principal */}
                    <button
                      className="flex items-center gap-2 p-2 rounded-full hover:bg-blue-100 transition"
                      onClick={() => setOpen(!open)}
                    >
                      <span className="text-gray-700 font-semibold">
                        {user?.nombre}
                      </span>
                      <i className="fa-solid fa-circle-user text-cyan-600 text-xl"></i>
                    </button>

                    {/* Menú desplegable */}
                    {open && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border border-gray-200 z-50">
                        <ul className="flex flex-col text-gray-700">
                          <li>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-cyan-50 transition"
                              onClick={() => {
                                setOpen(false);
                                // Aquí puedes redirigir a la página de reservas
                                console.log("Ir a reservas");
                              }}
                            >
                              Reservas
                            </button>
                          </li>
                          <li>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 transition"
                              onClick={() => {
                                logout();
                                setOpen(false);
                              }}
                            >
                              Cerrar sesión
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Botón hamburguesa solo en landing */}
        {isLanding && (
          <button
            id="menuToggle"
            className="md:hidden text-2xl focus:outline-none"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        )}
      </div>

      {/* Menú desplegable móvil solo en landing */}
      {isLanding && (
        <div
          id="mobileMenu"
          className="hidden flex-col space-y-4 mt-4 px-4 md:hidden transition-all duration-300 ease-in-out"
        >
          <nav className="flex flex-col space-y-2">
            <a href="#" className="hover:text-cyan-500">
              Inicio
            </a>
            <a href="#" className="hover:text-cyan-500">
              Nosotros
            </a>
            <a href="#services" className="hover:text-cyan-500">
              Servicios
            </a>
            <a href="#testimonio" className="hover:text-cyan-500">
              Testimonio
            </a>
            <a href="#" className="hover:text-cyan-500">
              Contacto
            </a>
          </nav>
        </div>
      )}

      {/* Script solo en landing */}
      {isLanding && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const toggle = document.getElementById('menuToggle');
              const menu = document.getElementById('mobileMenu');
              const header = document.getElementById('mainHeader');

              const handleScroll = () => {
                if(window.scrollY > 10) {
                  header?.classList.add('bg-white');
                } else {
                  header?.classList.remove('bg-white');
                }
              };

              toggle?.addEventListener('click', function() {
                menu?.classList.toggle('hidden');
              });

              document.addEventListener('click', function(e) {
                if (!menu?.contains(e.target) && !toggle?.contains(e.target)) {
                  menu?.classList.add('hidden');
                }
              });

              window.addEventListener('scroll', handleScroll);
            });
          `,
          }}
        />
      )}
    </header>
  );
};

export default HeaderNav;
