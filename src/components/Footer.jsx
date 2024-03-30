import { Github } from "lucide-react"

const Footer = () => {
    return (
        <footer className="fixed bottom-0 h-16 w-full border-t-2 px-6 sm:flex">
            <div className="flex items-center justify-around gap-4">
                <a className="flex select-none items-center gap-3 rounded-2xl px-4 py-2 transition-transform hover:ring-2 active:scale-95 hover:ring-white"
                    target="_blank"
                    href="https://github.com/rodrigueslucas062/task-manager"
                    rel="noreferrer" >
                    <Github className="dark:fill-white" />
                    <span className="dark:text-white">
                        Repositório Github
                    </span>
                </a>
            </div>
        </footer>
    )
}

export default Footer