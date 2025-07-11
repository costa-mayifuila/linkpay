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

      // Redirecionar o usuário para o WebFrame da EMIS
      window.location.href = res.data.frameUrl;
    } catch (err) {
      console.error("Erro ao iniciar pagamento do plano:", err);
      alert("Erro ao iniciar pagamento do plano.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Escolha seu Plano</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { nome: "Básico", valor: 750, key: "basico" },
          { nome: "Ouro", valor: 5750, key: "ouro" },
          { nome: "Premium", valor: 11750, key: "premium" },
        ].map((p) => (
          <div key={p.key} className="border p-4 rounded shadow text-center">
            <h2 className="text-xl font-semibold">{p.nome}</h2>
            <p className="text-lg mb-2">Kz {p.valor.toLocaleString()}</p>
            <button
              onClick={() => adquirirPlano(p.key)}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Adquirir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
