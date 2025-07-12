import React from "react";

export default function EmpresaPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
        Sobre a LinkPay
      </h1>

      <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
        <p>
          A <strong className="text-blue-700">LinkPay</strong> nasceu com o propósito de facilitar a forma como os angolanos cobram e recebem pagamentos digitais, com foco especial no sistema{" "}
          <strong className="text-green-700">Multicaixa Express (EMIS)</strong>.
        </p>

        <p>
          Nosso objetivo é democratizar o acesso à tecnologia de cobrança, permitindo que qualquer pessoa — seja
          empreendedor, empresa ou afiliado — possa emitir links de pagamento, acompanhar suas vendas e expandir seus
          negócios com praticidade, transparência e segurança.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🎯 Nossa Missão</h2>
        <p className="text-gray-700 text-base">
          Empoderar vendedores e afiliados com tecnologia de cobrança acessível, eficiente e segura.
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🌍 Nossa Visão</h2>
        <p className="text-gray-700 text-base">
          Ser a principal solução de pagamento digital por link em Angola — e referência em toda a África.
        </p>
      </div>
    </div>
  );
}
