import React from "react";
import axios from "axios";

export default function Planos() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const adquirirPlano = async (plano) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/payment/solicitar-token-plano`,
        { plano },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.location.href = res.data.frameUrl;
    } catch (err) {
      console.error("Erro ao iniciar pagamento do plano:", err);
      alert("Erro ao iniciar pagamento do plano.");
    }
  };

  const planos = [
    {
      nome: "Básico",
      valor: 750,
      key: "basico",
      cor: "bg-gray-100",
      destaque: false,
    },
    {
      nome: "Ouro",
      valor: 5750,
      key: "ouro",
      cor: "bg-yellow-100",
      destaque: true,
    },
    {
      nome: "Premium",
      valor: 11750,
      key: "premium",
      cor: "bg-purple-100",
      destaque: false,
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">📦 Escolha seu Plano</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {planos.map((p) => (
          <div
            key={p.key}
            className={`${p.cor} rounded-xl shadow-md p-6 text-center border ${
              p.destaque ? "border-yellow-400" : "border-gray-300"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{p.nome}</h2>
            <p className="text-3xl font-semibold text-green-600 mb-4">
              Kz {p.valor.toLocaleString()}
            </p>

            <ul className="mb-6 text-left text-sm text-gray-700 space-y-1">
              {p.key === "basico" && (
                <>
                  <li>✅ Até 2 links por semana</li>
                  <li>✅ Relatórios simples</li>
                  <li>✅ Comissão de 10%</li>
                </>
              )}
              {p.key === "ouro" && (
                <>
                  <li>✅ Links ilimitados</li>
                  <li>✅ Exportação em PDF e Excel</li>
                  <li>✅ Comissão de 15%</li>
                  <li>✅ Prioridade no suporte</li>
                </>
              )}
              {p.key === "premium" && (
                <>
                  <li>✅ Tudo do plano Ouro</li>
                  <li>✅ Notificações via WhatsApp</li>
                  <li>✅ Dashboard avançado</li>
                  <li>✅ Saques prioritários</li>
                </>
              )}
            </ul>

            <button
              onClick={() => adquirirPlano(p.key)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition duration-200"
            >
              Assinar Agora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
