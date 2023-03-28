import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import { logo, ringview, origin, xyorigin, xyring, qhTitle, qhsample } from '../../assets';
import './index.css'
import WordCloud from './word-cloud';
import indqh from '../../data/reverse.json';
import indxy from '../../data/xynew2old.json'
import SealLink from './seal-link';
import yuantu1 from '../../data/yuantu.json'
import yuantu2 from '../../data/xyyuantu.json'


const RingView =(prop)=>{
    var yuantu

    const picid=prop.whichCase
    var indpro
    
    const [isZoom, setZoom]= useState(false);
    const [isDrag, setDrag] = useState(false)
    const [mx, setmx] = useState(0);
    const [my, setmy] = useState(0);
    const [rectx, setRectx] = useState(350)
    const [rotation, setRotation] = useState(45);
    const [wordind, setWordind] = useState([]);
    

    const ringr=660;


    
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
        setmx(e.clientX);
        setmy(e.clientY-280);        
    }


    const handleDragDown=(e)=>{
        setDrag(true)
    }
    const handleDragMove=(e)=>{
        
        if(isDrag){
            setRectx(e.clientX)
        }

    }
    const handleDragUp=(e)=>{
        setRectx(e.clientX)
        setDrag(false)
    }


    function Rotateind(x,y){        
        var pi = Math.PI;
        var x1=x-ringr;
        var y1=ringr-y;
        var theta = Math.atan2(y1,x1)
        var phi = (rotation/180)*pi;
        var r=Math.sqrt((x1*x1)+(y1*y1))
        var xr = ringr+(r*Math.cos(theta+phi))
        var yr = ringr-(r*Math.sin(theta+phi))
        return [xr,yr];

    }

    function originxy(x1,y1){
        [x1,y1]=Rotateind(x1,y1);
        var pi=3.1415926;
        var xr=x1-ringr;
        var yr=ringr-y1;
        var r = Math.sqrt(xr*xr+yr*yr);
        var theta = Math.atan2(yr,xr)
        if(theta < 0)theta+=2*pi;
        var xo = (2*pi - theta) / (2 * pi/9000);
        var yo = (ringr - r) / (201/1000);
        if(0<xo && xo<=9000 && 0<yo && yo<1000){
            xo=Math.floor(xo)
            yo=Math.floor(yo)                      
            xo=indpro[xo][yo]
            return[xo,yo]
        }
        else return [-1,-1]

    }

    const image = new Image();

    if(prop.cases === '894'){
        image.src = origin;
    }
    
    else image.src = xyorigin
    
    useEffect(()=>{
        var len;
        if(prop.whichCase==='13941'){
            len=24830;
            indpro = indxy
            yuantu = yuantu2
            yuantu.forEach((e,i)=>{
                if(e<0){
                    if(i>1)
                    e=yuantu[i-1]
                    else e=0;
                }
            })
        }
        else {
            len=18280;
            indpro = indqh
            yuantu = yuantu1
        }
        //console.log(wordind)
        //鼠标鱼眼效果
        //console.log(indpro);
        var rotate = (1-yuantu[Math.floor((rectx/1650)*len)]/9000)*360-90
        setRotation(rotate)
        
        //console.log(rotate);
        
        var ring = document.getElementById('ringtu');
        ring.style.transform='rotate('+rotation+'deg)'

        var c=document.getElementById('zoom-view');
        c.width=2400;
        c.height=1650;
        var ctx=c.getContext('2d');
        var [xo,yo] = originxy(mx-180,my);

      
        
        if(!isZoom){
            ctx.clearRect(0,0,c.width,c.height);
        }
        
       
        if(isZoom&&yo>=0&&xo>=0){
            //ctx.clearRect(0,0,c.width,c.height);            
            ctx.rect(mx,my,600,300)
            ctx.stroke()
            image.onload = function(){
                ctx.drawImage(this,xo-300,yo-300,800,400,mx,my,600,300);
            }      
           
        } 

        var c2=document.getElementById('rotate-view')

        c2.width = 1665;
        c2.height = 135;

        var ctx2=c2.getContext('2d');

        ctx2.clearRect(0,0,c2.width,c2.height);

        // var angle = ((rotation+90)%360)/360
        
        // var recx=555-(indpro[Math.floor(angle*9000)][0]/18280)*555+60;
        
        ctx2.lineWidth = 3;
        ctx2.fillStyle = "RGBA(0,0,0,0.3)"
        ctx2.fillRect(rectx-90,13,180,107);
        ctx2.rect(rectx-90,13,180,107);

        setRectx(rectx)

        ctx2.stroke()
    },[isZoom,mx,my,rotation,rectx,wordind])
    

      return(
        <div className='ring-view'>
            <div id="logo">
                <img src={logo} alt="标志" />
            </div>  
            <img src={qhTitle} id='qhTitle'></img> 
            <img src={qhsample} id='qhsample'></img>
        <div id ='main'>     

            <div id = 'ring-view'>
                <img src={picid==='894'?ringview:xyring} id='ringtu'></img>

                <div id='wordcloud'>
                    <WordCloud 
                    wordind = {wordind}
                    setWordind = {setWordind}
                    whichCase = {prop.whichCase}
                    /> 
                </div> 

                

                <div id='seallink'
                onMouseOver={handleEnter}
                onMouseLeave={handleLeave}
                onMouseMove={handleMove}>
                    <SealLink    
                    whichCase = {prop.whichCase}
                    wordind = {wordind}
                    selectedPerson = {prop.selectedPerson}
                    setSelectedPerson = {prop.setSelectedPerson}
                    rotation = {rotation}
                    />
                </div>
                

                               
                
                <canvas id = 'zoom-view'></canvas>
            </div>

            <div id = 'origin'>
                <img src={picid==='894'?origin:xyorigin} id='origintu'></img>
                <canvas id='rotate-view'
                onMouseDown={handleDragDown}
                onMouseUp={handleDragUp}
                onMouseMove={handleDragMove}
                ></canvas>
                
            </div>
            </div>
                        
        </div>
           
      )

}

export default RingView;

