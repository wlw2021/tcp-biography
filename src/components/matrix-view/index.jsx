import axios from "axios";
import './index.css'
import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import Matrix from "./matrix";
import MatrixChart from "./matrix-chart";

const MatrixView = (prop) =>{

    const [personItems,setPersonItems] = useState(null) 
    const [relationList, setRelationList] = useState(null)
    const [personOrder, setPersonOrder] = useState(null)

    useEffect(()=>{

        const getShowValue = async() =>{
            var url = 'http://aailab.cn:28081/getpersonmatrix?pid=894&addnames=&addcids='
            await axios({
                method:"get",
                url:url,
            }).then(function (res) {
                console.log(res.data)    
                setPersonItems(res.data.data.人物列表)
                setPersonOrder(res.data.data.排序人物列表)
                setRelationList(res.data.data.关系列表)            
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        getShowValue()   
    },[prop])  


    return(
        <div id="matrix-container">
            <div id = 'matrix-pic'>
                <Matrix
                itemlist = {personItems}
                relation = {relationList}
                personOrder={personOrder}
                />
            </div>     
            <div id = 'matrix-chart'>
                <MatrixChart
                itemlist = {personItems}
                relation = {relationList}
                personOrder={personOrder}
                 />
            </div>                 
        </div>
    )

}

export default MatrixView