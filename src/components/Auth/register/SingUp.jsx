import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { doCreateUserWithEmailAndPassword } from "@/components/Context/authContext/auth";
import { SignIn } from "phosphor-react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

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
            setError("Falha ao criar a conta. Tente novamente.");
        }
    };

    return (
        <section className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-zinc-950 to-zinc-800">
            <div className="relative">
                <div className="absolute top-[-50px] right-[-50px] w-24 h-24 bg-purple-400 bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-20 rounded-lg animated bounce-slow"></div>
                <div className="absolute top-[150px] left-[-100px] w-[120px] h-[200px] bg-sky-600 bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-20 rounded-lg animated bounce-fast"></div>
                <div className="absolute bottom-[-80px] right-[-50px] w-[70px] h-[70px] bg-sky-600 bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-20 rounded-lg animated bounce-medium"></div>
                <div className="absolute bottom-[-60px] w-[50px] h-[50px] bg-purple-400 bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-20 rounded-lg rotate-[10deg] animated bounce-slow"></div>
                <div className="absolute top-[-60px] left-[150px] w-[60px] h-[60px] bg-zinc-700 bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-20 rounded-lg animated bounce-medium"></div>

                <div className="relative w-full lg:w-[500px] min-h-[500px] flex justify-center items-center bg-white bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-50 rounded-lg">
                    <div className="relative w-full h-full p-10">
                        <div className="space-y-2">
                            <h2 className="text-white text-2xl font-semibold tracking-wider">
                                Synapse
                            </h2>
                            <div className="left-0 bottom-[-10px] w-28 h-1 bg-purple-400"></div>
                        </div>
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="w-full mt-5">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="w-full bg-white bg-opacity-20 px-5 py-2.5 text-white text-[15px] tracking-[1px] rounded-lg border border-white border-opacity-50 shadow-[0_5px_15px_rgba(0,0,0,0.05)] focus:outline-none"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-full mt-5">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Senha"
                                    className="w-full bg-white bg-opacity-20 px-5 py-2.5 text-white text-[15px] tracking-[1px] rounded-lg border border-white border-opacity-50 shadow-[0_5px_15px_rgba(0,0,0,0.05)] focus:outline-none"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-full mt-5">
                                <input
                                    type="password"
                                    name="passwordConfirmation"
                                    id="passwordConfirmation"
                                    placeholder="Confirmar Senha"
                                    className="w-full bg-white bg-opacity-20 px-5 py-2.5 text-white text-[15px] tracking-[1px] rounded-lg border border-white border-opacity-50 shadow-[0_5px_15px_rgba(0,0,0,0.05)] focus:outline-none"
                                    value={passwordConfirmation}
                                    onChange={(event) => setPasswordConfirmation(event.target.value)}
                                    required
                                />
                            </div>
                            {error && (
                                <div className="text-red-500 text-sm mt-2">
                                    {error}
                                </div>
                            )}
                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-3 w-full px-5 py-2 rounded-lg font-semibold bg-white text-black mb-5"
                                >
                                    Cadastrar
                                    <SignIn size={24} weight="duotone" />
                                </button>
                            </div>
                            <p className="text-white mt-sm">
                                Esqueceu a senha? <Link href="#" className="font-semibold text-white">Clique aqui</Link>
                            </p>
                        </form>
                        <p className="text-white mt-sm">
                            <Link href="/" className="font-semibold text-white">Já tenho cadastro</Link>
                        </p>
                    </div>
                </div>
            </div >
        </section >
    );
}