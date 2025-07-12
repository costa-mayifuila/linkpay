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
    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">
        📦 Escolha seu Plano
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {planos.map((plano, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 flex flex-col items-center"
          >
            <h2 className="text-xl font-bold text-blue-600 mb-1">{plano.nome}</h2>
            <p className="text-gray-500 text-sm mb-3">{plano.descricao}</p>
            <p className="text-3xl font-extrabold text-green-600 mb-4">
              Kz {plano.preco?.toLocaleString() || 0}
            </p>

            <ul className="text-sm text-gray-700 mb-6 w-full space-y-1">
              {plano.beneficios.map((b, i) => (
                <li key={i}>✅ {b}</li>
              ))}
            </ul>

            <button
              onClick={() => adquirirPlano(plano.chave)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
            >
              Assinar agora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
