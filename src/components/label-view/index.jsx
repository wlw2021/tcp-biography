import React, { useEffect, useState } from 'react';
import './index.css';
import data from '../../data/894.json'
import axios from 'axios';

const DevideShow = (prop) =>{

    var showdata = {
        output:[],
        sentence:''
    }

    const [showList,setShowList]=useState([])

    const devide = (e) =>{
        let output = e.output;
        let full = e.sentence;
        let devidedSentence = [];

        if(output.length!==0){
            if(output[0].start !== 0){
                let ele = full.substring(0,output[0].start);
                devidedSentence.push({span: ele, type: 'none'});
            }
            for(var i=0; i<output.length-1; i++){
                devidedSentence.push({span: output[i].span, type: output[i].type});
                if(output[i].end !== output[i+1].start){
                    let ele = full.substring(output[i].end,output[i+1].start);
                    devidedSentence.push({span: ele, type: 'none'});
                }
            }
            devidedSentence.push({span: output[i].span, type: output[i].type});
            let ele = full.substring(output[i].end);
            devidedSentence.push({span: ele, type: 'none'});
        }
        
        return devidedSentence;
    }

    useEffect(()=>{

        const showPerson = async()=>{
            var data2;
            var list=[];
            const url = 'http://aailab.cn:28081/resultner/894'
            await axios({
                method:"get",
                url:url,
            }).then(function (res) {
                data2 = res.data.data;
                console.log(data2)
            })
            .catch(function (error) {
                console.log(error);
            })


            if(prop.selectedPerson!='none'){
                for (var i =0;i<data2.length;i++){
                    if((data2[i].author===prop.selectedPerson)||(data2[i].author==='清高宗'&&prop.selectedPerson==='愛新覺羅弘曆')){
                        showdata.output=data2[i].output
                        showdata.sentence=data2[i].sentence
                        showdata=devide(showdata)
                        list.push(showdata)
                    }
                }                
            }

            else{
                data2.map((e)=>{
                    showdata.output=e.output
                    showdata.sentence=e.sentence
                    showdata=devide(showdata)
                    list.push(showdata)
                })
            }
            
            setShowList(list)
        }

        showPerson()
    },[prop.selectedPerson])
   
    return(
        <div className='container'>
            {
                showList.map(function(e,i){
                    const words = e;
                    return(
                        <div>
                            {words.map(function(e){
                                if(e.type === 'none'){
                                    return e.span;
                                }
                            return(
                                <mark className={e.type}>
                                    {e.span}
                                    
                                </mark>
                            )
                            })}
                            <br />
                            <br />
                        </div>  
                                          
                    )
                })
            }           
        </div>
    )

}

export default DevideShow;