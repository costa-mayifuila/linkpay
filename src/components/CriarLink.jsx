import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CriarLink({ onLinkCriado }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [liquido, setLiquido] = useState(null);
  const [linkCriado, setLinkCriado] = useState(null); // <- novo

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const BASE_URL = import.meta.env.VITE_API_URL;
  const BASE_SITE = "https://linkpay-frontend.vercel.app/"; // substitua com seu domínio real

  const calcularLiquido = (plano, valor) => {
    let p = 0.04;
    if (plano === "ouro") p = 0.025;
    if (plano === "premium") p = 0.01;
    const taxaFixa = 0.5;
    const taxa = valor * p + taxaFixa;
    return valor - taxa;
  };

  useEffect(() => {
    if (amount && user?.plano) {
      const valor = parseFloat(amount);
      if (!isNaN(valor)) {
        const resultado = calcularLiquido(user.plano, valor);
        setLiquido(resultado.toFixed(2));
      } else {
        setLiquido(null);
      }
    } else {
      setLiquido(null);
    }
  }, [amount, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/api/links/criar`,
        { title, amount: parseFloat(amount) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const link = res.data.link; // ← pega o link com o slug
      setLinkCriado(`${BASE_SITE}/pagar/${link.slug}`);
      alert("✅ Link criado com sucesso!");
      setTitle("");
      setAmount("");
      setLiquido(null);
      if (onLinkCriado) onLinkCriado();
    } catch (err) {
      console.error("❌ Erro ao criar link:", err);
      alert("Erro ao criar link.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Criar Novo Link de Pagamento</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título do produto/serviço"
        className="w-full border px-4 py-2 rounded mb-3"
        required
      />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Valor (Kz)"
        className="w-full border px-4 py-2 rounded mb-3"
        required
      />

      {liquido && (
        <p className="text-sm text-green-600 mb-3">
          💰 Você receberá aproximadamente <strong>Kz {liquido}</strong> após as taxas.
        </p>
      )}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Criar Link
      </button>

      {linkCriado && (
        <div className="mt-4 bg-gray-100 p-3 rounded border">
          <p className="text-sm text-gray-700">🔗 Link gerado:</p>
          <a
            href={linkCriado}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {linkCriado}
          </a>
        </div>
      )}
    </form>
  );
}
