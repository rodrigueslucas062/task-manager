const { Github } = require("lucide-react")

const Footer = () => {
    return (
        <footer className="flex h-full items-center justify-between">
            <a
                className="flex select-none items-center gap-3 rounded-2xl px-4 py-2 transition-transform hover:ring-2 hover:ring-black active:scale-95 dark:hover:ring-white"
                target="_blank"
                href="https://github.com/rodrigueslucas062/task-manager"
                rel="noreferrer"
            >
                <Github className="fill-black dark:fill-white" />
                <span className="text-black dark:text-white">
                    Repositório Github
                </span>
            </a>
        </footer>
    )
}

export default Footer