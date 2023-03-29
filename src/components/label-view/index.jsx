import React, { useEffect, useState } from 'react';
import './index.css';
import { cbdb, hoverRect, iconpaint, labelSample, locfig, thingfig, timefig } from '../../assets';
import axios from 'axios';
import LabelText from './lable-text';
import { bio, linkdata,lined, linshi} from '../../assets';


const DevideShow = (prop) =>{
    const [position, setPosition] = useState(null)
    const [clickP, setClickP] = useState(null)
    const [clickType, setClickType] = useState(null)
    

    const handleClick = async ()=>{
      var id;
      var url = 'http://aailab.cn:28081/getonestringinfo?name='+clickP+'&stype=cperson'
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
      prop.setLinkedName(clickP)
      // if(clickP==="公謹") prop.setLinkedID('10183')
      // else prop.setLinkedID('17690')
    }

    const MatrixOnly =async()=>{
      var id;
      var url = 'http://aailab.cn:28081/getonestringinfo?name='+clickP+'&stype=cperson'
      await axios({
        method:"get",
        url:url,
          }).then(function (res) {
              id=(res.data.data[0].id)
          })
          .catch(function (error) {
              console.log(error);
          })
      prop.setMatrixID(String(id))
      prop.setMatrixName(clickP)
    }

    const handleClickScroll = async ()=>{   
      var scrollnew = []
      var id;
      var url = 'http://aailab.cn:28081/getonestringinfo?name='+clickP+'&stype=cperson'
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
      var url = 'http://aailab.cn:28081/getpersonscore?pid='+prop.whichCase+'&addnames='+clickP+'&addcids='+id
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
          //console.log(scrollnew)
          prop.setAddScroll(scrollnew)
    }
    const showInfo = ()=>{
      console.log(clickType)
      switch(clickType){                
        case 'Person':case'PersonName':
          return(
            <svg id= 'tool-tip' height ='600' width ="450">
            <image href = {hoverRect} x={0} y={0} height={120}></image>
            <image href = {iconpaint} x={20} y={10} height={60} onClick = {MatrixOnly}></image> 
            <image href = {cbdb} x={90} y={10} height={60} onClick = {MatrixOnly}></image> 
            <image href = {linshi} x={160} y={10} height={60} onClick = {MatrixOnly}></image> 
            <image href = {linkdata} x={220} y={5} height={80} onClick = {handleClick}></image> 
            <image href = {lined} x={300} y={7} height={70}></image>
            <image href = {bio} x={322} y={26} height={35} onClick = {handleClickScroll}></image>
             </svg>
          )
        case 'Location':case'LocationName':
          return(
            <div style={{transform: 'translate(100px,0)'}}>
              <img src={locfig} style={{height:120}}></img>
            </div>            
          )
          case 'Time':
          return(
            <div style={{transform: 'translate(100px,0)'}}>
              <img src={timefig} style={{height:120}}></img>
            </div>            
          )
          case 'Thing':
          return(
            <div style={{transform: 'translate(140px,0)'}}>
              <img src={thingfig} style={{height:120}}></img>
            </div>            
          )
      }
        
      
    }
   
    return(
        <div className='label-container'>
          <img src = {labelSample} id = 'labelSample'></img>
          <div id = 'text-container'>
            <LabelText 
            whichCase = {prop.whichCase}
            position={position}
            setPosition={setPosition}
            clickP = {clickP}
            setClickP = {setClickP}
            clickType = {clickType}
            setClickType = {setClickType}
            selectedPerson={prop.selectedPerson}/>         
         {!!position && (
        <div
          className="info"
          style={{
            transform: `translate(${position.x-2380}px,${
              position.y - 1920
            }px)`
          }}
        >
          
          {
            showInfo()
          }
            
                
                            
           
        </div>
      )}  
      </div> 
        </div>
    )

}

export default DevideShow;