import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const token = localStorage.getItem("token");

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="bg-blue-600 text-white w-full px-4 md:px-10 py-4 flex justify-between items-center shadow-md z-50 relative">
      {/* Logo */}
      <Link to="/" className="text-2xl md:text-3xl font-bold text-white hover:text-gray-300">
        LinkPay
      </Link>

      {/* Menu Desktop */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link to="/solucoes" className="hover:text-gray-200 transition">Soluções</Link>
        <Link to="/empresa" className="hover:text-gray-200 transition">Empresa</Link>
        <Link to="/planos" className="hover:text-gray-200 transition">Planos</Link>
        <Link to="/suporte" className="hover:text-gray-200 transition">Ajuda</Link>
      </nav>

      {/* Auth Desktop */}
      <div className="hidden md:flex items-center gap-5">
        {!token ? (
          <>
            <Link to="/login" className="text-gray-100 hover:text-white text-sm transition">Entrar</Link>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition"
            >
              CRIE SUA CONTA
            </Link>
          </>
        ) : (
          <button onClick={logout} className="text-sm text-red-300 hover:text-white transition">
            Sair
          </button>
        )}
      </div>

      {/* Botão Mobile */}
      <button className="md:hidden text-white" onClick={toggleMenu}>
        {menuAberto ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t z-50 md:hidden transition-all">
          <div className="flex flex-col px-6 py-5 text-gray-800 text-sm gap-4">
            <Link to="/solucoes" onClick={fecharMenu} className="hover:text-blue-600">Soluções</Link>
            <Link to="/empresa" onClick={fecharMenu} className="hover:text-blue-600">Empresa</Link>
            <Link to="/planos" onClick={fecharMenu} className="hover:text-blue-600">Planos</Link>
            <Link to="/suporte" onClick={fecharMenu} className="hover:text-blue-600">Ajuda</Link>

            {!token ? (
              <>
                <Link to="/login" onClick={fecharMenu} className="hover:text-blue-600">Entrar</Link>
                <Link
                  to="/register"
                  onClick={fecharMenu}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-full transition"
                >
                  CRIE SUA CONTA
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  fecharMenu();
                  logout();
                }}
                className="text-left text-red-500 hover:text-red-700"
              >
                Sair
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
