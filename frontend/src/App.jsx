import { useEffect } from "react";
import { useLoginStore } from "./stores/auth.store";
import { useAuthStore } from "./stores/admin/auth.admin";
import AppRoutes from "./AppRoutes";

const App = () => {
  const userCheckAuth = useLoginStore((state) => state.checkAuth);
  const adminCheckAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      adminCheckAuth();
    } else {
      userCheckAuth();
    }
  }, [userCheckAuth, adminCheckAuth]);

  return (
    <main className="w-full min-h-screen">
      <AppRoutes />
    </main>
  );
};

export default App;