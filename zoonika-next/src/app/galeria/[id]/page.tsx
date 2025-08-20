"use client";
import React, { useEffect, useState } from "react";
import HeaderNav from "../../../components/commons/HeaderNav";
import Footer from "../../../components/commons/Footer";
import HeroPage from "../../../components/Hero/heroPages";
import { useParams } from "next/navigation";
import { api } from "../../../utils/api";

interface Comentario {
  id: number;
  comentario: string;
  valoracion: number;
  usuarioId: number;
  galeriaId: number;
  usuario?: {
    id: number;
    nombre: string;
    email: string;
  };
}

interface Especialista {
  id: number;
  nombre: string;
  especialidad: string;
}

interface Galeria {
  id: number;
  imagenUrl: string;
  descripcion: string;
  especialista: Especialista;
  comentarios: Comentario[];
}

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

const GaleriaDetalle = () => {
  const params = useParams();
  const [galeria, setGaleria] = useState<Galeria | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comentario, setComentario] = useState<string>("");
  const [valoracion, setValoracion] = useState<number>(5);
  const [comentarioId, setComentarioId] = useState<number | null>(null);
  const [comentarioError, setComentarioError] = useState<string>("");
  const [comentarioLoading, setComentarioLoading] = useState<boolean>(false);
  const galeriaId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Autenticación local solo en memoria
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [auth, setAuth] = useState({ email: "", password: "" });
  const [authMsg, setAuthMsg] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({ type: "", text: "" });
  const [showRegister, setShowRegister] = useState(false);
  const [register, setRegister] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [registerMsg, setRegisterMsg] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({ type: "", text: "" });
  const [inactividadRef, setInactividadRef] = useState<any>(null);

  // Cierre de sesión por inactividad (10 min)
  useEffect(() => {
    if (!usuario) return;
    const resetTimer = () => {
      if (inactividadRef) clearTimeout(inactividadRef);
      const t = setTimeout(() => {
        setUsuario(null);
        setAuthMsg({ type: "", text: "" });
      }, 10 * 60 * 1000);
      setInactividadRef(t);
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      if (inactividadRef) clearTimeout(inactividadRef);
    };
    // eslint-disable-next-line
  }, [usuario]);

  // Cierre de sesión al recargar/cerrar pestaña
  useEffect(() => {
    const handleUnload = () => setUsuario(null);
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  // Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthMsg({ type: "", text: "" });
    try {
      const data = await api.login(auth);
      if (data.error) throw new Error(data.error);
      setUsuario(data);
      setAuthMsg({ type: "success", text: "¡Bienvenido!" });
      setAuth({ email: "", password: "" });
    } catch (err: any) {
      setAuthMsg({ type: "error", text: err.message });
    }
  };

  // Registro
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterMsg({ type: "", text: "" });
    try {
      const data = await api.register(register);
      if (data.error) throw new Error(data.error);
      setRegisterMsg({
        type: "success",
        text: "¡Registro exitoso! Ahora puedes iniciar sesión.",
      });
      setRegister({ nombre: "", email: "", password: "" });
    } catch (err: any) {
      setRegisterMsg({ type: "error", text: err.message });
    }
  };

  // Logout
  const handleLogout = () => {
    setUsuario(null);
    setAuthMsg({ type: "", text: "" });
  };

  // Cargar galería y comentarios
  useEffect(() => {
    if (!galeriaId) return;
    api
      .getGaleria(galeriaId)
      .then((data) => {
        // Verificamos que 'data' sea un objeto, no un array ni nulo
        if (!data || Array.isArray(data)) {
          setError("Datos inválidos");
          setGaleria(null);
        } else {
          setGaleria(data);
          // Si usuario autenticado, buscar si ya tiene comentario
          if (usuario && data.comentarios) {
            const propio = data.comentarios.find(
              (c: Comentario) => c.usuarioId === usuario.id
            );
            if (propio) {
              setComentario(propio.comentario);
              setValoracion(propio.valoracion);
              setComentarioId(propio.id);
            } else {
              setComentario("");
              setValoracion(5);
              setComentarioId(null);
            }
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setError("No encontrada");
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [galeriaId, usuario]);

  const handleComentario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComentarioError("");
    setComentarioLoading(true);
    try {
      if (!usuario) throw new Error("Debes iniciar sesión");

      const body = {
        comentario,
        valoracion,
        usuarioId: usuario.id,
        galeriaId: Number(galeriaId),
      };

      let data;
      if (comentarioId) {
        data = await api.updateComentario(comentarioId, body);
      } else {
        data = await api.createComentario(body);
      }

      if (data.error) throw new Error(data.error);

      // Refrescar comentarios
      setComentarioId(data.id);
      setComentario(data.comentario);
      setValoracion(data.valoracion);

      setMostrarFormulario(false);

      // Recargar galería para mostrar comentarios actualizados
      const updatedGaleria = await api.getGaleria(galeriaId);
      setGaleria(updatedGaleria);
    } catch (err: any) {
      setComentarioError(err.message);
    } finally {
      setComentarioLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <HeaderNav isLanding={false} />
        <main className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="text-xl text-gray-500">Cargando detalle...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !galeria) {
    return (
      <div className="min-h-screen flex flex-col">
        <HeaderNav isLanding={false} />
        <main className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="text-xl text-red-500">
            Galería no encontrada o datos inválidos
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderNav isLanding={false} />
      <HeroPage />
      <main className="flex-1 bg-gray-100 flex flex-col items-center">
        {/* Sección 1: imagen + descripción, fondo blanco */}
        <section className="w-full bg-cyan-50 ">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-0 md:gap-8 p-6 md:p-10">
            <div className="flex justify-center items-center p-2 md:p-0 w-full md:w-1/2">
              <img
                src={galeria.imagenUrl}
                alt="Detalle galería"
                className="w-full max-w-xs h-auto rounded-xl object-cover"
              />
            </div>
            <div className="flex flex-col justify-center px-2 md:px-0 w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl font-bold text-cyan-600 mb-2">
                Detalle del trabajo
              </h1>
              <p className="text-gray-700 mb-1">
                Especialista: <b>{galeria.especialista?.nombre}</b>
              </p>
              <p className="text-gray-600 mb-6 whitespace-pre-line">
                {galeria.descripcion}
              </p>
            </div>
          </div>
        </section>

        {/* Sección 2: fondo gris claro, contenido blanco centrado */}
        <section className="w-full bg-white">
          <div className="max-w-7xl mx-auto p-6 md:p-10">
            <h2 className="text-xl font-semibold mb-2">
              Comentarios y valoraciones
            </h2>
            {galeria.comentarios && galeria.comentarios.length > 0 ? (
              <div className="space-y-4 mb-4">
                {galeria.comentarios.map((comentario) => (
                  <div
                    key={comentario.id}
                    className="border rounded-lg p-3 bg-gray-50"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-cyan-700">
                        {comentario.usuario?.nombre ||
                          comentario.usuario?.email ||
                          `Usuario registrado`}
                      </span>
                      <span className="text-yellow-400 text-lg">
                        {"★".repeat(comentario.valoracion)}
                      </span>
                    </div>
                    <div className="text-gray-700 whitespace-pre-line">
                      {comentario.comentario}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400 mb-4">Aún no hay comentarios.</div>
            )}
            {/* Autenticación y comentarios */}
            {!usuario && !showRegister && (
              <form onSubmit={handleLogin} className="auth-mini-form mb-2">
                <div className="auth-mini-title">
                  Iniciar sesión para comentar
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={auth.email}
                  onChange={(e) =>
                    setAuth((a) => ({ ...a, email: e.target.value }))
                  }
                  required
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={auth.password}
                  onChange={(e) =>
                    setAuth((a) => ({ ...a, password: e.target.value }))
                  }
                  required
                />
                <button type="submit">Entrar</button>
                {authMsg.text && (
                  <div
                    className={
                      authMsg.type === "success" ? "msg-success" : "msg-error"
                    }
                  >
                    {authMsg.text}
                  </div>
                )}
                <div className="text-center mt-2">
                  <span
                    onClick={() => {
                      setShowRegister(true);
                      setRegisterMsg({ type: "", text: "" });
                    }}
                    className="text-cyan-600 underline cursor-pointer text-sm hover:text-cyan-800 transition-colors"
                  >
                    ¿No tienes cuenta? Regístrate
                  </span>
                </div>
              </form>
            )}
            {!usuario && showRegister && (
              <form onSubmit={handleRegister} className="auth-mini-form mb-2">
                <div className="auth-mini-title">Registro de usuario</div>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={register.nombre}
                  onChange={(e) =>
                    setRegister((r) => ({ ...r, nombre: e.target.value }))
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={register.email}
                  onChange={(e) =>
                    setRegister((r) => ({ ...r, email: e.target.value }))
                  }
                  required
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={register.password}
                  onChange={(e) =>
                    setRegister((r) => ({ ...r, password: e.target.value }))
                  }
                  required
                />
                <button type="submit">Registrarme</button>
                {registerMsg.text && (
                  <div
                    className={
                      registerMsg.type === "success"
                        ? "msg-success"
                        : "msg-error"
                    }
                  >
                    {registerMsg.text}
                  </div>
                )}
                <div className="text-center mt-2">
                  <span
                    onClick={() => setShowRegister(false)}
                    className="text-cyan-600 underline cursor-pointer text-sm hover:text-cyan-800 transition-colors"
                  >
                    ¿Ya tienes cuenta? Inicia sesión
                  </span>
                </div>
              </form>
            )}
            {usuario && (
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-3">
                  <div>
                    Comentando como:{" "}
                    <span className="font-semibold text-cyan-700">
                      {usuario.nombre}
                    </span>
                    {/* Texto de editar con "aquí" clickeable */}
                    {comentarioId && !mostrarFormulario && (
                      <p className="text-green-600 text-xs mb-2">
                        Edita tu comentario{" "}
                        <span
                          className="cursor-pointer underline hover:text-green-800"
                          onClick={() => setMostrarFormulario(true)}
                        >
                          aquí
                        </span>
                        .
                      </p>
                    )}
                  </div>
                  {/* Cerrar sesión solo si el formulario NO está activo */}
                  {!mostrarFormulario && (
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="logout-btn"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>

                {/* Formulario visible solo si mostrarFormulario es true */}
                {mostrarFormulario && (
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={handleComentario}
                  >
                    <textarea
                      placeholder="Deja tu comentario..."
                      className="min-h-[80px] rounded-lg border border-gray-300 p-2 resize-none bg-gray-100"
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      required
                    />
                    <div className="text-yellow-400 text-2xl flex gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={
                            valoracion > i
                              ? "cursor-pointer"
                              : "cursor-pointer opacity-40"
                          }
                          onClick={() => setValoracion(i + 1)}
                          role="button"
                          aria-label={`Valorar ${i + 1} estrellas`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 items-center">
                      <button
                        type="submit"
                        className="bg-cyan-600 text-white rounded-lg px-6 py-2 text-base font-semibold disabled:opacity-60"
                        disabled={comentarioLoading}
                      >
                        {comentarioId
                          ? comentarioLoading
                            ? "Guardando..."
                            : "Actualizar"
                          : comentarioLoading
                          ? "Enviando..."
                          : "Comentar"}
                      </button>

                      {comentarioId && (
                        <button
                          type="button"
                          className="delete-btn"
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                    {comentarioError && (
                      <p className="text-red-500 text-sm">{comentarioError}</p>
                    )}
                  </form>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <style jsx>{`
        .auth-mini-form {
          max-width: 320px;
          margin: 0 auto 1.5rem auto;
          background: #eaf9fdff;
          border: 1px solid #e1e8ed;
          border-radius: 8px;
          padding: 1.2rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .auth-mini-title {
          font-weight: 600;
          color: #17a2b8;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .auth-mini-form input {
          border: 1px solid #b2d8e6;
          border-radius: 5px;
          padding: 0.5rem;
          font-size: 1rem;
        }
        .auth-mini-form button {
          background: #17a2b8;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 0.5rem;
        }
        .msg-success {
          color: #1cae4e;
          font-size: 0.95rem;
          text-align: center;
        }
        .msg-error {
          color: #e74c3c;
          font-size: 0.95rem;
          text-align: center;
        }
        .register-link {
          background: none;
          border: none;
          color: #17a2b8;
          text-decoration: underline;
          cursor: pointer;
          font-size: 0.97rem;
          margin-top: 0.2rem;
        }
        .logout-btn {
          background: #72b0fcff !important;
          color: #000000ff !important;
          border: none;
          padding: 0.5rem 1rem;
        }
        .delete-btn {
          background: #e74c3c !important;
          color: #fff !important;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default GaleriaDetalle;
