import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function AfiliadoDashboard() {
  const [dados, setDados] = useState(null);
  const token = localStorage.getItem("token");

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/afiliados/estatisticas`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setDados(res.data));
  }, [BASE_URL]);

  if (!dados) return <div className="p-6">Carregando...</div>;

  const labels = Object.keys(dados.grafico);
  const valores = Object.values(dados.grafico);

  const chartData = {
    labels,
    datasets: [{
      label: "Ganhos Diários (Kz)",
      data: valores,
      backgroundColor: "#10B981"
    }]
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Painel do Afiliado</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card titulo="Comissões Recebidas" valor={`Kz ${dados.totalComissao.toLocaleString()}`} />
        <Card titulo="Vendas por Indicação" valor={dados.totalLinksAfiliado} />
      </div>

      <div className="bg-white shadow p-4 rounded border">
        <h3 className="text-lg font-semibold mb-4">Gráfico de Ganhos</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

const Card = ({ titulo, valor }) => (
  <div className="bg-white shadow p-4 rounded border">
    <h3 className="text-lg font-semibold">{titulo}</h3>
    <p className="text-xl">{valor}</p>
  </div>
);
