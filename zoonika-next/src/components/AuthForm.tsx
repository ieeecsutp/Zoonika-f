"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";

interface AuthFormProps {
  onAuth: (user: { id: string; nombre: string; email: string }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin
        ? "http://localhost:4000/auth/login"
        : "http://localhost:4000/auth/register";

      const body = isLogin
        ? { email, password }
        : { nombre, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error");

      onAuth(data); // data: { id, nombre, email }
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-cyan-700">
        {isLogin ? "Iniciar sesión" : "Registrarse"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
            className="border rounded-lg p-2"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="border rounded-lg p-2"
          required
        />
        <button
          type="submit"
          className="bg-cyan-600 text-white rounded-lg px-6 py-2 text-base font-semibold disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Cargando..." : isLogin ? "Entrar" : "Registrarse"}
        </button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </form>
      <div className="mt-4 text-center">
        <button
          type="button"
          className="text-cyan-700 underline text-sm"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
