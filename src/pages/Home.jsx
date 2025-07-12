import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Gere links de pagamento com <span className="text-blue-600">Multicaixa Express</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Crie cobranças profissionais com LinkPay. Receba pagamentos de qualquer lugar, com segurança e rapidez, direto pelo seu link.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
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
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <Beneficio
          titulo="Rápido"
          texto="Gere um link de pagamento em segundos e compartilhe por WhatsApp, TikTok ou Instagram."
        />
        <Beneficio
          titulo="Seguro"
          texto="Os pagamentos são processados diretamente pela EMIS usando a Multicaixa Express."
        />
        <Beneficio
          titulo="Automático"
          texto="Confirmação automática de pagamento e notificações em tempo real no seu painel."
        />
      </section>

      {/* Rodapé */}
      <footer className="text-center py-8 text-gray-500 text-sm border-t border-blue-100">
        &copy; {new Date().getFullYear()} LinkPay. Todos os direitos reservados.
      </footer>
    </div>
  );
}

const Beneficio = ({ titulo, texto }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 text-center">
    <h3 className="text-xl font-bold text-blue-600 mb-2">{titulo}</h3>
    <p className="text-sm text-gray-600">{texto}</p>
  </div>
);
