import React, { useEffect, useState } from "react";
import axios from "axios";
import CriarLink from "../components/CriarLink";
import { QRCodeCanvas } from "qrcode.react";

export default function MeusLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL;
  const SITE_URL = import.meta.env.VITE_PUBLIC_SITE_URL;
  const token = localStorage.getItem("token");

  const fetchLinks = async (pagina = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/links/me?page=${pagina}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLinks(res.data.links || []);
      setPage(res.data.page || 1);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Erro ao buscar links:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks(1);
  }, []);

  const deletarLink = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este link?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/links/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLinks(page);
    } catch (err) {
      alert("Erro ao excluir link.");
      console.error("Erro ao excluir link:", err);
    }
  };

  const editarLink = async (link) => {
    const novoTitulo = prompt("Novo título:", link.title);
    const novoValor = prompt("Novo valor:", link.amount);
    if (!novoTitulo || !novoValor) return;

    try {
      const res = await axios.put(
        `${BASE_URL}/api/links/${link._id}`,
        { title: novoTitulo, amount: parseFloat(novoValor) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const atualizados = links.map((l) =>
        l._id === link._id ? res.data.link : l
      );
      setLinks(atualizados);
    } catch (err) {
      alert("Erro ao atualizar link.");
      console.error("Erro ao atualizar link:", err);
    }
  };

  const anterior = () => {
    if (page > 1) fetchLinks(page - 1);
  };

  const proximo = () => {
    if (page < totalPages) fetchLinks(page + 1);
  };

  const totalRecebido = links.reduce((acc, l) => acc + (l.recebidoLiquido || 0), 0);
  const totalValor = links.reduce((acc, l) => acc + (l.amount || 0), 0);
  const totalComissao = totalValor - totalRecebido;

  const linksFiltrados = links.filter((link) => {
    const correspondeBusca = link.title.toLowerCase().includes(busca.toLowerCase());
    const correspondeStatus = filtroStatus === "" || link.status === filtroStatus;
    return correspondeBusca && correspondeStatus;
  });

  if (loading) return <div className="p-6">🔄 Carregando seus links...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">💼 Meus Links de Pagamento</h1>

      <CriarLink onLinkCriado={() => fetchLinks(page)} />

      {/* Filtros */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="🔍 Buscar por título"
          className="border px-4 py-2 rounded w-full md:w-1/2"
        />
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        >
          <option value="">Todos os status</option>
          <option value="aguardando">Aguardando</option>
          <option value="pago">Pago</option>
          <option value="expirado">Expirado</option>
        </select>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-white">
        <div className="bg-blue-600 p-4 rounded shadow">
          <p className="text-sm">Total em Links</p>
          <h3 className="text-xl font-bold">Kz {totalValor.toLocaleString()}</h3>
        </div>
        <div className="bg-green-600 p-4 rounded shadow">
          <p className="text-sm">Recebido líquido</p>
          <h3 className="text-xl font-bold">Kz {totalRecebido.toLocaleString()}</h3>
        </div>
        <div className="bg-yellow-600 p-4 rounded shadow">
          <p className="text-sm">Taxa da plataforma</p>
          <h3 className="text-xl font-bold">Kz {totalComissao.toLocaleString()}</h3>
        </div>
      </div>

      {/* Lista */}
      {linksFiltrados.length === 0 ? (
        <p className="text-gray-600 italic">Nenhum link encontrado com os filtros atuais.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {linksFiltrados.map((link) => {
              const urlDoLink = `${SITE_URL}/pagar/${link.slug}`;
              return (
                <li key={link._id} className="border border-gray-300 rounded-lg shadow-md p-4 bg-white">
                  <h2 className="text-xl font-semibold text-gray-800">{link.title}</h2>
                  <p className="text-gray-700">💰 Valor: Kz {parseFloat(link.amount).toLocaleString()}</p>
                  <p>Status: <span className="font-semibold">{link.status}</span></p>
                  <p>Comissão: {link.comissaoPercentual || 0}%</p>
                  <p>Recebido líquido: <strong>Kz {parseFloat(link.recebidoLiquido || 0).toLocaleString()}</strong></p>
                  <p className="text-sm text-gray-500">Criado em: {new Date(link.createdAt).toLocaleString()}</p>

                  {/* Compartilhamento */}
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      🔗 Link:
                      <span className="ml-2 font-mono text-blue-700">{urlDoLink}</span>
                    </p>

                    <div className="flex gap-2 mt-2 flex-wrap">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(urlDoLink);
                          alert("Link copiado para a área de transferência!");
                        }}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                      >📋 Copiar Link</button>

                      <a href={`https://wa.me/?text=Veja esse link de pagamento: ${urlDoLink}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm">🟢 WhatsApp</a>
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${urlDoLink}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">🔵 Facebook</a>
                      <a href={`https://t.me/share/url?url=${urlDoLink}&text=Confira esse link de pagamento`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-400 hover:bg-blue-500 text-white rounded text-sm">✈️ Telegram</a>
                      <a href={`https://twitter.com/intent/tweet?text=Link%20de%20pagamento%20via%20LinkPay:%20${urlDoLink}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded text-sm">🐦 Twitter</a>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-700 mb-1">📱 QR Code do link:</p>
                      <QRCodeCanvas value={urlDoLink} size={128} />
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button onClick={() => editarLink(link)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">✏️ Editar</button>
                    <button onClick={() => deletarLink(link._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">🗑️ Excluir</button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Paginação */}
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={anterior} disabled={page <= 1} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50">⬅️ Anterior</button>
            <span className="px-4 py-2 text-gray-700 font-medium">Página {page} de {totalPages}</span>
            <button onClick={proximo} disabled={page >= totalPages} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50">Próxima ➡️</button>
          </div>
        </>
      )}
    </div>
  );
}
