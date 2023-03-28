import React, { useEffect, useState } from 'react';
import './index.css';
import { hoverRect, labelSample } from '../../assets';
import axios from 'axios';
import LabelText from './lable-text';
import { bio, linkdata,lined, linshi} from '../../assets';


const DevideShow = (prop) =>{
    const [position, setPosition] = useState(null)
    const [clickP, setClickP] = useState(null)
    

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
            <svg id= 'tool-tip' height ='600' width ="450">
                
                <image href = {hoverRect} x={0} y={0} height={120}></image>
                <image href = {linshi} x={160} y={10} height={60} onClick = {MatrixOnly}></image> 
                <image href = {linkdata} x={220} y={5} height={80} onClick = {handleClick}></image> 
                <image href = {lined} x={300} y={7} height={70}></image>
                <image href = {bio} x={315} y={12} height={60} onClick = {handleClickScroll}></image>            
            </svg>
        </div>
      )}  
      </div> 
        </div>
    )

}

export default DevideShow;