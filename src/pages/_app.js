import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
