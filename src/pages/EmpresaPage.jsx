import React from "react";

export default function EmpresaPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Sobre a LinkPay</h1>
      <p className="text-gray-700 mb-4">
        A <strong>LinkPay</strong> nasceu para facilitar a forma como os angolanos cobram e recebem pagamentos digitais,
        especialmente usando o sistema Multicaixa Express (EMIS).
      </p>

      <p className="text-gray-700 mb-4">
        Nosso objetivo é permitir que qualquer pessoa, profissional ou empresa possa emitir links de pagamento,
        acompanhar suas vendas e expandir seus negócios com transparência e segurança.
      </p>

      <h2 className="text-xl font-semibold mt-6">Nossa Missão</h2>
      <p className="text-gray-700">Empoderar vendedores e afiliados com tecnologia de cobrança acessível.</p>

      <h2 className="text-xl font-semibold mt-6">Nossa Visão</h2>
      <p className="text-gray-700">Ser a principal solução de pagamento digital por link em Angola e África.</p>
    </div>
  );
}
