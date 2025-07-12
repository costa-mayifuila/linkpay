import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SaquePage() {
  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({ amount: "", titular: "", banco: "", iban: "" });
  const [saques, setSaques] = useState([]);

  const carregarHistorico = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/saques/meus`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSaques(res.data);
    } catch (error) {
      console.error("Erro ao carregar saques:", error);
    }
  };

  useEffect(() => {
    carregarHistorico();
  }, []);

  const solicitarSaque = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/saques/solicitar`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Solicitação enviada com sucesso!");
      setForm({ amount: "", titular: "", banco: "", iban: "" });
      carregarHistorico();
    } catch (err) {
      alert(err.response?.data?.message || "❌ Erro ao solicitar saque.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">💰 Solicitar Saque</h2>

      <form onSubmit={solicitarSaque} className="space-y-4 bg-white border rounded shadow p-4 mb-8">
        <input
          type="number"
          name="amount"
          placeholder="Valor (Kz)"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="titular"
          placeholder="Nome do Titular"
          value={form.titular}
          onChange={e => setForm({ ...form, titular: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="banco"
          placeholder="Banco"
          value={form.banco}
          onChange={e => setForm({ ...form, banco: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="iban"
          placeholder="IBAN"
          value={form.iban}
          onChange={e => setForm({ ...form, iban: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200"
        >
          Enviar Solicitação
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">📜 Histórico de Saques</h3>
      <ul className="space-y-4">
        {saques.length === 0 && <p className="text-gray-500">Nenhum saque solicitado ainda.</p>}
        {saques.map(s => (
          <li key={s._id} className="bg-white border rounded shadow p-4">
            <p><strong>Valor:</strong> Kz {parseFloat(s.amount).toLocaleString()}</p>
            <p><strong>Status:</strong> <span className="capitalize">{s.status}</span></p>
            <p><strong>Banco:</strong> {s.bankInfo?.banco}</p>
            <p className="text-sm text-gray-600">
              <strong>Solicitado em:</strong>{" "}
              {new Date(s.requestedAt).toLocaleDateString("pt-BR")} às {new Date(s.requestedAt).toLocaleTimeString("pt-BR")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
