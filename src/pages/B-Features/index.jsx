import React, { useEffect, useState } from 'react';
import './index.css'
import { divide } from '../../assets';
import RingView from '../../components/ring-view';
import DevideShow from '../../components/label-view';
import SealView from '../../components/seal-view';
const Features =()=>{
    const [selectedPerson, setSelectedPerson] = useState ("none")
      return(
        <div className='B-container'>
            <div id="ring-view-container">
                <RingView 
                 selectedPerson = {selectedPerson}
                 setSelectedPerson = {setSelectedPerson}
                />                
            </div>    

            <div id="divide">
                <img id='dividetu' src={divide} alt="分割线" />
            </div>  
            <div id="seal-container">
                <SealView 
                selectedPerson = {selectedPerson}
                setSelectedPerson = {setSelectedPerson}/>                               
            </div>    
            <div id="lable-view-container">
                <DevideShow 
                selectedPerson = {selectedPerson}
                setSelectedPerson = {setSelectedPerson}/>                
            </div>      
        </div>
           
      )

}

export default Features;

