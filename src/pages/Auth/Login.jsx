import { useState } from "react";
import Link from "next/link";
import { Envelope, Eye, EyeSlash, Lock, SignIn } from "phosphor-react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { Spinner } from "@radix-ui/themes";
import { useAuth } from "@/components/Context";
import { AuthLayout } from "@/components/Layouts";
import { CustomInput } from "@/components/Inputs";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    router.push("/tasks");
    return null;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSignIn(true);
  
    try {
      await login(email, password);
    } catch (err) {
      let errorMessage = "";
      if (err.code === 'auth/invalid-credential') {
        errorMessage = "Email ou senha inválidos.";
      } else {
        errorMessage = "Ocorreu um erro ao realizar essa solicitação";
      }
  
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSignIn(false);
    }
  };

  return (
    <AuthLayout>
      {isAuthenticated && router.push("/tasks")}
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md bg-zinc-800 p-6 md:p-10 rounded-lg">
        <div className="space-y-2">
          <h2 className="text-white text-2xl font-semibold tracking-wider">
            Synapse
          </h2>
          <div className="left-0 bottom-[-10px] w-28 h-1 bg-purple-400"></div>
        </div>
        <div className="space-y-4">
          <CustomInput
            icon={<Envelope size={20} weight="duotone" />}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <CustomInput
            icon={<Lock size={20} weight="duotone" />}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            secondIcon={
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-white"
              >
                {showPassword ? <EyeSlash size={20} weight="duotone" /> : <Eye size={20} weight="duotone" />}
              </span>
            }
            required
          />
        </div>
        <div className="mt-10">
          <button
            type="submit"
            disabled={isSignIn}
            className={`flex items-center justify-between gap-3 w-full px-5 py-2 rounded-lg font-semibold bg-white text-black mb-5 ${isSignIn ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Login
            <div className="flex items-center gap-2">
              {isSignIn && <Spinner loading={true} size="2" />}
              <SignIn size={24} weight="duotone" />
            </div>
          </button>
        </div>
        <p className="text-white mt-sm">
          Esqueceu a senha? <Link href="#" className="font-semibold text-white">Clique aqui</Link>
        </p>
        <div className="mt-20">
          <p className="text-white mt-sm">
            <Link href="/signup" className="font-semibold text-white">Sign up</Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
