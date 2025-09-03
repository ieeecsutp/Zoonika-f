"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/authContext";

type AuthFormProps = {
  type: "login" | "register";
};

type FormData = {
  email: string;
  password: string;
  name?: string;
};

export default function AuthForm({ type }: AuthFormProps) {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");

    try {
      const endpoint =
        type === "login"
          ? "http://localhost:4000/auth/login"
          : "http://localhost:4000/auth/register";

      const body =
        type === "login"
          ? { email: data.email, password: data.password }
          : { nombre: data.name, email: data.email, password: data.password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const responseData = await res.json();

    if (!res.ok) throw new Error(responseData.error || "Error en la autenticación");

    login(responseData); // responseData contiene { id, nombre, email }

    router.push("/");
  } catch (err: any) {
    setError(err.message || "Error desconocido");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-cyan-700">
          {type === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {type === "register" && (
            <div>
              <label className="block mb-1 text-gray-700">Nombre</label>
              <input
                type="text"
                {...register("name", { required: "El nombre es obligatorio" })}
                className="w-full border px-3 py-2 rounded-lg"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
          )}

          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "El correo es obligatorio" })}
              className="w-full border px-3 py-2 rounded-lg"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Contraseña</label>
            <input
              type="password"
              {...register("password", { required: "La contraseña es obligatoria" })}
              className="w-full border px-3 py-2 rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition disabled:opacity-60"
          >
            {loading ? "Procesando..." : type === "login" ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {type === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            onClick={() => router.push(type === "login" ? "/auth/register" : "/auth/login")}
            className="text-cyan-600 hover:underline"
          >
            {type === "login" ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}
