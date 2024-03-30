import Footer from "./Footer";
import Navbar from "./Navbar";
import Tasks from "./Tasks";

const Daily = () => {
    return (
        <div className="min-h-screen min-w-screen bg-zinc-950">
            <Navbar />
            <Tasks />
            <Footer />
        </div>
    )
}

export default Daily;