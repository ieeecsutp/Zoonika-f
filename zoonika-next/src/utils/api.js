const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const api = {
  // Autenticación
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  // Galerías
  getGalerias: async () => {
    const response = await fetch(`${API_URL}/galerias`);
    return response.json();
  },

  getGaleria: async (id) => {
    try {
      const response = await fetch(`${API_URL}/galerias/${id}`);
      const galeria = await response.json();
      
      // Ahora el backend incluye automáticamente los datos del usuario en comentarios
      // No necesitamos hacer llamadas adicionales
      
      return galeria;
    } catch (error) {
      console.error("Error en getGaleria:", error);
      throw error;
    }
  },

  // Comentarios
  createComentario: async (comentarioData) => {
    const response = await fetch(`${API_URL}/comentarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comentarioData)
    });
    return response.json();
  },

  updateComentario: async (id, comentarioData) => {
    const response = await fetch(`${API_URL}/comentarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comentarioData)
    });
    return response.json();
  },

  deleteComentario: async (id) => {
    const response = await fetch(`${API_URL}/comentarios/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Usuarios
  getUsuario: async (id) => {
    const response = await fetch(`${API_URL}/usuarios/${id}`);
    return response.json();
  }
};
