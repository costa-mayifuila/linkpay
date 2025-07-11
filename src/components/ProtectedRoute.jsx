import { Navigate } from "react-router-dom";

// Componente para proteger rotas
const ProtectedRoute = ({ children, role }) => {
  let user = null;

  try {
    const raw = localStorage.getItem("user");

    // Verifica se raw não está vazio, nulo ou a string "undefined"
    if (raw && raw !== "undefined") {
      user = JSON.parse(raw);
    }
  } catch (error) {
    console.error("Erro ao ler o usuário do localStorage:", error);
    user = null;
  }

  // Se o usuário não estiver logado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se uma role for exigida e não for compatível
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Caso esteja logado e com a role correta (se exigida)
  return children;
};

export default ProtectedRoute;
