import axios from "axios";
import './index.css'
import React, { useEffect, useState } from "react"
import { Checkbox } from 'antd';
import * as d3 from "d3"
import Matrix from "./matrix";
import MatrixChart from "./matrix-chart";

const MatrixView = (prop) =>{

    const plainOptions = ['Apple', 'Pear', 'Orange'];

    const [personItems,setPersonItems] = useState(null) 
    const [relationList, setRelationList] = useState(null)
    const [personOrder, setPersonOrder] = useState(null)

    useEffect(()=>{

        const getShowValue = async() =>{
            console.log(prop)
            var url
            if(prop.matrixName!=null){
                url = 'http://aailab.cn:28081/getpersonmatrix?pid='+prop.whichCase+'&addnames='+prop.matrixName+'&addcids='+prop.matrixID
            }
            
            else if(prop.linkedName!=null){
                url = 'http://aailab.cn:28081/getpersonmatrix?pid='+prop.whichCase+'&addnames='+prop.linkedName+'&addcids='+prop.linkedID
            }
            else url = 'http://aailab.cn:28081/getpersonmatrix?pid='+prop.whichCase+'&addnames=&addcids='
            
            //url = 'http://aailab.cn:28081/getpersonmatrix?pid=13941&addnames=蘇軾,蔡肇,李之儀,王詵,秦觀,陳景元,李公麟,蘇轍,張耒,黃庭堅,晁補之,鄭靖,米芾,王欽臣,劉涇,圓通大師&addcids=3767,1648,3484,7376,3043,unknow,19865,1493,12354,522739,13,535896,3676,1767,10660,40425'
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
            <div id='checkbox-group' style={{fontSize:25}}>Event Type:
            <Checkbox className="kin" style={{fontSize:25, marginLeft:20}}>Kinship</Checkbox>
            <Checkbox className="poli" style={{fontSize:25, marginLeft:20}}>Political</Checkbox>
            <Checkbox className="aca" style={{fontSize:25, marginLeft:20}}>Academic</Checkbox>
            <Checkbox className="soc" style={{fontSize:25, marginLeft:20}}>Social</Checkbox>
            <Checkbox className="pai" style={{fontSize:25, marginLeft:20}}>Paint</Checkbox>
            <Checkbox className="oth" style={{fontSize:25, marginLeft:20}}>Others</Checkbox>
            </div>
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