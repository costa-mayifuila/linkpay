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

    axios.get(url)
      .then(res => {
        setLink(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate("/erro");
      });
  }, [slug, BASE_URL, navigate]);

  if (loading) return <div className="p-6">Carregando página do afiliado...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-2">{link.title}</h1>
      <p className="mb-4">{link.description}</p>
      <p className="text-gray-600">Valor: <strong>Kz {link.amount}</strong></p>
      <a
        href={`/pagar/${link.slug}?ref=${link.afiliadoId}`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        Comprar Agora
      </a>
      <p className="mt-6 text-sm text-gray-500">Este link já teve {link.clicksAfiliado || 0} cliques</p>
    </div>
  );
}
