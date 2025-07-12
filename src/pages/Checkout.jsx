import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });

  // Simula carregamento dos dados do produto
  useEffect(() => {
    const valor = searchParams.get("valor");
    const descricao = searchParams.get("descricao");
    const ref = searchParams.get("ref");

    setPaymentDetails({
      valor: valor || "0",
      descricao: descricao || "Produto desconhecido",
      ref: ref || "",
    });
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Pagamento iniciado! Em breve integração com gateway real.");
    // Aqui você pode redirecionar para a EMIS, Stripe, etc.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white max-w-lg w-full p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          🛒 Finalizar Pagamento
        </h1>

        {paymentDetails && (
          <div className="mb-6 bg-gray-50 border p-4 rounded-lg text-sm text-gray-700">
            <p>
              <strong>Produto:</strong> {paymentDetails.descricao}
            </p>
            <p>
              <strong>Valor:</strong> Kz{" "}
              {parseFloat(paymentDetails.valor).toLocaleString()}
            </p>
            {paymentDetails.ref && (
              <p>
                <strong>Referência de Afiliado:</strong> {paymentDetails.ref}
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Seu nome completo"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Seu e-mail"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            placeholder="Seu número de telefone"
            value={form.telefone}
            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Pagar Agora
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Seus dados estão seguros com a LinkPay.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
