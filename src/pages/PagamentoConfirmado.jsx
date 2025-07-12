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
      } catch (err) {
        setStatus("erro");
      } finally {
        setLoading(false);
      }
    };

    buscarStatus();
  }, [slug, BASE_URL]);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-600">
        ⏳ Verificando status do pagamento...
      </div>
    );

  const Card = ({ emoji, title, message, color }) => (
    <div className={`p-6 max-w-md mx-auto bg-white shadow rounded text-center border-t-4 border-${color}-500`}>
      <div className={`text-${color}-600 text-5xl mb-4`}>{emoji}</div>
      <h1 className="text-2xl font-bold mb-2 text-gray-800">{title}</h1>
      <p className="text-gray-700">{message}</p>
      {link?.slug && (
        <p className="mt-3 text-sm text-gray-500">
          Referência: <strong>{link.slug}</strong>
        </p>
      )}
    </div>
  );

  if (status === "pago") {
    return (
      <Card
        emoji="✅"
        title="Pagamento Confirmado"
        message="Recebemos seu pagamento com sucesso!"
        color="green"
      />
    );
  }

  if (status === "aguardando") {
    return (
      <Card
        emoji="⌛"
        title="Pagamento Pendente"
        message="Ainda não recebemos a confirmação do pagamento. Verifique novamente mais tarde."
        color="yellow"
      />
    );
  }

  return (
    <Card
      emoji="❌"
      title="Erro na Verificação"
      message="Ocorreu um problema ao verificar o status do pagamento. Tente novamente mais tarde ou entre em contato com o suporte."
      color="red"
    />
  );
}
