import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AfiliadoPainel() {
  const [ganhos, setGanhos] = useState([]);
  const token = localStorage.getItem("token");

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/afiliados/minhas-comissoes`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setGanhos(res.data));
  }, [BASE_URL]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Minhas Comissões</h2>
      {ganhos.length === 0 ? (
        <p>Você ainda não gerou comissões.</p>
      ) : (
        <ul className="space-y-3">
          {ganhos.map((g, i) => (
            <li key={i} className="border p-3 rounded">
              <p><strong>Título:</strong> {g.title}</p>
              <p><strong>Comissão Recebida:</strong> Kz {g.valorAfiliado.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Data: {new Date(g.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
