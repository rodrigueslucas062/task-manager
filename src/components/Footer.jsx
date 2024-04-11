import { Github } from "lucide-react"

const Footer = () => {
    return (
        <footer className="fixed bottom-0 h-8 w-full border-t-2 md:p-3 md:h-10 lg:hidden">
            <div className="flex items-center justify-around gap-4">
                <a className="flex select-none items-center gap-3 rounded-2xl px-4 py-2 transition-transform hover:ring-2 active:scale-95 hover:ring-white hover:backdrop-blur-sm hover:bg-gray-50/25"
                    target="_blank"
                    href="https://github.com/rodrigueslucas062/task-manager"
                    rel="noreferrer" >
                    <Github className="fill-white" />
                    <span className="text-white">
                        Repositório Github
                    </span>
                </a>
            </div>
        </footer>
    )
}

export default Footer