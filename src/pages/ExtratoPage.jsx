import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ExtratoPage() {
  const [dados, setDados] = useState(null);
  const [de, setDe] = useState("");
  const [ate, setAte] = useState("");
  const [erro, setErro] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL;

  const carregar = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErro("Usuário não autenticado.");
        return;
      }

      let url = `${BASE_URL}/api/extrato`;
      if (de || ate) {
        const params = new URLSearchParams();
        if (de) params.append("de", de);
        if (ate) params.append("ate", ate);
        url += "?" + params.toString();
      }

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDados(res.data);
      setErro("");
    } catch (err) {
      console.error("Erro ao carregar extrato:", err);
      setErro("Erro ao carregar o extrato financeiro.");
      setDados(null);
    }
  };

  useEffect(() => {
    carregar();
  }, [BASE_URL]);

  const filtrar = (e) => {
    e.preventDefault();
    carregar();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📑 Extrato Financeiro</h2>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      {!dados && !erro && <p className="text-gray-500">🔄 Carregando extrato...</p>}

      {dados && (
        <>
          {/* Filtro por data */}
          <form
            onSubmit={filtrar}
            className="mb-8 flex flex-col sm:flex-row gap-4 items-center"
          >
            <div className="flex flex-col w-full sm:w-auto">
              <label className="text-sm text-gray-600 mb-1">De:</label>
              <input
                type="date"
                value={de}
                onChange={(e) => setDe(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-lg"
              />
            </div>

            <div className="flex flex-col w-full sm:w-auto">
              <label className="text-sm text-gray-600 mb-1">Até:</label>
              <input
                type="date"
                value={ate}
                onChange={(e) => setAte(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg mt-4 sm:mt-6"
            >
              Filtrar
            </button>
          </form>

          {/* Cards de resumo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <Card
              titulo="Saldo Disponível"
              valor={`Kz ${dados.saldoDisponivel.toLocaleString()}`}
              destaque="text-green-600"
            />
            <Card
              titulo="Recebido por Vendas"
              valor={`Kz ${dados.totalRecebidoVendas.toLocaleString()}`}
            />
            <Card
              titulo="Comissões Recebidas"
              valor={`Kz ${dados.totalComissoes.toLocaleString()}`}
            />
            <Card
              titulo="Total Sacado"
              valor={`Kz ${dados.totalSacado.toLocaleString()}`}
              destaque="text-red-600"
            />
          </div>

          {/* Últimas Vendas */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🛒 Vendas Recentes
            </h3>
            <ul className="space-y-4">
              {dados.ultimasVendas.map((v) => (
                <li
                  key={v._id}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <p className="text-lg font-medium text-gray-800">
                    {v.title}
                  </p>
                  <p className="text-blue-600 font-bold">
                    Kz {parseFloat(v.recebidoLiquido).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(v.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Últimas Comissões */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🤝 Comissões Recebidas
            </h3>
            <ul className="space-y-4">
              {dados.ultimasComissoes.map((c) => (
                <li
                  key={c._id}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <p className="text-lg font-medium text-gray-800">
                    {c.title}
                  </p>
                  <p className="text-green-600 font-bold">
                    Kz {parseFloat(c.valorAfiliado).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(c.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

const Card = ({ titulo, valor, destaque }) => (
  <div className="bg-white border border-gray-200 shadow-sm p-5 rounded-xl hover:shadow-md transition-shadow">
    <h3 className="text-sm text-gray-500 uppercase mb-1">{titulo}</h3>
    <p className={`text-2xl font-bold ${destaque || "text-blue-600"}`}>
      {valor}
    </p>
  </div>
);
