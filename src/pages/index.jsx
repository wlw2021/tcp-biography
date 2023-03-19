import React from "react"
import Overview from "./A-Overview"
import Features from "./B-Features"
import Appreciation from "./C-Appreciation"
import "./index.css"

const Pages = () => {
    return (
        <div className="layout-container">
            <div className="Title">Traditional Chinese Painting Biography</div>
            <div className="Left">
                {/* <div className="A-Overview">
                    <Overview />
                </div>   */}

                <div className="B-Features">
                    <Features />
                </div>

                <div className = "D-Graphs"></div>

                <div className="C-Appreciation">
                    <Appreciation />
                </div>
                
            </div>
            {/* <div className="Right">
                <div className="D-LinkedData"></div>
            </div>          */}
            
        </div>
    )
}

export default Pages
