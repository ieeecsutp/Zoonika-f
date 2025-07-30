
"use client";
import React, { useEffect, useState } from "react";
import HeaderNav from "../../../components/HeaderNav";
import Footer from "../../../components/Footer";
import { useParams } from "next/navigation";



interface Comentario {
  id: number;
  comentario: string;
  valoracion: number;
  usuarioId: number;
  galeriaId: number;
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

  // Autenticación local solo en memoria
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [auth, setAuth] = useState({ email: "", password: "" });
  const [authMsg, setAuthMsg] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" });
  const [showRegister, setShowRegister] = useState(false);
  const [register, setRegister] = useState({ nombre: "", email: "", password: "" });
  const [registerMsg, setRegisterMsg] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" });
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
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auth),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error de autenticación");
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
      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(register),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error de registro");
      setRegisterMsg({ type: "success", text: "¡Registro exitoso! Ahora puedes iniciar sesión." });
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
    fetch(`http://localhost:4000/galerias/${galeriaId}`)
      .then((res) => {
        if (!res.ok) throw new Error("No encontrada");
        return res.json();
      })
      .then((data: Galeria) => {
        setGaleria(data);
        setLoading(false);
        // Si usuario autenticado, buscar si ya tiene comentario
        if (usuario && data.comentarios) {
          const propio = data.comentarios.find((c: Comentario) => c.usuarioId === usuario.id);
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
      const endpoint = comentarioId
        ? `http://localhost:4000/comentarios/${comentarioId}`
        : "http://localhost:4000/comentarios";
      const method = comentarioId ? "PUT" : "POST";
      const body = {
        comentario,
        valoracion,
        usuarioId: usuario.id,
        galeriaId: Number(galeriaId),
      };
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      // Refrescar comentarios
      setComentarioId(data.id);
      setComentario(data.comentario);
      setValoracion(data.valoracion);
      // Recargar galería para mostrar comentarios actualizados
      fetch(`http://localhost:4000/galerias/${galeriaId}`)
        .then((res) => res.json())
        .then((data: Galeria) => setGaleria(data));
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
          <div className="text-xl text-red-500">Galería no encontrada</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderNav isLanding={false} />
      <main className="flex-1 bg-gray-100 flex flex-col items-center pt-8 md:pt-16 pb-8">
        {/* Bloque horizontal: imagen y descripción */}
        <section className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row gap-0 md:gap-8 p-6 md:p-10">
          <div className="flex justify-center items-center p-2 md:p-0 w-full md:w-1/2">
            <img
              src={galeria.imagenUrl}
              alt="Detalle galería"
              className="w-full max-w-xs h-auto rounded-xl object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-2 md:px-0 w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-cyan-600 mb-2">Detalle del trabajo</h1>
            <p className="text-gray-700 mb-1">Especialista: <b>{galeria.especialista?.nombre}</b></p>
            <p className="text-gray-600 mb-6 whitespace-pre-line">{galeria.descripcion}</p>
          </div>
        </section>
        {/* Bloque vertical: comentarios y login/registro */}
        <section className="w-full max-w-4xl mt-8 bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <h2 className="text-xl font-semibold mb-2">Comentarios y valoraciones</h2>
          {galeria.comentarios && galeria.comentarios.length > 0 ? (
            <div className="space-y-4 mb-4">
              {galeria.comentarios.map((comentario) => (
                <div key={comentario.id} className="border rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-cyan-700">Usuario #{comentario.usuarioId}</span>
                    <span className="text-yellow-400 text-lg">{'★'.repeat(comentario.valoracion)}</span>
                  </div>
                  <div className="text-gray-700 whitespace-pre-line">{comentario.comentario}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 mb-4">Aún no hay comentarios.</div>
          )}
          {/* Autenticación y comentarios */}
          {!usuario && !showRegister && (
            <form onSubmit={handleLogin} className="auth-mini-form mb-2">
              <div className="auth-mini-title">Iniciar sesión para comentar</div>
              <input
                type="email"
                placeholder="Email"
                value={auth.email}
                onChange={e => setAuth(a => ({ ...a, email: e.target.value }))}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={auth.password}
                onChange={e => setAuth(a => ({ ...a, password: e.target.value }))}
                required
              />
              <button type="submit">Entrar</button>
              {authMsg.text && (
                <div className={authMsg.type === "success" ? "msg-success" : "msg-error"}>{authMsg.text}</div>
              )}
              <div className="text-center mt-2">
                <button type="button" className="register-link" onClick={() => { setShowRegister(true); setRegisterMsg({ type: "", text: "" }); }}>
                  ¿No tienes cuenta? Regístrate
                </button>
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
                onChange={e => setRegister(r => ({ ...r, nombre: e.target.value }))}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={register.email}
                onChange={e => setRegister(r => ({ ...r, email: e.target.value }))}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={register.password}
                onChange={e => setRegister(r => ({ ...r, password: e.target.value }))}
                required
              />
              <button type="submit">Registrarme</button>
              {registerMsg.text && (
                <div className={registerMsg.type === "success" ? "msg-success" : "msg-error"}>{registerMsg.text}</div>
              )}
              <div className="text-center mt-2">
                <button type="button" className="register-link" onClick={() => setShowRegister(false)}>
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </div>
            </form>
          )}
          {usuario && (
            <form className="flex flex-col gap-4" onSubmit={handleComentario}>
              <textarea
                placeholder="Deja tu comentario..."
                className="min-h-[80px] rounded-lg border border-gray-300 p-2 resize-none bg-gray-100"
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                required
              />
              <div className="text-yellow-400 text-2xl flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={valoracion > i ? "cursor-pointer" : "cursor-pointer opacity-40"}
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
                  {comentarioId ? (comentarioLoading ? "Guardando..." : "Editar comentario") : (comentarioLoading ? "Enviando..." : "Comentar")}
                </button>
                <button type="button" onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
              </div>
              {comentarioError && <p className="text-red-500 text-sm">{comentarioError}</p>}
              {comentarioId && <p className="text-green-600 text-xs">Puedes editar tu comentario.</p>}
            </form>
          )}
        </section>
      </main>

      <style jsx>{`
        .auth-mini-form {
          max-width: 320px;
          margin: 0 auto 1.5rem auto;
          background: #fff;
          border: 1px solid #e1e8ed;
          border-radius: 8px;
          padding: 1.2rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
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
          background: #e74c3c !important;
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default GaleriaDetalle;
