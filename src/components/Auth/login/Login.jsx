import { useState } from "react";
import Link from "next/link";
import { Envelope, Eye, EyeSlash, Lock, SignIn } from "phosphor-react";
import AuthLayout from "@/components/Layout/AuthLayout";
import { CustomInput } from "@/components/Inputs/CustomInput";
import { useRouter } from "next/router";

export default function Login({ login }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isSignIn) {
      setIsSignIn(true);
      try {
        await login(email, password);
        router.push("/tasks");
      } catch (err) {
        setError("Failed to sign in. Please check your credentials.");
      } finally {
        setIsSignIn(false);
      }
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md bg-zinc-900 p-10 rounded-lg">
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
            required />
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
            required />
        </div>
        <div className="mt-10">
          <button type="submit" className="flex items-center justify-between gap-3 w-full px-5 py-2 rounded-lg font-semibold bg-white text-black mb-5">
            Login
            <SignIn size={24} weight="duotone" />
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
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
