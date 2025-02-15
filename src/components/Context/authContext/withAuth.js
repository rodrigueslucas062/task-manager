import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./authContext";

export function withAuth(Component) {
  return function ProtectedRoute(props) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("/");
      }
    }, [isAuthenticated, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}
