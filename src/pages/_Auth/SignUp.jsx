import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Envelope, Eye, EyeSlash, Lock } from "phosphor-react";
import { toast } from "sonner";
import { doCreateUserWithEmailAndPassword } from "@/components/Context";
import { AuthLayout } from "@/components/Layouts";
import { CustomInput } from "@/components/Inputs";

export function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await doCreateUserWithEmailAndPassword(email, password);
      router.push("/");
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      if (err.code === 'auth/weak-password') {
        setError("A senha é muito fraca. Use pelo menos 6 caracteres.");
      } else if (err.code === 'auth/email-already-in-use') {
        setError("Este email já está em uso.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Email inválido")
      }
      else {
        setError("Falha ao criar a conta: " + err.message);
      }
      toast.error(error)
    }
  }

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
          <CustomInput
            icon={<Lock size={20} weight="duotone" />}
            type={showPassword ? "text" : "password"}
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="Confirmar Senha"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
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
          <button
            type="submit"
            className="flex items-center justify-center gap-3 w-full px-5 py-2 rounded-lg font-semibold bg-white text-black mb-5"
          >
            Cadastrar
          </button>
        </div>
        <p className="text-white mt-sm">
          <Link href="/" className="font-semibold text-white">Já tenho cadastro</Link>
        </p>
      </form>

    </AuthLayout>
  );
}
