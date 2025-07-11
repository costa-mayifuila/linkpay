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
        headers: { Authorization: `Bearer ${token}` }
      });

      setDados(res.data);
      setErro(""); // limpa erros anteriores
    } catch (err) {
      console.error("Erro ao carregar extrato:", err);
      setErro("Erro ao carregar o extrato financeiro.");
      setDados(null);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const filtrar = (e) => {
    e.preventDefault();
    carregar();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Extrato Financeiro</h2>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      {!dados && !erro && <p className="text-gray-500">Carregando extrato...</p>}

      {dados && (
        <>
          <form onSubmit={filtrar} className="mb-6 flex flex-col md:flex-row gap-4 items-center">
            <input
              type="date"
              value={de}
              onChange={(e) => setDe(e.target.value)}
              className="border px-4 py-2 rounded"
            />
            <input
              type="date"
              value={ate}
              onChange={(e) => setAte(e.target.value)}
              className="border px-4 py-2 rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Filtrar
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card titulo="Saldo Disponível" valor={`Kz ${dados.saldoDisponivel.toLocaleString()}`} />
            <Card titulo="Recebido por Vendas" valor={`Kz ${dados.totalRecebidoVendas.toLocaleString()}`} />
            <Card titulo="Comissões Recebidas" valor={`Kz ${dados.totalComissoes.toLocaleString()}`} />
            <Card titulo="Total Sacado" valor={`Kz ${dados.totalSacado.toLocaleString()}`} />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Vendas</h3>
            <ul className="space-y-2">
              {dados.ultimasVendas.map((v) => (
                <li key={v._id} className="border p-3 rounded">
                  <p>
                    <strong>{v.title}</strong> - Kz {v.recebidoLiquido}
                  </p>
                  <p className="text-sm text-gray-600">{new Date(v.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Comissões</h3>
            <ul className="space-y-2">
              {dados.ultimasComissoes.map((c) => (
                <li key={c._id} className="border p-3 rounded">
                  <p>
                    <strong>{c.title}</strong> - Kz {c.valorAfiliado}
                  </p>
                  <p className="text-sm text-gray-600">{new Date(c.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

const Card = ({ titulo, valor }) => (
  <div className="bg-white shadow p-4 rounded border">
    <h3 className="text-lg font-semibold">{titulo}</h3>
    <p className="text-xl">{valor}</p>
  </div>
);
