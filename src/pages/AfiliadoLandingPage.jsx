import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AfiliadoLandingPage() {
  const { idAfiliado } = useParams();
  const [produtos, setProdutos] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/publico/afiliado-page/${idAfiliado}`)
      .then((res) => setProdutos(res.data))
      .catch((err) =>
        console.error("Erro ao carregar produtos do afiliado:", err)
      );
  }, [idAfiliado, BASE_URL]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
        🔗 Produtos Recomendados
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Todos os produtos abaixo foram indicados por um afiliado.
      </p>

      {produtos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto disponível.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((p) => (
            <div
              key={p._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
            >
              {/* Imagem (opcional) */}
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {p.title}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  {p.description?.slice(0, 100)}...
                </p>
                <p className="text-blue-600 font-bold text-lg mb-4">
                  Kz {parseFloat(p.amount).toLocaleString()}
                </p>
              </div>

              <a
                href={`/pagar/${p.slug}?ref=${idAfiliado}`}
                className="mt-auto inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl transition-colors"
              >
                Comprar agora
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
