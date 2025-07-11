// Header.jsx
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
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold text-white hover:text-gray-300">
         LinkPay
      </Link>

      {/* Menu Desktop */}
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <Link to="/solucoes" className="hover:text-gray-300">Soluções</Link>
        <Link to="/empresa" className="hover:text-gray-300">Empresa</Link>
        <Link to="/planos" className="hover:text-gray-300">Planos</Link>
        <Link to="/suporte" className="hover:text-gray-300">Ajuda</Link>
      </nav>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center gap-4">
        {!token ? (
          <>
            <Link to="/login" className="text-sm text-gray-200 hover:text-white">Entrar</Link>
            <Link
              to="/register"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              CRIE SUA CONTA
            </Link>
          </>
        ) : (
          <button onClick={logout} className="text-red-600 text-sm hover:underline">Sair</button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={toggleMenu}>
        {menuAberto ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuAberto && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md border-t z-40 md:hidden">
          <div className="flex flex-col p-4 text-sm gap-3 text-gray-700">
            <Link to="/solucoes" onClick={fecharMenu}>Soluções</Link>
            <Link to="/empresa" onClick={fecharMenu}>Empresa</Link>
            <Link to="/planos" onClick={fecharMenu}>Planos</Link>
            <Link to="/suporte" onClick={fecharMenu}>Ajuda</Link>

            {!token ? (
              <>
                <Link to="/login" onClick={fecharMenu}>Entrar</Link>
                <Link
                  to="/register"
                  onClick={fecharMenu}
                  className="bg-blue-600 text-white text-center px-4 py-2 rounded"
                >
                  CRIE SUA CONTA
                </Link>
              </>
            ) : (
              <button onClick={logout} className="text-red-600 text-left">
                Sair
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
