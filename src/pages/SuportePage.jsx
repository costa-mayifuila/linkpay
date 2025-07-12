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
        headers: { Authorization: `Bearer ${token}` },
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
      await axios.post(
        `${BASE_URL}/api/suporte/abrir`,
        { assunto, mensagem },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Central de Suporte</h2>

      <form onSubmit={abrirTicket} className="space-y-4 mb-8 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Assunto do chamado"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded"
          required
        />
        <textarea
          placeholder="Descreva seu problema ou dúvida"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded h-32 resize-none"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200"
        >
          Abrir Ticket
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">📁 Meus Chamados</h3>
      {tickets.length === 0 ? (
        <p className="text-gray-500">Você ainda não abriu nenhum ticket.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((t) => (
            <li key={t._id} className="border border-gray-300 rounded p-4 bg-white shadow">
              <p className="font-semibold mb-1">
                {t.assunto} <span className="text-sm text-gray-500">({t.status})</span>
              </p>
              <div className="space-y-1 text-sm">
                {t.mensagens.map((m, i) => (
                  <p
                    key={i}
                    className={`${
                      m.autor === "admin"
                        ? "text-green-700"
                        : "text-gray-700"
                    }`}
                  >
                    <span className="font-medium">[{m.autor}]</span> {m.texto}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
