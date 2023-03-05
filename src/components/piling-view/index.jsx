import React, { useEffect, useState } from 'react';
import createPilingJs, { createImageRenderer } from 'piling.js';
import pic from "../../assets/overview/6.jpg"

const PilingView =()=>{

    useEffect(()=>{
        const piling = createPilingJs(document.getElementById('pics'), {
            items: [
              { src: pic },
              { src: 'https://storage.googleapis.com/pilingjs/coco-cars/000000218397.jpg' },
              { src: 'https://storage.googleapis.com/pilingjs/coco-cars/000000342185.jpg' },
              { src: 'https://storage.googleapis.com/pilingjs/coco-cars/000000383158.jpg' },
            ],
            itemRenderer: createImageRenderer(),
            columns: 4,
            darkMode: true
          });
    },[])
    

      return(
            <div id = 'pile-container' style={{height: 500, width: 400}}>
                <div id='pics' style={{height: 500, width: 400}}></div>
            </div>           
      )

}

export default PilingView;

