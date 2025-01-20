import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/components/Context/authContext/authContext";
import Link from "next/link";
import { SignIn } from "phosphor-react";

export default function Login() {
   const { isAuthenticated, login } = useAuth();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isSignIn, setIsSignIn] = useState(false);
   const [error, setError] = useState("");
   const router = useRouter();

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!isSignIn) {
         setIsSignIn(true);
         try {
            await login(email, password);
            router.push("/task");
         } catch (err) {
            setError("Failed to sign in. Please check your credentials.");
         }
      }
   };

   if (isAuthenticated) {
      router.push("/task");
      return null;
   }

   return (
      <div>
         {isAuthenticated && router.push("/task")}
         <section className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-zinc-950 to-zinc-800">
            <div className="relative">
               <div className="absolute top-[-50px] right-[-30px] lg:right-[-50px] w-24 h-24 bg-purple-400 bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-20 rounded-lg animated bounce-slow"></div>
               <div className="absolute top-[150px] left-[-100px] w-[120px] h-[200px] bg-sky-600 bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-20 rounded-lg animated bounce-fast"></div>
               <div className="absolute bottom-[-80px] right-[-30px] lg:right-[-50px] w-[70px] h-[70px] bg-sky-600 bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-20 rounded-lg animated bounce-medium"></div>
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
                           <span>{error}</span>
                        </div>
                        <div className="mt-10">
                           <button type="submit" className="flex items-center justify-center gap-3 w-full px-5 py-2 rounded-lg font-semibold bg-white text-black mb-5" >
                              Login
                              <SignIn size={24} weight="duotone" />
                           </button>
                        </div>
                        <p className="text-white mt-sm">
                           Esqueceu a senha? <Link href="#" className="font-semibold text-white">Clique aqui</Link>
                        </p>
                     </form>
                     <div className="mt-20">
                        <p className="text-white mt-sm">
                           <Link href="/singup" className="font-semibold text-white">Sign up</Link>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}
