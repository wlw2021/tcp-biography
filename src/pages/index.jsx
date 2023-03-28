import React, { useState } from "react"
import Features from "./B-Features"
import Appreciation from "./C-Appreciation"
import Relation from "./D-Relation"
import "./index.css"
import 'antd/dist/reset.css';
import { useCacheToken } from "@ant-design/cssinjs"
import { Button, Space } from "antd"

const Pages = () => {
    const [linkedID,setLinkedID] = useState('17690')
    const [linkedName,setLinkedName] = useState(null)
    const [matrixID,setMatrixID] = useState('17690')
    const [matrixName,setMatrixName] = useState(null)
    const [addScroll,setAddScroll] = useState([])
    const [whichCase, setWhichCase] = useState ('894')

    const switchCase = () =>{
        if(whichCase==='13941'){
            setWhichCase('894')
            setLinkedID('17690')
        }

        else{
            setWhichCase('13941')
            setLinkedID('55870')
        }
    }

    return (
        <div className="layout-container">
            <div className="Title" style={{fontFamily:'宋体'}}>
            <Space className="Title" size='large'>
            Traditional Chinese Painting Biography
            <Button style={{ transform:"translate(2000,0)", fontSize: '40px', height:'80px', width:'300px' }} onClick = {switchCase}>switch</Button>
            </Space>
                </div>
            
                <div className="B-Features">
                    <Features 
                    whichCase = {whichCase}
                    linkedID = {linkedID}
                    setLinkedID = {setLinkedID}
                    linkedName = {linkedName}
                    setLinkedName = {setLinkedName}
                    matrixID = {matrixID}
                    setMatrixID = {setMatrixID}
                    matrixName = {matrixName}
                    setMatrixName = {setMatrixName}
                    addScroll = {addScroll}
                    setAddScroll = {setAddScroll}/>
                </div>

                <div className = "D-Relation">
                    <Relation 
                    matrixID = {matrixID}
                    setMatrixID = {setMatrixID}
                    whichCase = {whichCase}
                    linkedID = {linkedID}
                    setLinkedID = {setLinkedID}
                    matrixName = {matrixName}
                    setMatrixName = {setMatrixName}
                    linkedName = {linkedName}
                    setLinkedName = {setLinkedName}/>
                </div>

                <div className="C-Appreciation">
                    <Appreciation 
                    whichCase = {whichCase}
                    addScroll = {addScroll}
                    setAddScroll = {setAddScroll}/>
                </div>
                
            </div>
       
    )
}

export default Pages
