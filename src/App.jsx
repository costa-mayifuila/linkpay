import React from "react";
import { Routes, Route } from "react-router-dom";

// 📦 Componentes
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// 📦 Páginas públicas
import PagamentoPage from "./pages/PagamentoPage.jsx";
import PagamentoConfirmado from "./pages/PagamentoConfirmado.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import PaginaAfiliado from "./pages/PaginaAfiliado.jsx";
import AfiliadoLandingPage from "./pages/AfiliadoLandingPage.jsx";
import OfertasPage from "./pages/OfertasPage.jsx";
import SolucoesPage from "./pages/SolucoesPage.jsx";
import EmpresaPage from "./pages/EmpresaPage.jsx";

// 📦 Páginas protegidas (usuário comum)
import MeusLinks from "./pages/MeusLinks.jsx";
import MinhaAssinatura from "./pages/MinhaAssinatura.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SaquePage from "./pages/SaquePage.jsx";
import PerfilPage from "./pages/PerfilPage.jsx";
import ExtratoPage from "./pages/ExtratoPage.jsx";
import SuportePage from "./pages/SuportePage.jsx";

// 📦 Páginas protegidas (admin)
import AdminSaques from "./pages/AdminSaques.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

// 📦 Páginas protegidas (afiliado)
import AfiliadoPainel from "./pages/AfiliadoPainel.jsx";
import AfiliadoDashboard from "./pages/AfiliadoDashboard.jsx";
import AfiliadoSaquePage from "./pages/AfiliadoSaquePage.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Navbar />

      <main className="md:ml-64 min-h-screen bg-gray-50 p-4">
        <Routes>
          {/* 🌐 Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/pagar/:slug" element={<PagamentoPage />} />
          <Route path="/pagamento-confirmado/:slug" element={<PagamentoConfirmado />} />
          <Route path="/afiliado/:slug" element={<PaginaAfiliado />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/afiliado-page/:idAfiliado" element={<AfiliadoLandingPage />} />
          <Route path="/planos" element={<OfertasPage />} />
          <Route path="/solucoes" element={<SolucoesPage />} />
          <Route path="/empresa" element={<EmpresaPage />} />

          {/* 🔐 Usuário logado */}
          <Route path="/painel" element={<ProtectedRoute><MeusLinks /></ProtectedRoute>} />
          <Route path="/minha-assinatura" element={<ProtectedRoute><MinhaAssinatura /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/saques" element={<ProtectedRoute><SaquePage /></ProtectedRoute>} />
          <Route path="/perfil" element={<ProtectedRoute><PerfilPage /></ProtectedRoute>} />
          <Route path="/extrato" element={<ProtectedRoute><ExtratoPage /></ProtectedRoute>} />
          <Route path="/suporte" element={<ProtectedRoute><SuportePage /></ProtectedRoute>} />

          {/* 🛡️ Admin */}
          <Route path="/admin/saques" element={
            <ProtectedRoute role="admin">
              <AdminSaques />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* 🎯 Afiliado */}
          <Route path="/afiliado" element={
            <ProtectedRoute role="afiliado">
              <AfiliadoPainel />
            </ProtectedRoute>
          } />
          <Route path="/afiliado/dashboard" element={
            <ProtectedRoute role="afiliado">
              <AfiliadoDashboard />
            </ProtectedRoute>
          } />
          <Route path="/afiliado/saques" element={
            <ProtectedRoute role="afiliado">
              <AfiliadoSaquePage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </>
  );
}
