import React from "react"
import Features from "./B-Features"
import Appreciation from "./C-Appreciation"
import Relation from "./D-Relation"
import "./index.css"
import 'antd/dist/reset.css';

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

                <div className = "D-Relation">
                    <Relation />
                </div>

                <div className="C-Appreciation">
                    <Appreciation />
                </div>
                
            </div>
        </div>
    )
}

export default Pages
