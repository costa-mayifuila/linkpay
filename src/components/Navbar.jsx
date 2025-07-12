import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt, FaLink, FaWallet, FaUser, FaHeadset, FaSignOutAlt,
  FaChartBar, FaShieldAlt, FaUserCheck
} from "react-icons/fa";
import axios from "axios";

export default function Navbar() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (token) {
      axios
        .get(`${BASE_URL}/api/perfil/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {});
    }
  }, []);

  if (!token) return null;

  const isActive = (path) => location.pathname.startsWith(path);

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive(path)
        ? "bg-blue-100 text-blue-700 font-semibold shadow-inner"
        : "text-gray-700 hover:bg-blue-500 hover:text-white"
    }`;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200 shadow-md fixed top-0 left-0 z-40">
      {/* Logo */}
      <div className="py-5 bg-blue-600 text-white text-center border-b border-blue-700 shadow">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          💸 LinkPay
        </Link>
      </div>

      {/* Navegação */}
      <nav className="flex-1 flex flex-col gap-2 mt-4 px-2 text-sm overflow-y-auto">

        {/* Painel Geral */}
        <div className="text-xs text-gray-500 uppercase px-4 mt-3 mb-1">Painel Geral</div>
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          <FaTachometerAlt /> Dashboard
        </Link>

        {/* Links de Pagamento */}
        <div className="text-xs text-gray-500 uppercase px-4 mt-4 mb-1">Links de Pagamento</div>
        <Link to="/painel" className={linkClass("/painel")}>
          <FaLink /> Meus Links
        </Link>
        <Link to="/extrato" className={linkClass("/extrato")}>
          <FaWallet /> Extrato
        </Link>

        {/* Seção Afiliado */}
        {user?.tipo === "afiliado" && (
          <>
            <div className="text-xs text-gray-500 uppercase px-4 mt-4 mb-1">Afiliado</div>
            <Link to="/afiliado/dashboard" className={linkClass("/afiliado/dashboard")}>
              <FaChartBar /> Painel Afiliado
            </Link>
            <Link to="/afiliado/saques" className={linkClass("/afiliado/saques")}>
              <FaWallet /> Saques Afiliado
            </Link>
          </>
        )}

        {/* Seção Admin */}
        {user?.isAdmin && (
          <>
            <div className="text-xs text-gray-500 uppercase px-4 mt-4 mb-1">Administração</div>
            <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
              <FaShieldAlt /> Admin Dashboard
            </Link>
            <Link to="/admin/saques" className={linkClass("/admin/saques")}>
              <FaUserCheck /> Aprovar Saques
            </Link>
          </>
        )}

        {/* Conta */}
        <div className="text-xs text-gray-500 uppercase px-4 mt-4 mb-1">Conta</div>
        <Link to="/perfil" className={linkClass("/perfil")}>
          <FaUser /> Perfil
        </Link>
        <Link to="/suporte" className={linkClass("/suporte")}>
          <FaHeadset /> Suporte
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-3 mt-5 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-xl transition-colors"
        >
          <FaSignOutAlt /> Sair
        </button>
      </nav>
    </aside>
  );
}
