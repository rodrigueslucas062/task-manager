import React, { useEffect, useRef } from "react";
import Footer from "./Footer";
import SEO from "./SEO";
import Tasks from "./Tasks";

const Daily = () => {
    return (
        <div className="min-h-screen min-w-screen relative">
            <SEO />
            <Tasks />
            <Footer />
        </div>
    )
}

export default Daily;