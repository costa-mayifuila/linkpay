import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function AfiliadoDashboard() {
  const [dados, setDados] = useState(null);
  const token = localStorage.getItem("token");

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/afiliados/estatisticas`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDados(res.data))
      .catch((err) =>
        console.error("Erro ao buscar estatísticas do afiliado:", err)
      );
  }, [BASE_URL]);

  if (!dados) return <div className="p-6">🔄 Carregando dados...</div>;

  const labels = Object.keys(dados.grafico);
  const valores = Object.values(dados.grafico);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Ganhos Diários (Kz)",
        data: valores,
        backgroundColor: "#10B981", // Verde
      },
    ],
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        💼 Painel do Afiliado
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <Card
          titulo="Comissões Recebidas"
          valor={`Kz ${dados.totalComissao.toLocaleString()}`}
        />
        <Card
          titulo="Vendas por Indicação"
          valor={dados.totalLinksAfiliado}
        />
      </div>

      <div className="bg-white border border-gray-200 shadow-md p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          📈 Gráfico de Ganhos
        </h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

const Card = ({ titulo, valor }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
    <h3 className="text-sm text-gray-500 uppercase mb-1">{titulo}</h3>
    <p className="text-2xl font-bold text-green-600">{valor}</p>
  </div>
);
