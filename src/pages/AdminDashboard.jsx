import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function AdminDashboard() {
  const [dados, setDados] = useState(null);
  const token = localStorage.getItem("token");

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setDados(res.data));
  }, [BASE_URL]);

  if (!dados) return <div className="p-6">Carregando...</div>;

  const labels = Object.keys(dados.grafico);
  const valores = Object.values(dados.grafico);

  const chartData = {
    labels,
    datasets: [{
      label: "Recebimentos por Dia (Kz)",
      data: valores,
      backgroundColor: "#2563EB"
    }]
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Painel Administrativo</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card titulo="Usuários Registrados" valor={dados.totalUsuarios} />
        <Card titulo="Links Criados" valor={dados.totalLinks} />
        <Card titulo="Total Recebido" valor={`Kz ${dados.totalRecebido.toLocaleString()}`} />
        <Card titulo="Comissões de Afiliados" valor={`Kz ${dados.totalComissaoAfiliados.toLocaleString()}`} />
        <Card titulo="Saques Solicitados" valor={dados.totalSaques} />
        <Card titulo="Valor Sacado" valor={`Kz ${dados.valorTotalSacado.toLocaleString()}`} />
      </div>

      <div className="bg-white shadow p-4 rounded border">
        <h3 className="text-lg font-semibold mb-4">Gráfico de Recebimentos</h3>
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
