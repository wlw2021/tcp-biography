import React, { useEffect, useState } from 'react';
import './index.css'
import { divide } from '../../assets';
import ForceView from '../../components/force-view';
import MatrixView from '../../components/matrix-view';
const Relation =()=>{

   const [linkedid, setLinkedid] = useState('17690')

    useEffect(()=>{
        
    },[])
    

      return(
        <div className='D-container'>
            <div id="relation-link">
              <ForceView 
              linkedid = {linkedid}
              setLinkedid = {setLinkedid}/>                             
            </div>    

            <div id="divide2">
                <img id='dividetu2' src={divide} alt="分割线" />
            </div>  
            <div id="relation-matrix">
              <MatrixView />                              
            </div>          
        </div>
           
      )

}

export default Relation;

