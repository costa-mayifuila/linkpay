import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AfiliadoSaquePage() {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({ amount: "", titular: "", banco: "", iban: "" });
  const [saques, setSaques] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const carregarHistorico = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/afiliados/saques/meus`, {
        headers: { Authorization: `Bearer ${token}` }
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
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Saque solicitado!");
      setForm({ amount: "", titular: "", banco: "", iban: "" });
      carregarHistorico();
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao solicitar saque.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Saque de Comissões</h2>
      <form onSubmit={solicitarSaque} className="space-y-4 mb-6">
        <input type="number" name="amount" placeholder="Valor (Kz)" value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })} className="w-full border px-4 py-2 rounded" required />
        <input type="text" name="titular" placeholder="Nome do Titular" value={form.titular}
          onChange={e => setForm({ ...form, titular: e.target.value })} className="w-full border px-4 py-2 rounded" required />
        <input type="text" name="banco" placeholder="Banco" value={form.banco}
          onChange={e => setForm({ ...form, banco: e.target.value })} className="w-full border px-4 py-2 rounded" required />
        <input type="text" name="iban" placeholder="IBAN" value={form.iban}
          onChange={e => setForm({ ...form, iban: e.target.value })} className="w-full border px-4 py-2 rounded" required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Solicitar</button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Histórico de Saques</h3>
      <ul className="space-y-2">
        {saques.map(s => (
          <li key={s._id} className="border p-3 rounded">
            <p><strong>Valor:</strong> Kz {s.amount}</p>
            <p><strong>Status:</strong> {s.status}</p>
            <p className="text-sm text-gray-600">Solicitado em: {new Date(s.requestedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
