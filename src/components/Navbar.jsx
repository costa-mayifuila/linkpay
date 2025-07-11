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
      axios.get(`${BASE_URL}/api/perfil/me`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setUser(res.data)).catch(() => {});
    }
  }, []);

  if (!token) return null;

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      location.pathname.startsWith(path)
        ? "bg-blue-100 text-blue-700 font-semibold shadow-lg"
        : "hover:bg-blue-500 hover:text-white text-gray-700"
    }`;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r shadow-lg fixed top-0 left-0 z-40">
      {/* Logo */}
      <div className="py-5 border-b text-center bg-blue-600 text-white">
        <Link to="/" className="text-2xl font-bold tracking-wide">💸 LinkPay</Link>
      </div>

      {/* Navegação */}
      <nav className="flex-1 flex flex-col gap-2 mt-4 px-2 text-sm overflow-y-auto">

        {/* Painel Geral */}
        <span className="text-xs text-gray-500 uppercase px-4 mt-4">Painel Geral</span>
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          <FaTachometerAlt /> Dashboard
        </Link>

        {/* Links de Pagamento */}
        <span className="text-xs text-gray-500 uppercase px-4 mt-4">Links de Pagamento</span>
        <Link to="/painel" className={linkClass("/painel")}>
          <FaLink /> Meus Links
        </Link>
        <Link to="/extrato" className={linkClass("/extrato")}>
          <FaWallet /> Extrato
        </Link>

        {/* Seção Afiliado */}
        {user?.tipo === "afiliado" && (
          <>
            <span className="text-xs text-gray-500 uppercase px-4 mt-4">Afiliado</span>
            <Link to="/afiliado/dashboard" className={linkClass("/afiliado/dashboard")}>
              <FaChartBar /> Painel Afiliado
            </Link>
            <Link to="/afiliado/saques" className={linkClass("/afiliado/saques")}>
              <FaWallet /> Saques Afiliado
            </Link>
          </>
        )}

        {/* Seção Administração */}
        {user?.isAdmin && (
          <>
            <span className="text-xs text-gray-500 uppercase px-4 mt-4">Administração</span>
            <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
              <FaShieldAlt /> Admin Dashboard
            </Link>
            <Link to="/admin/saques" className={linkClass("/admin/saques")}>
              <FaUserCheck /> Aprovar Saques
            </Link>
          </>
        )}

        {/* Seção Conta */}
        <span className="text-xs text-gray-500 uppercase px-4 mt-4">Conta</span>
        <Link to="/perfil" className={linkClass("/perfil")}>
          <FaUser /> Perfil
        </Link>
        <Link to="/suporte" className={linkClass("/suporte")}>
          <FaHeadset /> Suporte
        </Link>
        <button
          onClick={logout}
          className="text-red-600 hover:bg-red-100 hover:text-red-700 flex items-center gap-2 px-4 py-2 mt-4 rounded-xl transition-all"
        >
          <FaSignOutAlt /> Sair
        </button>
      </nav>
    </aside>
  );
}
