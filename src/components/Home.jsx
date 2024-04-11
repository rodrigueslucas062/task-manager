import React, { useEffect, useRef } from "react";
import Footer from "./Footer";
import SEO from "./SEO";
import Tasks from "./Tasks";

const Daily = () => {
    const svgRef = useRef(null)

    useEffect(() => {
        const handleResize = () => {
            const svg = svgRef.current
            if (svg) {
                const rect = svg.getBoundingClientRect()
                const width = rect.width
                const height = rect.height
                svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="min-h-screen min-w-screen relative">
            <SEO />
            <Tasks />
            <Footer />
            <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMinYMin slice" style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, zIndex: -1 }}>
                <defs>
                    <path id="selector-zigzag-path" d="M-5 5L5.1 15 15 5l10 10" stroke-linecap="square" stroke-width="7" stroke="#3d444b" fill="none" />
                    <pattern id="selector-zigzag-bg" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale(2.5)">
                        <g id="selector-zigzag-animated-group">
                            <g>
                                <use href="#selector-zigzag-path" />
                                <animateTransform attributeName="transform" type="translate" keyTimes="0;1" repeatCount="indefinite" dur="1.5s" values="0 0; 0 20" />
                            </g>
                        </g>
                        <g id="selector-zigzag-animated-group" transform="translate(0, -20)">
                            <g>
                                <use href="#selector-zigzag-path" />
                                <animateTransform attributeName="transform" type="translate" keyTimes="0;1" repeatCount="indefinite" dur="1.5s" values="0 0; 0 20" />
                            </g>
                        </g>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="#65696F" />
                <rect width="100%" height="100%" transform="translate(0,0)" fill="url(#selector-zigzag-bg)" />
            </svg>
        </div>
    )
}

export default Daily;