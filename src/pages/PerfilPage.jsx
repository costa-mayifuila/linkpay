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
    if (!token) return navigate("/login");

    const carregar = async () => {
      try {
        const res = await axios.get(`${API}/api/perfil/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(res.data);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        alert("Erro ao carregar perfil.");
      }
    };

    carregar();
  }, [token, navigate, API]);

  const atualizar = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", dados.name);
      form.append("email", dados.email);
      form.append("phone", dados.phone || "");
      if (dados.avatar) form.append("avatar", dados.avatar);

      await axios.put(`${API}/api/perfil`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Perfil atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      alert("❌ Não foi possível atualizar o perfil.");
    }
  };

  const trocarSenha = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/api/perfil/senha`, novaSenha, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("🔐 Senha alterada com sucesso!");
      setNovaSenha({ atual: "", nova: "" });
    } catch (err) {
      console.error("Erro ao trocar senha:", err);
      alert("❌ Senha atual incorreta.");
    }
  };

  if (!dados) return <div className="p-6 text-center">🔄 Carregando perfil...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">👤 Meu Perfil</h2>

      <form onSubmit={atualizar} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-semibold mb-1">Nome</label>
          <input
            type="text"
            value={dados.name}
            onChange={(e) => setDados({ ...dados, name: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">E-mail</label>
          <input
            type="email"
            value={dados.email}
            onChange={(e) => setDados({ ...dados, email: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">WhatsApp</label>
          <input
            type="text"
            value={dados.phone || ""}
            onChange={(e) => setDados({ ...dados, phone: e.target.value })}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Foto de Perfil</label>
          <input
            type="file"
            onChange={(e) => setDados({ ...dados, avatar: e.target.files[0] })}
            className="w-full border px-4 py-2 rounded"
            accept="image/*"
          />
          {dados.avatarUrl && (
            <img
              src={`${API}${dados.avatarUrl}`}
              alt="Avatar"
              className="w-24 h-24 mt-2 rounded-full object-cover"
            />
          )}
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition">
          💾 Salvar Alterações
        </button>
      </form>

      <form onSubmit={trocarSenha} className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">🔐 Trocar Senha</h3>

        <input
          type="password"
          placeholder="Senha atual"
          value={novaSenha.atual}
          onChange={(e) => setNovaSenha({ ...novaSenha, atual: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Nova senha"
          value={novaSenha.nova}
          onChange={(e) => setNovaSenha({ ...novaSenha, nova: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded transition">
          🔄 Atualizar Senha
        </button>
      </form>
    </div>
  );
}
