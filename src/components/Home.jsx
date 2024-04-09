import Footer from "./Footer";
import SEO from "./SEO";
import Tasks from "./Tasks";

const Daily = () => {
    return (
        <div className="zig-zag min-h-screen min-w-screen">
            <SEO />
            <Tasks />
            <Footer />
        </div>
    )
}

export default Daily;