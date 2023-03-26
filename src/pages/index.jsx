import React, { useState } from "react"
import Features from "./B-Features"
import Appreciation from "./C-Appreciation"
import Relation from "./D-Relation"
import "./index.css"
import 'antd/dist/reset.css';
import { useCacheToken } from "@ant-design/cssinjs"

const Pages = () => {
    const [linkedID,setLinkedID] = useState('17690')
    const [addScroll,setAddScroll] = useState([])
    return (
        <div className="layout-container">
            <div className="Title" style={{fontFamily:'宋体'}}>Traditional Chinese Painting Biography</div>
            
                <div className="B-Features">
                    <Features 
                    linkedID = {linkedID}
                    setLinkedID = {setLinkedID}
                    addScroll = {addScroll}
                    setAddScroll = {setAddScroll}/>
                </div>

                <div className = "D-Relation">
                    <Relation 
                    linkedID = {linkedID}
                    setLinkedID = {setLinkedID}/>
                </div>

                <div className="C-Appreciation">
                    <Appreciation 
                    addScroll = {addScroll}
                    setAddScroll = {setAddScroll}/>
                </div>
                
            </div>
       
    )
}

export default Pages
