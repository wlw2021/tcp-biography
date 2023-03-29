import axios from "axios";
import React, { useEffect, useState } from "react";
import './index.css'
import { axis, biosample, bioTitle, divide, simiTitle } from "../../assets";
import * as d3 from "d3";
import SimilarPaint from "./similar-painting";
import NoneDisplay from "./none-list";
import year from '../../data/year.json'
import PersonScroll from "./person-scroll";
import { Button } from "antd";

const TimeAxis = (prop) =>{

    const [noneListP,setNoneListP]=useState(null)
    const [noneListS,setNoneListS]=useState(null)
    const [relation, setRelation] = useState(null)
    const [person, setPerson] = useState(null)
    const [showType, setShowType] = useState(false)

    
   

    useEffect(()=>{  
        d3.select('#year-axis-svg').selectChildren('*')?.remove()
        const axis=d3.select('#year-axis-svg').attr("preserveAspectRatio", "xMidYMid meet")
    .attr("viewBox", "0 0 2595 30")
    const peryearlen=170/81
    var year=1000
    while(year<=2000){
            axis.append('line').attr('class','axis-mark')
            .attr('x1',(year-950)*peryearlen).attr('y1',0).attr('x2',(year-950)*peryearlen).attr('y2',10)
            .style('stroke','black').style('stroke-width',1.2)

            axis.append('text').attr('y', 27)
            .attr('x', (year-950)*peryearlen-20)
            .style('text-anchor', "start")
            .text(String(year))
            .style('font-size', 15)
            .style('fill','black');

        year+=50
    }  
        
        const authorScroll =async () =>{            
        
            var url = 'http://aailab.cn:28081/getpersonscore?pid='+prop.whichCase+'&addnames=周密,黄公望&addcids=10183,109158'
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
        },[prop.whichCase])      

        const handleClickT = ()=>{
            setShowType(!showType)
        } 

    return(
        <div id="axis-container">
            <div id ='main-axis'>
                <div id='long'>
            <div id='year-similar'>
                <SimilarPaint 
                linkedID={prop.linkedID}
                setLinkedID={prop.setLinkedID}
                linkedName={prop.linkedName}
                setLinkedName={prop.setLinkedName}
                whichCase={prop.whichCase}
                 noneListP ={noneListP}
                 setNoneListP ={setNoneListP}
                 addScroll = {prop.addScroll}
                setAddScroll = {prop.setAddScroll}
                showType={showType}
                />
            </div>
            <div id = "axis">
                <svg id='year-axis-svg'></svg>
            </div>
            <div id='person-year'>
                <PersonScroll 
                setSelectedPerson = {prop.setSelectedPerson}
                whichCase={prop.whichCase}
                noneListS ={noneListS}
                setNoneListS ={setNoneListS}
                relation = {relation}
                person = {person}
                addScroll = {prop.addScroll}/>
            </div>  
            </div>          
            </div>
            <img src={simiTitle} id='simiTitle'></img>
            <img src={bioTitle} id='bioTitle'></img>
            <img src={biosample} id='biosample'></img>
            <div id='button-div'>
                <Button style={{ fontSize: '40px', height:'80px', width:'300px' }}
                onClick = {handleClickT}
                >{showType? 'switch to text': 'switch to paint'}</Button>
            </div> 
            <div id="divide3">
                <img id='dividetu3' src={divide} alt="分割线" />
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