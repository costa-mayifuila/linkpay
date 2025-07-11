import React from "react";

export default function SolucoesPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Nossas Soluções</h1>
      <p className="text-gray-700 mb-6">
        A LinkPay oferece soluções simples e poderosas para facilitar pagamentos via Multicaixa Express,
        geração de links, e acompanhamento de comissões. Veja o que oferecemos:
      </p>

      <ul className="space-y-4">
        <li className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-xl font-semibold">💸 Link de Pagamento</h2>
          <p className="text-gray-600">Gere links de cobrança personalizados com taxa automática.</p>
        </li>
        <li className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-xl font-semibold">🤝 Sistema de Afiliados</h2>
          <p className="text-gray-600">Permita que parceiros divulguem seus produtos e ganhem comissão.</p>
        </li>
        <li className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-xl font-semibold">📊 Dashboards em tempo real</h2>
          <p className="text-gray-600">Visualize suas vendas, saques, cliques e conversões.</p>
        </li>
      </ul>
    </div>
  );
}
