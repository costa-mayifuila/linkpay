import { Navigate } from "react-router-dom";

// Componente que protege rotas privadas
const ProtectedRoute = ({ children, role }) => {
  let user = null;

  try {
    const raw = localStorage.getItem("user");

    // Garante que o conteúdo seja válido antes de parsear
    if (raw && raw !== "undefined") {
      user = JSON.parse(raw);
    }
  } catch (error) {
    console.error("❌ Erro ao acessar o usuário do localStorage:", error);
  }

  // Redireciona se não estiver autenticado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redireciona se a role for exigida e não coincidir
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Autorizado
  return children;
};

export default ProtectedRoute;
