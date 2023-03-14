import React, { useEffect } from 'react';
import './index.css'
import PilingView from '../../components/piling-view';

const Overview =()=>{

    useEffect(()=>{
        // const piling = createPilingJs(document.getElementById('pics'), {
        //     items: [
        //       { src: pic },
        //       { src: pic },
        //       { src: pic },
        //       { src: pic },
        //       { src: pic },
        //       { src: pic },
        //       { src: pic },
        //       { src: pic },
        //       { src: pic },
        //       { src: pic },
        //       { src: pic },
        //       { src: pic },
        //       { src: pic },
        //       { src: pic }
        //     ],
        //     itemRenderer: createImageRenderer(),
        //     columns: 5,
        //     darkMode: true
        //   });
    },[])
    

      return(
        <div className='A-container'>
            <div id='searchbox'>
              <PilingView />              
              </div>            
            <div id = 'pics' ></div>                
        </div>
           
      )

}

export default Overview;

