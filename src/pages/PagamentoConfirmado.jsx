import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PagamentoConfirmado() {
  const { slug } = useParams();
  const [status, setStatus] = useState(null);
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const buscarStatus = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/links/${slug}`);
        setLink(res.data);
        setStatus(res.data.status);
        setLoading(false);
      } catch (err) {
        setStatus("erro");
        setLoading(false);
      }
    };

    buscarStatus();
  }, [slug, BASE_URL]);

  if (loading) return <div className="p-6">Verificando status do pagamento...</div>;

  if (status === "pago") {
    return (
      <div className="p-6 text-center text-green-600">
        <h1 className="text-2xl font-bold mb-4">Pagamento Confirmado!</h1>
        <p>Recebemos seu pagamento com sucesso.</p>
        <p className="mt-2 text-sm">Referência: <strong>{link?.slug}</strong></p>
      </div>
    );
  }

  if (status === "aguardando") {
    return (
      <div className="p-6 text-center text-yellow-600">
        <h1 className="text-2xl font-bold mb-4">Pagamento Pendente</h1>
        <p>Ainda não recebemos a confirmação do pagamento.</p>
        <p className="mt-2 text-sm">Verifique novamente mais tarde.</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-center text-red-600">
      <h1 className="text-2xl font-bold mb-4">Erro ao verificar pagamento</h1>
      <p>Ocorreu um problema ao verificar a transação.</p>
    </div>
  );
}
