import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function PaginaAfiliado() {
  const { slug } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    const url = `${BASE_URL}/api/publico/${slug}${ref ? `?ref=${ref}` : ""}`;

    axios
      .get(url)
      .then((res) => {
        setLink(res.data);
      })
      .catch(() => {
        navigate("/erro");
      })
      .finally(() => setLoading(false));
  }, [slug, BASE_URL, navigate]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">🔄 Carregando página do afiliado...</div>
    );
  }

  if (!link) {
    return (
      <div className="p-6 text-center text-red-600">
        ❌ Produto não encontrado ou expirado.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow text-center">
      <h1 className="text-2xl font-bold mb-2 text-blue-700">{link.title}</h1>
      <p className="mb-4 text-gray-700">{link.description}</p>

      <p className="text-lg font-semibold text-green-600 mb-6">
        Valor: Kz {parseFloat(link.amount).toLocaleString()}
      </p>

      <a
        href={`/pagar/${link.slug}?ref=${link.afiliadoId}`}
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg transition duration-200"
      >
        🛒 Comprar Agora
      </a>

      <p className="mt-6 text-sm text-gray-500">
        Este link já teve <strong>{link.clicksAfiliado || 0}</strong> cliques
      </p>
    </div>
  );
}
