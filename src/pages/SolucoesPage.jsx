import React from "react";

export default function SolucoesPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Nossas Soluções</h1>
      <p className="text-gray-700 mb-6 leading-relaxed">
        A <strong>LinkPay</strong> oferece soluções simples e poderosas para facilitar pagamentos via Multicaixa Express,
        geração de links de cobrança e acompanhamento de comissões em tempo real.
      </p>

      <ul className="space-y-6">
        <li className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-xl font-semibold mb-1">💸 Link de Pagamento</h2>
          <p className="text-gray-600">
            Gere links de cobrança personalizados com taxa automática e receba com praticidade via EMIS.
          </p>
        </li>
        <li className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-xl font-semibold mb-1">🤝 Sistema de Afiliados</h2>
          <p className="text-gray-600">
            Permita que parceiros promovam seus produtos e ganhem comissões por cada venda realizada.
          </p>
        </li>
        <li className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-xl font-semibold mb-1">📊 Dashboards em Tempo Real</h2>
          <p className="text-gray-600">
            Visualize suas vendas, saques, cliques e conversões com gráficos e métricas atualizadas.
          </p>
        </li>
      </ul>
    </div>
  );
}
