import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MinhaAssinatura() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/users/plano`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setDados(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [BASE_URL]);

  if (loading) return <div className="p-6">Carregando assinatura...</div>;

  const nomes = {
    basico: "Básico",
    ouro: "Ouro",
    premium: "Premium"
  };

  return (
    <div className="p-6 max-w-xl mx-auto border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Minha Assinatura</h2>
      <p><strong>Plano:</strong> {nomes[dados.plano]}</p>
      <p><strong>Links usados no mês:</strong> {dados.usados}</p>
      <p><strong>Validade até:</strong> {new Date(dados.validade).toLocaleDateString()}</p>

      <Link
        to="/planos"
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        Alterar Plano
      </Link>
    </div>
  );
}
