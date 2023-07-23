import axios from "axios";
import React, { useEffect, useState } from "react";
import './index.css'
import * as d3 from "d3";
import { bio, hoverRect, lined, linkdata, linshi, switchPaint } from "../../../assets";

const SimilarPaint = (prop) =>{
 

    const handleClickA=(e,a)=>{
        var left = e.clientX
        var top = e.clientY
        prop.setClickA(a)
        prop.setPosition({
            x:left,
            y:top
        })
        
        setTimeout(()=>{
            prop.setPosition(null)
            prop.setClickA(null)
        },5000)
    }

   
    //:true 画心相似 :false 文本相似
    useEffect(()=>{      
        prop.setNoneListP(null)

        d3.select("#year-similar-svg").selectChildren("*")?.remove();
        var ssvg = d3
        .select("#year-similar-svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 2595 110")

        var defs=ssvg.append("defs")
        var filter=defs.append("filter").attr("id", "shadow")

        filter.append('feGaussianBlur')
                .attr('in','SourcrGraphic')
                .attr('stdDeviation','2')


        var peryearlen=1700/810;
        const showSimilar = async () =>{           

            var authorlist={};            
            var similist;

            var url = 'http://localhost:28081/gethuaxin/'+prop.whichCase
            await axios({
                    method:"get",
                    url:url,
                }).then(function (res) {
                    console.log(res.data)
                    similist = res.data.data;
                })
                .catch(function (error) {
                    console.log(error);
                })

            const reRend = (name, x, key) =>{
                console.log(name)
                ssvg.selectAll('.'+name).remove()
                for(var i=0;i<similist.length;i++){
                    var simi = similist[i]   
                    //console.log(simi)                 
                    if(('pic'+simi.相似画作id)===name){
                       renderPic(simi,x, key)
                    }                                    
                }
            }

            const renderPic = async (pic,cx,key) =>{
                var type, image64;                  

                url = 'http://localhost:28081/getimg?imgid='+pic.相似画作图+'&imgtype=画心'
                await axios({
                        method:"get",
                        url:url,
                    }).then(function (res) {
                        type = res.data.data.note;
                        image64 = res.data.data.streamimg;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })

                var img = "data:image/"+type+";base64,"+image64
                
                var g = ssvg.append('g')
                    .attr('id', 'simipic'+'pic'+pic.相似画作id).attr('class','pic'+pic.相似画作id);
                g.append('rect')
                .attr('class','pic'+pic.相似画作id)
                .attr('x',cx-1)
                .attr('y',10)
                .attr('filter','url(#shadow)')
                .attr('width',162)
                .attr('height',90)                 
                .style('fill','rgba(0,0,0,0.5)')

                g.append('image')
                .attr('xlink:href',img)
                .attr('class','pic'+pic.相似画作id)
                .attr('x',cx)
                .attr('y',10)
                .attr("preserveAspectRatio", "none")
                .attr('height',90)
                .attr('width',160)                             

                g.append('rect')
                .attr('class','pic'+pic.相似画作id)
                .attr('x',cx).attr('y',80)
                .attr('height',20).attr('width',160)                            
                .style('fill','rgba(0,0,0,0.5)')
                .on('click',(e)=>{handleClickA(e, pic.作者)})
                
                g.append('rect')
                .attr('class','pic'+pic.相似画作id)
                .attr('x',cx).attr('y',0)
                .attr('height',106).attr('width',5)
                .attr('rx',20).attr('ry',2)
                .style('fill','#8c765f')

                var namelen=key.length
                var text = pic.画作名.substring(0,1) +' '+ pic.作者+' '+pic.画作名.substring(namelen+1)
                g.append('text')
                .attr('class','pic'+pic.相似画作id)
                .attr('x',cx+7).attr('y',94)
                .style('text-anchor', "start")            
                .style('font-size',12).style('font-family','STKaiti')
                .style('fill','white').text(text).on('click',(e)=>{handleClickA(e,pic.作者)})

                ssvg.on('click',(e)=>{
                    console.log(e)
                    var cln =  e.target.getAttribute("class")
                    var x =  e.target.getAttribute("x")
                    reRend(cln,x, key)
                })
                
            }
            var simitext = [];
            var simipaint = [];
            var countp=0;
            var countt=0;
            similist.forEach((e)=>{
                if(e.相似类型==='画心相似'&&countp<10){
                    simipaint.push(e);
                    countp++;
                }

                else if(e.相似类型==='文本相似'&&countt<10){
                    simitext.push(e);
                    countt++;
                }
            })
            var simis = []
            if(prop.showType){
                simis=simipaint;
            }
            else {
                simis=simitext;
            }
                for(var i=0;i<simis.length;i++){
                    var simi = simis[i]
                    
                    if(!authorlist.hasOwnProperty(simi.作者)){
                        authorlist[simi.作者]=[];
                    }
                    authorlist[simi.作者].push(simi)                       
                    }

                Object.keys(authorlist).map( async (key)=>{
                    if(key!='佚名'){
                        var cx=(authorlist[key][0].作者生年-950)*peryearlen
                        for(var i=0;i<authorlist[key].length;i++){
                           renderPic(authorlist[key][i],cx, key)
                            cx += 15;                                   
                        }
                    }
                })
                
                var noneList = authorlist['佚名']
                console.log(noneList)

                prop.setNoneListP(noneList)                
        }
        showSimilar()    
           
    },[prop.showType,prop.whichCase])


    return(
        <div id="similar-container">
            <svg id='year-similar-svg'></svg>   
     
      </div>  
                          
     
    )

}

export default SimilarPaint