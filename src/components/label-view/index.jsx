import React from 'react';
import './index.css';
import data from '../../data/894.json'

const DevideShow = () =>{
    const sentence = data.sentences
    console.log(sentence)
    
    const allsentence = sentence.map(function(e){
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
    })
    console.log(allsentence)

    return(
        <div className='container'>
            {
                allsentence.map(function(e,i){
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