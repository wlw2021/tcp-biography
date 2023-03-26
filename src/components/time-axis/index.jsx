import axios from "axios";
import React, { useEffect, useState } from "react";
import './index.css'
import { axis } from "../../assets";
import * as d3 from "d3";
import SimilarPaint from "./similar-painting";
import NoneDisplay from "./none-list";
import year from '../../data/year.json'
import PersonScroll from "./person-scroll";

const TimeAxis = (prop) =>{

    const [noneListP,setNoneListP]=useState(null)
    const [noneListS,setNoneListS]=useState(null)
    const [relation, setRelation] = useState(null)
    const [person, setPerson] = useState(null)
   

    useEffect(()=>{    
        
        const authorScroll =async () =>{            
        
            var url = 'http://aailab.cn:28081/getpersonscore?pid=894&addnames=周密&addcids=10183'
            await axios({
                    method:"get",
                    url:url,
                }).then(function (res) {
                    console.log(res.data)
                   setRelation( res.data.data.人物关系信息)
                   setPerson(res.data.data.人物列表)
                })
                .catch(function (error) {
                    console.log(error);
                })}
                authorScroll()
        },[])      

               

    return(
        <div id="axis-container">
            <div id='year-similar'>
                <SimilarPaint 
                 noneListP ={noneListP}
                 setNoneListP ={setNoneListP}/>
            </div>
            <div id = "axis">
                <img src={axis} id = "axistu"></img>
            </div>
            <div id='person-year'>
                <PersonScroll 
                noneListS ={noneListS}
                setNoneListS ={setNoneListS}
                relation = {relation}
                person = {person}
                addScroll = {prop.addScroll}/>
            </div>
            <div id='none-display'>
                <NoneDisplay 
                noneListP ={noneListP}
                setNoneListP ={setNoneListP}
                noneListS ={noneListS}
                setNoneListS ={setNoneListS}/>
            </div>
        </div>
    )

}

export default TimeAxis