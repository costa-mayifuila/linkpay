import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SuportePage() {
  const [tickets, setTickets] = useState([]);
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const token = localStorage.getItem("token");

  const BASE_URL = import.meta.env.VITE_API_URL;

  const carregarTickets = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/suporte/meus`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(res.data);
    } catch (err) {
      console.error("Erro ao carregar tickets:", err);
    }
  };

  useEffect(() => {
    carregarTickets();
  }, []);

  const abrirTicket = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/suporte/abrir`, {
        assunto,
        mensagem
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssunto("");
      setMensagem("");
      carregarTickets();
    } catch (err) {
      console.error("Erro ao abrir ticket:", err);
      alert("Erro ao abrir ticket.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Suporte</h2>

      <form onSubmit={abrirTicket} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Assunto"
          value={assunto}
          onChange={e => setAssunto(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          placeholder="Mensagem"
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        ></textarea>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Abrir Ticket</button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Meus Chamados</h3>
      <ul className="space-y-4">
        {tickets.map(t => (
          <li key={t._id} className="border p-3 rounded">
            <p><strong>{t.assunto}</strong> - {t.status}</p>
            {t.mensagens.map((m, i) => (
              <p key={i} className={`text-sm ${m.autor === "admin" ? "text-green-600" : ""}`}>
                [{m.autor}] {m.texto}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
