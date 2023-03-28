import React, { useEffect, useState } from 'react';
import './index.css'
import { divide } from '../../assets';
import ForceView from '../../components/force-view';
import MatrixView from '../../components/matrix-view';
const Relation =(prop)=>{


    useEffect(()=>{
        console.log(prop,'D')
    },[])
    

      return(
        <div className='D-container'>
            <div id="relation-link">
              <ForceView 
              whichCase={prop.whichCase}
              linkedID = {prop.linkedID}
              setLinkedID = {prop.setLinkedID}/>                             
            </div>    

            <div id="divide2">
                <img id='dividetu2' src={divide} alt="分割线" />
            </div>  
            <div id="relation-matrix">
              <MatrixView 
              matrixID = {prop.matrixID}
              setMatrixID = {prop.setMatrixID}
              matrixName = {prop.matrixName}
              setMatrixName = {prop.setMatrixName}
              whichCase={prop.whichCase}
              linkedID = {prop.linkedID}
              setLinkedID = {prop.setLinkedID}
              linkedName={prop.linkedName}
              setLinkedName={prop.setLinkedName}/>                              
            </div>          
        </div>
           
      )

}

export default Relation;

