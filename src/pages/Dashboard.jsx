import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function Dashboard() {
  const [dados, setDados] = useState(null);
  const token = localStorage.getItem("token");

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setDados(res.data))
      .catch(() => {});
  }, [BASE_URL]);

  if (!dados) return <div className="p-6">Carregando dados...</div>;

  const labels = Object.keys(dados.grafico);
  const valores = Object.values(dados.grafico);

  const chartData = {
    labels,
    datasets: [{
      label: "Kz Recebido por Dia",
      data: valores,
      backgroundColor: "#3B82F6",
    }]
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Resumo</h2>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow p-4 rounded border">
          <h3 className="text-lg font-semibold">Links Criados</h3>
          <p className="text-xl">{dados.totalLinks}</p>
        </div>
        <div className="bg-white shadow p-4 rounded border">
          <h3 className="text-lg font-semibold">Links Pagos</h3>
          <p className="text-xl">{dados.totalPagos}</p>
        </div>
        <div className="bg-white shadow p-4 rounded border">
          <h3 className="text-lg font-semibold">Total Recebido</h3>
          <p className="text-xl text-green-600">Kz {dados.totalRecebido.toLocaleString()}</p>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white shadow p-4 rounded border">
        <h3 className="text-lg font-semibold mb-4">Gráfico - Últimos 7 dias</h3>
        <Bar data={chartData} />
      </div>

      {/* Botões de Exportação */}
      <div className="flex gap-4 mt-6">
        <a
          href={`${BASE_URL}/api/relatorios/pdf`}
          target="_blank"
          rel="noreferrer"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Baixar PDF
        </a>
        <a
          href={`${BASE_URL}/api/relatorios/excel`}
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Baixar Excel
        </a>
      </div>
    </div>
  );
}
