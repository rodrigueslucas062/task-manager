import { AuthProvider } from "@/components/Context/authContext/authContext";
import Layout from "@/components/Layout/Layout";
import SEO from "@/components/SEO";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const noLayoutRoutes = ["/", "/singup"];
  const useLayout = !noLayoutRoutes.includes(router.pathname);

  return (
    <AuthProvider>
      <SEO />
      <Toaster />
      {useLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
}
