import { useEffect } from "react";
import AppRoutes from "./AppRoutes"
// import texture from "./assets/images/textture-bg.avif"
import { useLoginStore } from "./stores/auth.store"

const App = () => {

  const checkAuth = useLoginStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <main
      className="w-full min-h-screen"
    >

      {/* <div
        className="w-full min-h-[140vh] md:min-h-[110vh] absolute inset-0 opacity-30 z-50 pointer-events-none"
        style={{ backgroundImage: `url(${texture})` }}
      >
      </div> */}

      <AppRoutes />
    </main>
  )
}

export default App