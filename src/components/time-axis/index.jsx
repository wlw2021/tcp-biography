import axios from "axios";
import React, { useEffect, useState } from "react";
import './index.css'
import { axis, biosample, bioTitle, divide, simiTitle } from "../../assets";
import * as d3 from "d3";
import SimilarPaint from "./similar-painting";
import NoneDisplay from "./none-list";
import PersonScroll from "./person-scroll";
import { Button, Modal, Tooltip, Input} from "antd";
import { bio, hoverRect, lined, linkdata, switchPaint } from "../../assets";
import { PlusOutlined } from '@ant-design/icons';
import boome from '../../data/boome.json'
import testt from '../../data/test.json'

const TimeAxis = (prop) =>{

   
    const [noneListP,setNoneListP]=useState(null)
    const [noneListS,setNoneListS]=useState(null)
    const [relation, setRelation] = useState(null)
    const [person, setPerson] = useState(null)
    const [showType, setShowType] = useState(false)
    const [position, setPosition] = useState(null)
    const [clickA, setClickA] = useState(null)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [begin, setbegin]=useState(null)

    
    const handleClickL = async ()=>{
        var id;
        var url = 'http://localhost:28081/getonestringinfo?name='+clickA+'&stype=cperson'
        await axios({
          method:"get",
          url:url,
            }).then(function (res) {
                id=(res.data.data[0].id)
            })
            .catch(function (error) {
                console.log(error);
            })
        prop.setLinkedID(String(id))
        prop.setLinkedName(clickA)
      }
  
      
  
      const handleClickScroll = async ()=>{   
        var scrollnew = []
        var id;
        var url = 'http://localhost:28081/getonestringinfo?name='+clickA+'&stype=cperson'
        await axios({
          method:"get",
          url:url,
            }).then(function (res) {
                id=(res.data.data[0].id)
            })
            .catch(function (error) {
                console.log(error);
            })
        var newdata;
        var url = 'http://localhost:28081/getpersonscore?pid='+prop.whichCase+'&addnames='+clickA+'&addcids='+id
        await axios({
          method:"get",
          url:url,
            }).then(function (res) {
                var the = res.data.data.人物关系信息[id]
                var score = the.分数.画作相关+the.分数.讨论度+the.分数.身份
                var level =5 - Math.floor(score/20)
                newdata={
                  name:the.姓名,
                  cid:String(id),
                  birth:the.生年,
                  death:the.卒年,
                  level:level,
                  seal:[],
                  sentence:[]
                }
            })
            .catch(function (error) {
                console.log(error);
            })
  
            scrollnew.push(newdata)
            prop.setAddScroll(scrollnew)
      }

    useEffect(()=>{ 
        console.log(testt) 
        d3.select('#year-axis-svg').selectChildren('*')?.remove()
        d3.select('#tool-svg').selectChildren('*')?.remove()
        const axis=d3.select('#year-axis-svg').attr("preserveAspectRatio", "xMidYMid meet")
    .attr("viewBox", "0 0 3000 30")
    const tool=d3.select('#tool-svg').attr("preserveAspectRatio", "xMidYMid meet")
    .attr("viewBox", "0 0 3000 118.5")
    const peryearlen=170/81
    var year=2000
    setPerson(prop.person)
    setRelation(prop.relation)
    if(relation!==null){
    Object.keys(relation).forEach((e)=>{
        if(relation[e].生年!=null){
          if(relation[e].生年<year)year=relation[e].生年
        }
        else if(relation[e].卒年!=null){
            if(relation[e].卒年-50<year)year=relation[e].卒年-50
          }
    })
    year-=(year%50+50)
    setbegin(year)

    var tang=618
    var wudai=907
    var song=960
    var yuan = 1271;
    var ming=1368;
    var qing=1636;
    axis.append('line').attr('class','axis-mark-dy')
            .attr('x1',(yuan-year)*peryearlen).attr('y1',0).attr('x2',(yuan-year)*peryearlen).attr('y2',33)
            .style('stroke','rgba(0,0,0,0.2)').style('stroke-width',1.2)
            .attr("stroke-dasharray", "4,4");

            axis.append('text').attr('y', 27)
            .attr('x', (yuan-year)*peryearlen-30)
            .style('text-anchor', "start")
            .text('Yuan').style('font-family','STKaiti')
            .style('font-size', 30)
            .style('fill','rgba(0,0,0,0.2)');

            axis.append('line').attr('class','axis-mark-dy')
            .attr('x1',(ming-year)*peryearlen).attr('y1',0).attr('x2',(ming-year)*peryearlen).attr('y2',33)
            .style('stroke','rgba(0,0,0,0.2)').style('stroke-width',1.2)
            .attr("stroke-dasharray", "4,4");

            axis.append('text').attr('y', 27)
            .attr('x', (ming-year)*peryearlen-30)
            .style('text-anchor', "start")
            .text('Ming').style('font-family','STKaiti')
            .style('font-size', 30)
            .style('fill','rgba(0,0,0,0.2)');

            axis.append('line').attr('class','axis-mark-dy')
            .attr('x1',(qing-year)*peryearlen).attr('y1',0).attr('x2',(qing-year)*peryearlen).attr('y2',33)
            .style('stroke','rgba(0,0,0,0.2)').style('stroke-width',1.2)
            .attr("stroke-dasharray", "4,4");

            axis.append('text').attr('y', 27)
            .attr('x', (qing-year)*peryearlen-30)
            .style('text-anchor', "start")
            .text('Qing').style('font-family','STKaiti')
            .style('font-size', 30)
            .style('fill','rgba(0,0,0,0.2)');
            
    var tyear=year
    while(year<=2000){
            axis.append('line').attr('class','axis-mark')
            .attr('x1',(year-tyear)*peryearlen).attr('y1',0).attr('x2',(year-tyear)*peryearlen).attr('y2',10)
            .style('stroke','black').style('stroke-width',1.2)

            axis.append('text').attr('y', 27)
            .attr('x', (year-tyear)*peryearlen-20)
            .style('text-anchor', "start")
            .text(String(year))
            .style('font-size', 15)
            .style('fill','black');

        year+=50
    }  
    Object.keys(boome).forEach((e)=>{
        var time=Number(e)
        var event=boome[e]
        if(time>tyear){
            // axis.append('line').attr('class','axis-event')
            // .attr('x1',(time-tyear)*peryearlen).attr('y1',-2).attr('x2',(time-tyear)*peryearlen).attr('y2',35)
            // .style('stroke','rgba(220,20,60,0.5)').style('stroke-width',3)
            axis.append('circle').attr('class','axis-event')
            .attr('cx',(time-tyear)*peryearlen).attr('cy',15).attr('r',8)
            .style('fill','rgba(0,0,0,0.5)')
            .on('click',function(){
                d3.select('#tool-svg').selectChildren('*')?.remove()
                   tool.append('rect').attr('class','axis-event').attr('x',(time-tyear)*peryearlen).attr('y',60)
                    .attr('height',55).attr('width',event[0].length*17+30)
                    .attr('fill','rgba(0,0,0,0.3)')
                    tool.append('text').attr('y', 80)
                    .attr('x', (time-tyear)*peryearlen+15)
                    .style('text-anchor', "start")
                    .text(time+'年').style('font-family','STKaiti')
                    .style('font-size', 20)
                    .style('fill','white');
                    tool.append('text').attr('y', 105)
                    .attr('x', (time-tyear)*peryearlen+15)
                    .style('text-anchor', "start")
                    .text(event[0]).style('font-family','STKaiti')
                    .style('font-size', 17)
                    .style('fill','white');
    
                    setTimeout(() => {
                        d3.select('#tool-svg').selectChildren('*')?.remove()
                    }, 5000);
                    return 1;
            })
        }
    })}

        },[prop.whichCase, prop.person,prop.relation,person])      

        const handleClickT = ()=>{
            setShowType(!showType)
        }
        
        var f1=null,f2=null,thing=null,type=null,loc=null,ey=null,by=null

const changef1 =(e)=>{
 f1=e.target.value
}
const changef2 =(e)=>{
    f2=e.target.value
}
const changething =(e)=>{
    thing=e.target.value
}
const changetype =(e)=>{
    type=e.target.value
}
const changeloc =(e)=>{
    loc=e.target.value
}
const changeby =(e)=>{
    by=e.target.value
}
const changeey =(e)=>{
    ey=e.target.value
}

       
       const [changee, setchangee] = useState(null)
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('正在添加');
    setConfirmLoading(true);
    var obj = {
        f1:f1,
        f2:f2,
        thing:thing,
        type:type,
        loc:loc,
        by:by,
        ey:ey
    }
    setchangee(obj)
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
    f1=null
    f2=null
    thing=null
    type=null
    loc=null
    ey=null
    by=null
  };

    return(
        <div id="axis-container">
            <div class='main-axis'>
                <div id='long'>
                    <div id="tool">
                    <svg id='tool-svg'></svg>
                    </div>
            <div id='year-similar'>
                <SimilarPaint 
                begin={begin}
                positon={position}
                setPosition={setPosition}
                clickA={clickA}
                setClickA={setClickA}
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
                begin={begin}
                addEvent={changee}
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
            {!!position && (
        <div
          className="info"
          style={{
            transform: `translate(${position.x-450}px,${
              200
            }px)`
          }}
        > 
        <svg id= 'tool-tip' height ='600' width ="500">
            <image href = {hoverRect} x={0} y={0} height={140}></image>
            <image href = {switchPaint} x={60} y={10} height={70} ></image> 
            <image href = {lined} id ='line1' x={167} y={7} height={70}></image>
            <image href = {linkdata} x={205} y={-10} height={110} onClick = {handleClickL}></image> 
            <image href = {lined} id ='line2' x={333} y={7} height={70}></image>
            <image href = {bio} x={370} y={22} height={40}  onClick = {handleClickScroll}></image>
        </svg>
        </div>
      )}  
            <img src={simiTitle} id='simiTitle'></img>
            <img src={bioTitle} id='bioTitle'></img>
            <img src={biosample} id='biosample'></img>
            <div id='button-div'>
                <Button style={{ fontSize: '40px', height:'80px', width:'300px' }}
                onClick = {handleClickT}
                >{showType? 'switch to text': 'switch to paint'}</Button>
            </div> 
            <Tooltip placement="top" title='add event' style={{fontSize: 40}}>
                <Button shape='circle'  id='add-event' onClick={showModal} style={{fontSize: '35px', height:'70px', width:'70px'}}>
                    <PlusOutlined/>
                </Button>
            </Tooltip>
            
            <Modal
                open={open}
                centered
                confirmLoading={confirmLoading}
                footer={[
                    <Button key="cancel" style={{ fontSize: '40px', height:'80px', width:'300px' }} onClick={handleCancel}>
                      cancel
                    </Button>,
                    <Button key="ok" style={{ fontSize: '40px', height:'80px', width:'300px' }} type="primary" onClick={handleOk}>
                      save
                    </Button>,
                  ]}
            >
                <div style={{fontSize:40, marginTop:40,marginLeft:64}}>
                    Figure1:
                    <Input placeholder="Figure1"  style={{width: 300, height: 70, fontSize:45, marginLeft:30, marginRight:40}}
                    onChange={changef1}/>
                    Figure2:
                    <Input placeholder="Figure2"  style={{width: 300, height: 70, fontSize:45, marginLeft:30}}
                    onChange={changef2}/>
                </div>
                
                <div style={{fontSize:40, marginTop:40,marginLeft:97}}>
                    Thing:
                    <Input placeholder="Thing"  style={{ width: 800, height: 70, fontSize:45, marginLeft:30}}
                    onChange={changething}/>
                </div>
                <div style={{fontSize:40, marginTop:40,marginLeft:112}}>
                    Type:
                    <Input placeholder="Type"  style={{ width: 800, height: 70, fontSize:45, marginLeft:30}}
                    onChange={changetype}/>
                </div>
                <div style={{fontSize:40, marginTop:40,marginLeft:46}}>
                    Location:
                    <Input placeholder="Location"  style={{ width: 800, height: 70, fontSize:45, marginLeft:30}}
                    onChange={changeloc}/>
                </div>
                <div style={{fontSize:40, marginTop:40,marginLeft:10,marginBottom:70}}>
                    Begin year:
                    <Input  style={{width: 300, height: 70, fontSize:45, marginLeft:30, marginRight:40}}
                    onChange={changeby}/>
                    End year:
                    <Input  style={{width: 300, height: 70, fontSize:45, marginLeft:30}}
                    onChange={changeey}/>
                </div>
            </Modal>
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