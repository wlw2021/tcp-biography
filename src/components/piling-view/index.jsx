import React, { useEffect, useState } from 'react';
import createPilingJs, { createImageRenderer } from 'piling.js';
import axios from 'axios';


const PilingView =()=>{

    const [image64, setimage64] = useState('')

    useEffect(()=>{

      var url = 'http://localhost:28081/getpainting/894'
    //   axios({
    //       method:"get",
    //       url:url,
    //   }).then(function (res) {
    //       console.log(res.data);
    //       setimage64(res.data.data)
    //   })
    //   .catch(function (error) {
    //       console.log(error);
    //   })


        // const piling = createPilingJs(document.getElementById('pics'), {
        //     items: [
        //       { src: pic },
        //       { src: 'https://storage.googleapis.com/pilingjs/coco-cars/000000218397.jpg' },
        //       { src: 'https://storage.googleapis.com/pilingjs/coco-cars/000000342185.jpg' },
        //       { src: 'https://storage.googleapis.com/pilingjs/coco-cars/000000383158.jpg' },
        //     ],
        //     itemRenderer: createImageRenderer(),
        //     columns: 4,
        //     darkMode: true
        //   });
    },[])
    

      return(
            <div id = 'pile-container' style={{height: 500, width: 400}}>
                {/* <img src={"data:image/jpg;base64,"+image64} ></img> */}
            </div>           
      )

}

export default PilingView;

