import Footer from "./Footer";
import Navbar from "./Navbar";
import Tasks from "./Tasks";

const Daily = () => {
    return (
        <div className="zig-zag min-h-screen min-w-screen">
            <Navbar />
            <Tasks />
            <Footer />
        </div>
    )
}

export default Daily;