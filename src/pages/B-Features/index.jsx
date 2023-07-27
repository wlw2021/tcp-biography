import React, { useEffect, useState } from 'react';
import './index.css'
import { divide } from '../../assets';
import RingView from '../../components/ring-view';
import DevideShow from '../../components/label-view';
import SealView from '../../components/seal-view';
const Features =(prop)=>{
    const [selectedPerson, setSelectedPerson] = useState ("none")
    
      return(
        <div className='B-container'>
            <div id="ring-view-container">
                <RingView 
                picid={prop.picid}
                whichCase={prop.whichCase}
                 selectedPerson = {prop.selectedPerson}
                 setSelectedPerson = {prop.setSelectedPerson}
                />                
            </div>    

            <div id="divide">
                <img id='dividetu' src={divide} alt="分割线" />
            </div>  
            <div id="seal-container">
                <SealView 
                whichCase={prop.whichCase}
                selectedPerson = {prop.selectedPerson}
                setSelectedPerson = {prop.setSelectedPerson}/>                               
            </div>    
            <div id="lable-view-container">
                <DevideShow 
                whichCase={prop.whichCase}
                linkedID={prop.linkedID}
                setLinkedID={prop.setLinkedID}
                linkedName={prop.linkedName}
                setLinkedName={prop.setLinkedName}
                matrixID = {prop.matrixID}
                setMatrixID = {prop.setMatrixID}
                matrixName = {prop.matrixName}
                setMatrixName = {prop.setMatrixName}
                addScroll = {prop.addScroll}
                setAddScroll = {prop.setAddScroll}
                selectedPerson = {prop.selectedPerson}
                setSelectedPerson = {prop.setSelectedPerson}/>                
            </div>      
        </div>
           
      )

}

export default Features;

