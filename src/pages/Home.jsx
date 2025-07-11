import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Gere links de pagamento com Multicaixa Express
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Crie links de cobrança de forma simples e profissional. Receba pagamentos por MCX de qualquer lugar com facilidade.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Criar Conta
          </Link>
          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 hover:bg-blue-100 font-semibold px-6 py-3 rounded-xl transition"
          >
            Já tenho conta
          </Link>
        </div>
      </section>

      {/* Benefícios */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Rápido</h3>
          <p className="text-sm text-gray-600">
            Gere um link de pagamento em segundos, compartilhe no WhatsApp, TikTok ou Instagram.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Seguro</h3>
          <p className="text-sm text-gray-600">
            Os pagamentos são processados diretamente pela EMIS via Multicaixa Express.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Automático</h3>
          <p className="text-sm text-gray-600">
            Notificações e confirmação automática de pagamento com painel completo.
          </p>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} LinkPay. Todos os direitos reservados.
      </footer>
    </div>
  );
}
