"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { useAuth } from "../../context/authContext";
import { useScrollPosition } from "../../hooks/hooksHeaderNav/scrollHeader";
import { useClickOutside } from "../../hooks/hooksHeaderNav/clickOutside";
import { useCloseOnScroll } from "../../hooks/hooksHeaderNav/closeScroll";

interface HeaderNavProps {
  isLanding?: boolean;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ isLanding = true }) => {
  const { user, logout } = useAuth();

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrolled = useScrollPosition(isLanding);

  useClickOutside(menuRef, () => setOpen(false));
  useClickOutside(mobileMenuRef, () => {
    if (
      hamburgerRef.current &&
      !hamburgerRef.current.contains(document.activeElement)
    ) {
      setMobileMenuOpen(false);
    }
  });

  useCloseOnScroll(() => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
  }, isLanding);

  const handleReservasClick = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`w-full shadow-md px-4 py-2 transition-colors duration-300 z-50 ${
        isLanding
          ? `fixed top-0 left-0 ${
              scrolled || mobileMenuOpen ? "bg-white" : "bg-transparent"
            }`
          : "bg-white border-b border-gray-200"
      }`}
      style={{ scrollBehavior: "auto" }}
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
              <a href="#" className="hover:text-cyan-500 transition-colors">
                Inicio
              </a>
              <a
                href="#sobreNosotros"
                className="hover:text-cyan-500 transition-colors"
              >
                Nosotros
              </a>
              <a
                href="#services"
                className="hover:text-cyan-500 transition-colors"
              >
                Servicios
              </a>
              <a
                href="#testimonio"
                className="hover:text-cyan-500 transition-colors"
              >
                Testimonio
              </a>
              <a href="#" className="hover:text-cyan-500 transition-colors">
                Contacto
              </a>
            </>
          ) : (
            <a href="/" className="hover:text-cyan-500 transition-colors">
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
              <div className="flex items-center gap-2">
                <div className="relative" ref={menuRef}>
                  {/* Botón principal */}
                  <button
                    className="flex items-center gap-2 p-2 rounded-full hover:bg-blue-100 transition"
                    onClick={() => setOpen(!open)}
                    aria-label="Menú de usuario"
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
                            onClick={handleReservasClick}
                          >
                            Reservas
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 transition"
                            onClick={handleLogout}
                          >
                            Cerrar sesión
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Botón hamburguesa solo en landing */}
        {isLanding && (
          <button
            ref={hamburgerRef}
            className="md:hidden text-2xl focus:outline-none transition-transform duration-200"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        )}
      </div>

      {/* Menú desplegable móvil solo en landing */}
      {isLanding && (
        <div
          ref={mobileMenuRef}
          className={`${
            mobileMenuOpen ? "flex" : "hidden"
          } flex-col space-y-4 mt-4 px-4 md:hidden transition-all duration-300 ease-in-out`}
        >
          <nav className="flex flex-col space-y-2">
            <a
              href="#"
              className="hover:text-cyan-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </a>
            <a
              href="#sobreNosotros"
              className="hover:text-cyan-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nosotros
            </a>
            <a
              href="#services"
              className="hover:text-cyan-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Servicios
            </a>
            <a
              href="#testimonio"
              className="hover:text-cyan-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonio
            </a>
            <a
              href="#"
              className="hover:text-cyan-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacto
            </a>
          </nav>

          {/* Opciones de usuario en móvil */}
          {user && (
            <div className="border-t pt-4">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-700 font-semibold px-2">
                  {user.nombre}
                </span>
                <button
                  className="text-left px-2 py-1 hover:text-cyan-500 transition-colors"
                  onClick={handleReservasClick}
                >
                  Reservas
                </button>
                <button
                  className="text-left px-2 py-1 hover:text-red-500 text-red-500 transition-colors"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}

          {!user && (
            <div className="border-t pt-4">
              <Link
                href="/auth/login"
                className="block px-2 py-1 hover:text-cyan-500 transition-colors"
              >
                Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default HeaderNav;
