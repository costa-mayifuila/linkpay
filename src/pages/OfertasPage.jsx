import React from "react";
import axios from "axios";

const planos = [
  {
    nome: "Plano Básico",
    preco: 750,
    chave: "basico",
    descricao: "Ideal para começar",
    beneficios: [
      "Até 2 links por semana",
      "Relatórios simples",
      "Comissão padrão de 10%",
    ],
  },
  {
    nome: "Plano Ouro",
    preco: 5750,
    chave: "ouro",
    descricao: "Para quem já vende mais",
    beneficios: [
      "Links ilimitados",
      "Exportação PDF e Excel",
      "Comissão aumentada para 15%",
      "Prioridade no suporte",
    ],
  },
  {
    nome: "Plano Premium",
    preco: 11750,
    chave: "premium",
    descricao: "Profissional e completo",
    beneficios: [
      "Tudo do plano Ouro",
      "Notificações por WhatsApp",
      "Dashboard avançado",
      "Saque prioritário",
    ],
  },
];

export default function OfertasPage() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const adquirirPlano = async (planoChave) => {
    if (!token) {
      alert("Você precisa estar logado para assinar um plano.");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/payment/solicitar-token-plano`,
        { plano: planoChave },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      window.location.href = res.data.frameUrl;
    } catch (err) {
      console.error("Erro ao iniciar pagamento:", err.response?.data || err.message);
      alert("Erro ao iniciar pagamento.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">📦 Escolha seu Plano</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {planos.map((plano, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md border rounded-xl p-6 text-center"
          >
            <h2 className="text-xl font-bold text-blue-600 mb-2">{plano.nome}</h2>
            <p className="text-gray-500 mb-2">{plano.descricao}</p>
            <p className="text-3xl font-bold text-green-600 mb-4">
              Kz {plano.preco.toLocaleString()}
            </p>

            <ul className="text-left mb-6 space-y-1">
              {plano.beneficios.map((b, i) => (
                <li key={i} className="text-sm">✅ {b}</li>
              ))}
            </ul>

            <button
              onClick={() => adquirirPlano(plano.chave)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Assinar agora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
