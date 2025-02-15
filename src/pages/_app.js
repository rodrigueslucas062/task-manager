import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";
import { Toaster } from "sonner";
import { useRouter } from "next/router";
import { Theme } from "@radix-ui/themes";
import { AuthProvider, Layout, SEO } from "@/components";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const noLayoutRoutes = ["/", "/signup"];
  const useLayout = !noLayoutRoutes.includes(router.pathname);

  return (
    <Theme appearance="dark">
      <AuthProvider>
        <SEO />
        <Toaster richColors position="bottom-right" />
        {useLayout ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthProvider>
    </Theme>
  );
}
