import React, { useEffect, useState } from "react"
import Features from "./B-Features"
import Appreciation from "./C-Appreciation"
import Relation from "./D-Relation"
import "./index.css"
import 'antd/dist/reset.css';
import { SearchOutlined } from '@ant-design/icons';
import { Input} from "antd"
import { title } from "../assets"
import paintinglist from "../data/paintinglist.json"


const Pages = () => {
    const [linkedID,setLinkedID] = useState('17690')
    const [linkedName,setLinkedName] = useState(null)
    const [matrixID,setMatrixID] = useState('17690')
    const [matrixName,setMatrixName] = useState(null)
    const [addScroll,setAddScroll] = useState([])
    const [whichCase, setWhichCase] = useState ('6')
    const [picid, setpicid] = useState ('6')
    const [selectedPerson, setSelectedPerson] = useState ("none")
    var casenum;

    const changecase = (e) =>{
        casenum=e.target.value
    }

    const switchCase = () =>{
        setWhichCase(casenum)
        setLinkedID('17690')
        const id = paintinglist.find((e)=>{
            if(e.pid==casenum) return true
            else return false
        })
        console.log(id)
        setpicid(id.id)
        console.log(picid)
        if(id.cid!=='unknow'){
            setLinkedID(id.cid)
            setMatrixID(id.cid)
        }
        else setLinkedID('17690')
        // if(whichCase==='13941'){
        //     setWhichCase('894')
        //     setLinkedID('17690')
        // }

        // else{
        //     setWhichCase('13941')
        //     setLinkedID('55870')
        // }
        setSelectedPerson('none')
    }



    return (
        <div className="layout-container">
            <div className="Title" style={{fontFamily:'STKaiti', fontSize:100}}>
            <img src={title} style={{ height: 90, marginLeft:40}}></img>
            <Input prefix={<SearchOutlined style={{ width: 40,marginRight:25}} onClick = {switchCase}/>} placeholder="input search text"  style={{ width: 800, height: 70, marginLeft:1900, fontSize:45}} onChange={changecase}/>
        
                </div>
            
                <div className="B-Features">
                    <Features 
                    selectedPerson = {selectedPerson}
                    setSelectedPerson = {setSelectedPerson}
                    whichCase = {whichCase}
                    picid = {picid}
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
                    linkedID = {linkedID}
                    setLinkedID = {setLinkedID}
                    linkedName = {linkedName}
                    setLinkedName = {setLinkedName}
                    setSelectedPerson = {setSelectedPerson}
                    whichCase = {whichCase}
                    addScroll = {addScroll}
                    setAddScroll = {setAddScroll}/>
                </div>
                
            </div>
       
    )
}

export default Pages
