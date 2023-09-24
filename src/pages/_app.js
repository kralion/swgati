import "@/styles/globals.css";
import Navbar from "@layouts/Navbar";
import { AuthProvider } from "@context/AuthContext";
import ProtectedRoute from "@components/ProtectedRoute";
import { useRouter } from "next/router";

const noAuthRequired = ["/login"];

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <AuthProvider>
      <Navbar>
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </Navbar>
    </AuthProvider>
  );
};

export default App;
