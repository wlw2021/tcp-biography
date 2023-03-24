import React, { useState } from "react"
import Features from "./B-Features"
import Appreciation from "./C-Appreciation"
import Relation from "./D-Relation"
import "./index.css"
import 'antd/dist/reset.css';
import { useCacheToken } from "@ant-design/cssinjs"

const Pages = () => {
    const [linkedID,setLinkedID] = useState('17690')
    return (
        <div className="layout-container">
            <div className="Title">Traditional Chinese Painting Biography</div>
            
                <div className="B-Features">
                    <Features 
                    linkedID = {linkedID}
                    setLinkedID = {setLinkedID}/>
                </div>

                <div className = "D-Relation">
                    <Relation 
                    linkedID = {linkedID}
                    setLinkedID = {setLinkedID}/>
                </div>

                <div className="C-Appreciation">
                    <Appreciation 
                    linkedID = {linkedID}
                    setLinkedID = {setLinkedID}/>
                </div>
                
            </div>
       
    )
}

export default Pages
