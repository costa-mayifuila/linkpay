import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PagamentoPage() {
  const { slug } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [afiliadoId, setAfiliadoId] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    setAfiliadoId(ref); // guarda o ID do afiliado, se houver

    const url = ref
      ? `${BASE_URL}/api/links/publico/${slug}?ref=${ref}`
      : `${BASE_URL}/api/links/${slug}`;

    axios
      .get(url)
      .then((res) => {
        setLink(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLink(null);
        setLoading(false);
      });
  }, [slug, BASE_URL]);

  if (loading) return <div className="p-6">🔄 Carregando...</div>;
  if (!link) return <div className="p-6 text-red-600">❌ Link inválido ou expirado</div>;

  const iniciarPagamento = async () => {
    try {
      const payload = {
        reference: link.slug || slug,
        amount: link.amount,
      };

      if (afiliadoId) {
        payload.afiliadoId = afiliadoId;
      }

      console.log("Enviando para /solicitar-token:", payload);

      const response = await axios.post(`${BASE_URL}/api/payment/solicitar-token`, payload);

      const { frameUrl } = response.data;
      window.location.href = frameUrl;
    } catch (error) {
      console.error("Erro ao solicitar token:", error.response?.data || error.message);
      alert("Erro ao iniciar pagamento. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{link.title}</h1>
      <p className="mb-2">{link.description}</p>
      <p className="text-xl text-green-600 font-semibold mb-4">
        Valor: Kz {parseFloat(link.amount).toLocaleString()}
      </p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={iniciarPagamento}
      >
        Pagar com Multicaixa Express
      </button>
    </div>
  );
}
