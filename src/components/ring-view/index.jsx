import React, { useEffect, useRef, useState } from 'react';
import * as d3 from "d3";
import { logo, ringview, origin } from '../../assets';
import './index.css'
import WordCloud from './word-cloud';
import indpro from '../../data/reverse.json';
import SealLink from './seal-link';
import yuantu from '../../data/yuantu.json'
import axios from 'axios';




const RingView =(prop)=>{

    const ref = useRef();

    const [isZoom, setZoom]= useState(false);
    const [isDrag, setDrag] = useState(false)
    const [mx, setmx] = useState(0);
    const [my, setmy] = useState(0);
    const [rectx, setRectx] = useState(350)

    const [rotation, setRotation] = useState(45);

    const [wordind, setWordind] = useState([]);


    
    const handleEnter = (e) =>{
        //console.log('in')
        setZoom(true);
    }
    const handleLeave = (e) =>{
        //console.log(e.target)
        setZoom(false);
    }
    const handleMove = (e) =>{      
        //console.log('move'); 
        setmx(e.clientX-485-16);
        setmy(e.clientY-80);        
    }


    const handleDragDown=(e)=>{
        setDrag(true)
    }
    const handleDragMove=(e)=>{
        
        if(isDrag){
            setRectx(e.clientX-505)
        }

    }
    const handleDragUp=(e)=>{
        setRectx(e.clientX-505)
        setDrag(false)
    }


    function Rotateind(x,y){        
        var pi = Math.PI;
        var x1=x-220;
        var y1=220-y;
        var theta = Math.atan2(y1,x1)
        var phi = (rotation/180)*pi;
        var r=Math.sqrt((x1*x1)+(y1*y1))
        var xr = 220+(r*Math.cos(theta+phi))
        var yr = 220-(r*Math.sin(theta+phi))
        return [xr,yr];

    }

    function originxy(x1,y1){
        [x1,y1]=Rotateind(x1,y1);
        var pi=3.1415926;
        var xr=x1-220;
        var yr=220-y1;
        var r = Math.sqrt(xr*xr+yr*yr);
        var theta = Math.atan2(yr,xr)
        if(theta < 0)theta+=2*pi;
        var xo = (2*pi - theta) / (2 * pi/9000);
        var yo = (220 - r) / (67/1000);
        if(0<xo && xo<=9000 && 0<yo && yo<1000){
            xo=Math.floor(xo)
            yo=Math.floor(yo)                      
            xo=indpro[xo][yo]
            return[xo,yo]
        }
        else return [-1,-1]

    }

    const image = new Image();
    image.src = origin;
    
    useEffect(()=>{


        console.log(wordind)
        //鼠标鱼眼效果
        //console.log(indpro);
        var rotate = (1-yuantu[Math.floor((rectx/550)*18280)]/9000)*360-90
        setRotation(rotate)
        
        //console.log(rotate);
        
        var ring = document.getElementById('ringtu');
        ring.style.transform='rotate('+rotation+'deg)'

        var c=document.getElementById('zoom-view');
        c.width=800;
        c.height=550;
        var ctx=c.getContext('2d');
        var [xo,yo] = originxy(mx-60,my);

      
        
        if(!isZoom){
            ctx.clearRect(0,0,c.width,c.height);
        }
        
       
        if(isZoom&&yo>=0&&xo>=0){
            //ctx.clearRect(0,0,c.width,c.height);            
            ctx.rect(mx,my,200,100)
            ctx.stroke()
            image.onload = function(){
                ctx.drawImage(this,xo,yo,800,400,mx,my,200,100);
            }      
           
        } 

        var c2=document.getElementById('rotate-view')

        c2.width = 555;
        c2.height = 40;

        var ctx2=c2.getContext('2d');

        ctx2.clearRect(0,0,c2.width,c2.height);

        // var angle = ((rotation+90)%360)/360
        
        // var recx=555-(indpro[Math.floor(angle*9000)][0]/18280)*555+60;
        
        ctx2.rect(rectx-30,2,60,35.5);
        setRectx(rectx)

        ctx2.stroke()



    },[isZoom,mx,my,rotation,rectx,wordind])
    

      return(
        <div className='ring-view'>
            <div id="logo">
                <img src={logo} alt="标志" />
            </div>          

            <div id = 'ring-view'>
                <img src={ringview} id='ringtu'></img>

                

                <div id='seallink'
                onMouseOver={handleEnter}
                onMouseLeave={handleLeave}
                onMouseMove={handleMove}>
                    <SealLink    
                    wordind = {wordind}
                    selectedPerson = {prop.selectedPerson}
                    setSelectedPerson = {prop.setSelectedPerson}
                    rotation = {rotation}
                    />
                </div>
                <div id='wordcloud'>
                    <WordCloud 
                    wordind = {wordind}
                    setWordind = {setWordind}
                    /> 
                </div> 

                               
                
                <canvas id = 'zoom-view'></canvas>
            </div>

            <div id = 'origin'>
                <img src={origin} id='origintu'></img>
                <canvas id='rotate-view'
                onMouseDown={handleDragDown}
                onMouseUp={handleDragUp}
                onMouseMove={handleDragMove}
                ></canvas>
                
            </div>
                        
        </div>
           
      )

}

export default RingView;

