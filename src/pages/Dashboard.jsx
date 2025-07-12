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

export default function Dashboard() {
  const [dados, setDados] = useState(null);
  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDados(res.data))
      .catch((err) => console.error("Erro ao carregar dashboard:", err));
  }, [BASE_URL]);

  if (!dados)
    return <div className="p-6 text-gray-600">🔄 Carregando dados...</div>;

  const labels = Object.keys(dados.grafico);
  const valores = Object.values(dados.grafico);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Kz Recebido por Dia",
        data: valores,
        backgroundColor: "#3B82F6",
      },
    ],
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Resumo Geral</h2>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <Card titulo="Links Criados" valor={dados.totalLinks} />
        <Card titulo="Links Pagos" valor={dados.totalPagos} />
        <Card
          titulo="Total Recebido"
          valor={`Kz ${dados.totalRecebido.toLocaleString()}`}
          destaque="text-green-600"
        />
      </div>

      {/* Gráfico */}
      <div className="bg-white border border-gray-200 shadow-md p-6 rounded-xl mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          📈 Gráfico - Últimos 7 dias
        </h3>
        <Bar data={chartData} />
      </div>

      {/* Botões de exportação */}
      <div className="flex flex-wrap gap-4">
        <a
          href={`${BASE_URL}/api/relatorios/pdf`}
          target="_blank"
          rel="noreferrer"
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-lg transition-colors"
        >
          📄 Baixar PDF
        </a>
        <a
          href={`${BASE_URL}/api/relatorios/excel`}
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg transition-colors"
        >
          📊 Baixar Excel
        </a>
      </div>
    </div>
  );
}

// Card reutilizável
const Card = ({ titulo, valor, destaque }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
    <h3 className="text-sm text-gray-500 uppercase mb-1">{titulo}</h3>
    <p className={`text-2xl font-bold ${destaque || "text-blue-600"}`}>
      {valor}
    </p>
  </div>
);
