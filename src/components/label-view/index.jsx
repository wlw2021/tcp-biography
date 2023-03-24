import React, { useEffect, useState } from 'react';
import './index.css';

import axios from 'axios';
import LabelText from './lable-text';
import { bio, linkdata,lined } from '../../assets';


const DevideShow = (prop) =>{
    const [position, setPosition] = useState(null)
    const [clickP, setClickP] = useState(null)
    

    const handleClick = ()=>{
      
      if(clickP==="公謹") prop.setLinkedID('10183')
      else prop.setLinkedID('17690')
    }
   
    return(
        <div className='label-container'>
            <LabelText 
            position={position}
            setPosition={setPosition}
            clickP = {clickP}
            setClickP = {setClickP}
            selectedPerson={prop.selectedPerson}/>         
         {!!position && (
        <div
          className="info"
          style={{
            transform: `translate(${position.x-2270}px,${
              position.y - 1920
            }px)`
          }}
        >
            <svg id= 'tool-tip' height ='600' width ="450">
                <rect width ='220' height='90' fill='white' stroke='black' strokeWidth={3}></rect> 
                <image href = {linkdata} x={15} y={5} height={80} onClick = {handleClick}></image> 
                <image href = {lined} x={85} y={7} height={70}></image>
                <image href = {bio} x={95} y={12} height={60}></image>            
            </svg>
        </div>
      )}   
        </div>
    )

}

export default DevideShow;