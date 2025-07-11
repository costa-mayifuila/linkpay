import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PerfilPage() {
  const [dados, setDados] = useState(null);
  const [novaSenha, setNovaSenha] = useState({ atual: "", nova: "" });
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const carregar = async () => {
    try {
      const res = await axios.get(`${API}/api/perfil/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDados(res.data);
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      alert("Erro ao carregar perfil.");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const atualizar = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("name", dados.name);
      form.append("email", dados.email);
      form.append("phone", dados.phone);
      if (dados.avatar) form.append("avatar", dados.avatar);

      await axios.put(`${API}/api/perfil`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Perfil atualizado!");
      carregar();
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      alert("Erro ao atualizar perfil.");
    }
  };

  const trocarSenha = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API}/api/perfil/senha`, novaSenha, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Senha atualizada com sucesso!");
      setNovaSenha({ atual: "", nova: "" });
    } catch (err) {
      console.error("Erro ao atualizar senha:", err);
      alert("Erro ao atualizar senha.");
    }
  };

  if (!dados) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Meu Perfil</h2>

      <form onSubmit={atualizar} className="space-y-4 mb-6">
        <input
          type="text"
          value={dados.name}
          onChange={e => setDados({ ...dados, name: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          placeholder="Nome"
          autoComplete="name"
        />
        <input
          type="email"
          value={dados.email}
          onChange={e => setDados({ ...dados, email: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          placeholder="Email"
          autoComplete="email"
        />
        <input
          type="text"
          value={dados.phone || ""}
          onChange={e => setDados({ ...dados, phone: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          placeholder="WhatsApp"
          autoComplete="tel"
        />
        <input
          type="file"
          onChange={e => setDados({ ...dados, avatar: e.target.files[0] })}
          className="w-full border px-4 py-2 rounded"
        />
        {dados.avatarUrl && (
          <img
            src={`${API}${dados.avatarUrl}`}
            alt="Avatar"
            className="w-20 h-20 rounded-full"
          />
        )}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
      </form>

      <form onSubmit={trocarSenha} className="space-y-4">
        <h3 className="text-xl font-semibold">Trocar Senha</h3>
        <input
          type="password"
          placeholder="Senha atual"
          value={novaSenha.atual}
          onChange={e => setNovaSenha({ ...novaSenha, atual: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          autoComplete="current-password"
        />
        <input
          type="password"
          placeholder="Nova senha"
          value={novaSenha.nova}
          onChange={e => setNovaSenha({ ...novaSenha, nova: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          autoComplete="new-password"
        />
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">Atualizar Senha</button>
      </form>
    </div>
  );
}
