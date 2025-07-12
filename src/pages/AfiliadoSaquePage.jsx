import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AfiliadoSaquePage() {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    amount: "",
    titular: "",
    banco: "",
    iban: "",
  });
  const [saques, setSaques] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const carregarHistorico = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/afiliados/saques/meus`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSaques(res.data);
    } catch (err) {
      console.error("Erro ao carregar histórico:", err);
    }
  };

  useEffect(() => {
    carregarHistorico();
  }, [BASE_URL]);

  const solicitarSaque = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/afiliados/saques/solicitar`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Saque solicitado com sucesso!");
      setForm({ amount: "", titular: "", banco: "", iban: "" });
      carregarHistorico();
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao solicitar saque.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        💸 Saque de Comissões
      </h2>

      {/* Formulário */}
      <form
        onSubmit={solicitarSaque}
        className="space-y-4 bg-white border border-gray-200 p-5 rounded-xl shadow mb-8"
      >
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Valor a sacar (Kz)
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Ex: 5000"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Nome do Titular
          </label>
          <input
            type="text"
            name="titular"
            placeholder="Nome completo"
            value={form.titular}
            onChange={(e) => setForm({ ...form, titular: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Banco</label>
          <input
            type="text"
            name="banco"
            placeholder="Nome do banco"
            value={form.banco}
            onChange={(e) => setForm({ ...form, banco: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">IBAN</label>
          <input
            type="text"
            name="iban"
            placeholder="Número IBAN completo"
            value={form.iban}
            onChange={(e) => setForm({ ...form, iban: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium px-4 py-2 rounded-lg"
        >
          Solicitar Saque
        </button>
      </form>

      {/* Histórico de saques */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        🧾 Histórico de Saques
      </h3>

      {saques.length === 0 ? (
        <p className="text-gray-600">Nenhum saque solicitado ainda.</p>
      ) : (
        <ul className="space-y-4">
          {saques.map((s) => (
            <li
              key={s._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-5"
            >
              <p className="text-lg font-medium text-gray-800">
                Kz {parseFloat(s.amount).toLocaleString()}
              </p>
              <p
                className={`text-sm font-medium ${
                  s.status === "pendente"
                    ? "text-yellow-600"
                    : s.status === "aprovado"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Status: {s.status}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Solicitado em:{" "}
                {new Date(s.requestedAt).toLocaleString("pt-BR")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
