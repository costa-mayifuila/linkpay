import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AfiliadoLandingPage() {
  const { idAfiliado } = useParams();
  const [produtos, setProdutos] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/publico/afiliado-page/${idAfiliado}`)
      .then(res => setProdutos(res.data));
  }, [idAfiliado, BASE_URL]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">🔗 Produtos recomendados</h1>

      {produtos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto disponível.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {produtos.map(p => (
            <div key={p._id} className="border rounded p-4 shadow bg-white">
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{p.description}</p>
              <p className="mb-2 text-blue-600 font-bold">Kz {p.amount}</p>
              <a
                href={`/pagar/${p.slug}?ref=${idAfiliado}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
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
