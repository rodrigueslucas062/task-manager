import React from "react";

export default function AuthLayout({ children }) {
    return (
        <section className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-zinc-950 to-zinc-800">
            <div className="relative">
                <div className="absolute top-[-50px] right-[-30px] lg:right-[-50px] w-24 h-24 bg-purple-400 bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-20 rounded-lg animated bounce-slow"></div>
                <div className="absolute top-[150px] left-[-100px] w-[120px] h-[200px] bg-sky-600 bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-20 rounded-lg animated bounce-fast"></div>
                <div className="absolute bottom-[-80px] right-[-30px] lg:right-[-50px] w-[70px] h-[70px] bg-sky-600 bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-20 rounded-lg animated bounce-medium"></div>
                <div className="absolute bottom-[-60px] w-[50px] h-[50px] bg-purple-400 bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-20 rounded-lg rotate-[10deg] animated bounce-slow"></div>
                <div className="absolute top-[-60px] left-[150px] w-[60px] h-[60px] bg-zinc-700 bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-20 rounded-lg animated bounce-medium"></div>
                <div className="relative w-full lg:w-[500px] min-h-[500px] flex justify-center items-center bg-white bg-opacity-10 backdrop-blur-sm shadow-lg border border-white border-opacity-50 rounded-lg">
                    {children}
                </div>
            </div>
        </section>
    );
}
