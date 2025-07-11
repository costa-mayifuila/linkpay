import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminSaques() {
  const [saques, setSaques] = useState([]);
  const token = localStorage.getItem("token");

  const BASE_URL = import.meta.env.VITE_API_URL;

  const carregar = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/saques/admin/todos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSaques(res.data);
    } catch (err) {
      console.error("Erro ao carregar saques:", err);
    }
  };

  const atualizarStatus = async (id, novoStatus) => {
    try {
      await axios.put(`${BASE_URL}/api/saques/admin/${id}`, {
        status: novoStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      carregar();
    } catch (err) {
      alert("Erro ao atualizar status do saque.");
      console.error(err);
    }
  };

  useEffect(() => {
    carregar();
  }, [BASE_URL]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Painel de Saques</h2>
      <ul className="space-y-4">
        {saques.map(s => (
          <li key={s._id} className="border p-4 rounded">
            <p><strong>Usuário:</strong> {s.userId.name} ({s.userId.email})</p>
            <p><strong>Valor:</strong> Kz {s.amount}</p>
            <p><strong>Status:</strong> {s.status}</p>
            <p><strong>Banco:</strong> {s.bankInfo.banco}</p>
            <p><strong>IBAN:</strong> {s.bankInfo.iban}</p>
            <p className="text-sm text-gray-600">Solicitado em: {new Date(s.requestedAt).toLocaleString()}</p>

            {s.status === "pendente" && (
              <div className="mt-3 space-x-3">
                <button onClick={() => atualizarStatus(s._id, "aprovado")}
                  className="bg-green-600 text-white px-3 py-1 rounded">Aprovar</button>
                <button onClick={() => atualizarStatus(s._id, "recusado")}
                  className="bg-red-600 text-white px-3 py-1 rounded">Recusar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
