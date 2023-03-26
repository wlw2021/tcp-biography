import React, { useEffect, useState } from 'react';
import TimeAxis from '../../components/time-axis';
import './index.css'
//import { logo } from '../../assets';
const Appreciation =(prop)=>{

    useEffect(()=>{
        
    },[])
    

      return(
        <div className='C-container'>
            <TimeAxis 
            addScroll = {prop.addScroll}
            setAddScroll = {prop.setAddScroll}/>         
        </div>
           
      )

}

export default Appreciation;

