const Tasks = () => {
    return (
        <section className="min-h-screen">
            <div className="flex flex-col items-center pt-48 space-y-4 max-lg:px-8 ">
                <h1 className="bg-sky-700 py-1 px-3 rounded-3xl font-semibold">Tarefas gerais</h1>
                <input type="text" className="rounded-lg cursor-pointer inline-block m-1 p-3 w-full lg:w-1/3 relative bg-white border-4 border-sky-700 text-zinc-900" />
                <input type="text" className="rounded-lg cursor-pointer inline-block m-1 p-3 w-full lg:w-1/3 relative bg-white border-4 border-sky-700 text-zinc-900" />
                <input type="text" className="rounded-lg cursor-pointer inline-block m-1 p-3 w-full lg:w-1/3 relative bg-white border-4 border-sky-700 text-zinc-900" />
                <input type="text" className="rounded-lg cursor-pointer inline-block m-1 p-3 w-full lg:w-1/3 relative bg-white border-4 border-sky-700 text-zinc-900" />
                <input type="text" className="rounded-lg cursor-pointer inline-block m-1 p-3 w-full lg:w-1/3 relative bg-white border-4 border-sky-700 text-zinc-900" />
            </div>
        </section>
    )
}

export default Tasks;