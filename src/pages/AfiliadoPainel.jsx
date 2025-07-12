import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AfiliadoPainel() {
  const [ganhos, setGanhos] = useState([]);
  const token = localStorage.getItem("token");

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/afiliados/minhas-comissoes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setGanhos(res.data))
      .catch((err) =>
        console.error("Erro ao buscar comissões do afiliado:", err)
      );
  }, [BASE_URL]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">💰 Minhas Comissões</h2>

      {ganhos.length === 0 ? (
        <p className="text-center text-gray-600">
          Você ainda não gerou comissões. Divulgue seus links para começar a ganhar!
        </p>
      ) : (
        <ul className="space-y-4">
          {ganhos.map((g, i) => (
            <li
              key={i}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <p className="text-lg font-medium text-gray-800">{g.title}</p>
              <p className="text-green-600 font-bold text-xl mb-1">
                Kz {parseFloat(g.valorAfiliado).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Recebido em: {new Date(g.createdAt).toLocaleString("pt-BR")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
