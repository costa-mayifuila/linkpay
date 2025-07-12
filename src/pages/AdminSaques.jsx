import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminSaques() {
  const [saques, setSaques] = useState([]);
  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_API_URL;

  const carregar = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/saques/admin/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSaques(res.data);
    } catch (err) {
      console.error("Erro ao carregar saques:", err);
    }
  };

  const atualizarStatus = async (id, novoStatus) => {
    try {
      await axios.put(
        `${BASE_URL}/api/saques/admin/${id}`,
        { status: novoStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        💸 Painel de Saques
      </h2>

      {saques.length === 0 ? (
        <p className="text-gray-600">Nenhum saque pendente no momento.</p>
      ) : (
        <ul className="space-y-6">
          {saques.map((s) => (
            <li
              key={s._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-5"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <p className="font-medium text-gray-800">
                    👤 <strong>{s.userId.name}</strong> ({s.userId.email})
                  </p>
                  <p className="text-sm text-gray-600">
                    Banco: {s.bankInfo.banco} | IBAN: {s.bankInfo.iban}
                  </p>
                  <p className="text-sm text-gray-600">
                    Solicitado em:{" "}
                    {new Date(s.requestedAt).toLocaleString("pt-BR")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-blue-700">
                    Kz {parseFloat(s.amount).toLocaleString()}
                  </p>
                  <p
                    className={`text-sm mt-1 font-medium ${
                      s.status === "pendente"
                        ? "text-yellow-600"
                        : s.status === "aprovado"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Status: {s.status}
                  </p>
                </div>
              </div>

              {s.status === "pendente" && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => atualizarStatus(s._id, "aprovado")}
                    className="bg-green-600 hover:bg-green-700 transition-colors text-white px-4 py-2 rounded-lg"
                  >
                    ✅ Aprovar
                  </button>
                  <button
                    onClick={() => atualizarStatus(s._id, "recusado")}
                    className="bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded-lg"
                  >
                    ❌ Recusar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
