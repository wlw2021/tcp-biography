import React, { useEffect, useState } from 'react';
import './index.css'
import { divide } from '../../assets';
import RingView from '../../components/ring-view';
import DevideShow from '../../components/label-view';
const Features =()=>{

      return(
        <div className='B-container'>
            <div id="ring-view-container">
                <RingView />                
            </div>    

            <div id="divide">
                <img src={divide} alt="分割线" />
            </div>     
            <div id="lable-view-container">
                <DevideShow />                
            </div>      
        </div>
           
      )

}

export default Features;

