import axios from "axios";
import React, { useEffect, useState } from "react";
import './index.css'
import { axis } from "../../assets";
import * as d3 from "d3";
import year from '../../data/year.json'

const TimeAxis = () =>{

    const senty = [14,11,4];

    

    useEffect(()=>{      
        
        d3.select("#year-layer-svg").selectChildren("*")?.remove();
        d3.select("#year-similar-svg").selectChildren("*")?.remove();
        var ssvg = d3
        .select("#year-similar-svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 1730 110")

        var defs=ssvg.append("defs")
        var filter=defs.append("filter").attr("id", "shadow")

        filter.append('feGaussianBlur')
                .attr('in','SourcrGraphic')
                .attr('stdDeviation','2')

        var svg = d3
        .select("#year-layer-svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 1730 300")

        var peryearlen=1700/810;

        const handleScrollClick = (e) =>{
            console.log(e.target)
        }


        const showSimilar = async () =>{

            

            var authorlist={};            
            var similist;
            //var cx=0;

            var url = 'http://aailab.cn:28081/gethuaxin/894'
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

                url = 'http://aailab.cn:28081/getimg?imgid='+pic.相似画作图+'&imgtype=画心'
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
                
                g.append('rect')
                .attr('class','pic'+pic.相似画作id)
                .attr('x',cx).attr('y',4)
                .attr('height',102).attr('width',5)
                .attr('rx',20).attr('ry',2)
                .style('fill','#8c765f')

                var namelen=key.length
                var text = pic.画作名.substring(0,1) +' '+ pic.作者+' '+pic.画作名.substring(namelen+1)
                g.append('text')
                .attr('class','pic'+pic.相似画作id)
                .attr('x',cx+7).attr('y',94)
                .style('text-anchor', "start")            
                .style('font-size',12).style('font-family','仿宋')
                .style('fill','white').text(text)

                ssvg.on('click',(e)=>{
                    console.log(e)
                    var cln =  e.target.getAttribute("class")
                    var x =  e.target.getAttribute("x")
                    reRend(cln,x, key)
                })
                
            }

                
                for(var i=0;i<similist.length;i++){
                    var simi = similist[i]
                    
                    if(!authorlist.hasOwnProperty(simi.作者)){
                        authorlist[simi.作者]=[];
                    }
                    authorlist[simi.作者].push(simi)                       
                }

                Object.keys(authorlist).map( async (key)=>{
                    if(key!='佚名'){
                        var cx=(authorlist[key][0].作者生年-1195)*peryearlen
                        for(var i=0;i<authorlist[key].length;i++){
                           renderPic(authorlist[key][i],cx, key)
                            cx += 15;                                   
                        }
                    }
                })
        }
        showSimilar()

        year.map((e)=>{
            if(e.birth==0){
                e.birth=e.death-50;
            }
            else if(e.death==0){
                e.death=e.birth+50;
            }
            var indx = (e.birth-1195)*peryearlen;
            var length = (e.death-e.birth)*peryearlen;
            var indy=(e.level-2)*63-10;

            //console.log(indy)
            
            var g = svg.append('g').attr('id','scroll'+e.name);

            //卷轴
            g.append('rect')
            .attr('x',indx+1).attr('y',indy+3.25)
            .attr('height',38.5).attr('width',length)
            .style('fill','#E4DAC5')
            .style('stroke','#8c765f')
            .style('stroke-width',1.4)
            
            g.append('rect')
            .attr('x',indx).attr('y',indy)
            .attr('rx',10).attr('ry',2)
            .attr('height',45).attr('width',2.5)
            .style('fill','#8c765f')

            g.append('rect')
            .attr('x',indx+length).attr('y',indy)
            .attr('rx',10).attr('ry',2)
            .attr('height',45).attr('width',2.5)
            .style('fill','#8c765f')

            g.append('line').attr('class','scroll-line')
            .attr('x1',indx+1).attr('y1',indy+22.5)
            .attr('x2',indx+length).attr('y2',indy+22.5)
            .style('stroke','#8c765f')
            .style('stroke-width',0.5)

            //人名方块
            g.append('rect')
            .attr('x',indx-43).attr('y',indy+3.5)
            .attr('width',38)
            .attr('height',38)
            .style('fill','white')
            .style('stroke',"RGB(122,32,2,1)")
            .style('stroke-width',2.5)
            

            g.append('rect')
            .attr('x',indx-40).attr('y',(d)=>indy+6.5)
            .attr('width',32).attr('height',32)
            .style('fill',"RGB(151,99,95,1)")
            
            g.append('text')
            .attr('y', indy+32).attr('x', indx-37)
            .style('text-anchor', "start")
            .text(e.name.substring(0,1))
            .style('font-size', '25px')
            .style('fill','white');

            var seal=e.seal;
            var sentence = e.sentence;
            var sealcount =0;
            var sentcount = 0;
            var lastyear=0;
            
            var indi = 0;

            sentence.map((e)=>{
                if(e.year==0) sentcount++;
                else{
                    var sentindx=(e.year-1195)*peryearlen;
                    var sentlen = e.content.length/10+5;
                    g.append('rect')
                    .attr('x',sentindx-sentlen).attr('y',()=>{
                        if((sentlen/peryearlen)>=e.year-lastyear){
                            indi++;
                            return indy+senty[indi%3];
                        }
                        else return indy+8;
                    })
                    .attr('width',sentlen).attr('height',8)
                    .style('fill',"RGB(173,166,150,0.2)")
                    .style('stroke',"black")
                    .style("stroke-width",0.6)
                    lastyear=e.year;
                }

            })

            if(sentcount){
                
                g.append('rect')
            .attr('x',indx+3).attr('y',indy+16.5)
            .attr('width',8).attr('height',12)
            .style('fill',"RGB(173,166,150,1)")
            .style('stroke',"black")
            .style("stroke-width",0.6)

            g.append('text')
            .attr('font-family', '宋体')
            .style('text-anchor', "start")
            .attr('x',()=>{               
                    if(sentcount>=10) return indx+3
                    else return indx+5
            }).attr('y',indy+25)
            .text(sentcount)
            .style('font-size', '8px')
            .style('fill','white');

            }

            seal.map((e)=>{
                if(e.year==0) sealcount++;
                else{
                    var sealindx=(e.year-1195)*peryearlen;
                    g.append('rect')
                    .attr('x',sealindx-8).attr('y',indy+30)
                    .attr('width',8).attr('height',8)
                    .style('fill',"RGB(104,29,23,0.53)")
                    .style('stroke',"RGB(104,29,23,1)")
                    .style("stroke-width",0.6)
                }                
            })
            if(sealcount){
                
                g.append('rect')
            .attr('x',()=>{
                if(sentcount===0){
                    return indx+4
                }
                else{
                    return indx+12;
                }
            }).attr('y',indy+18.5)
            .attr('width',8).attr('height',8)
            .style('fill',"RGB(104,29,23,0.53)")
            .style('stroke',"RGB(104,29,23,1)")
            .style("stroke-width",0.6)

            g.append('text')
            .attr('font-family', '宋体')
            .style('text-anchor', "start")
            .attr('x',()=>{
                if(sentcount===0){
                    if(sealcount>=10) return indx+4
                    else return indx+6
                }
                else{
                    if(sealcount>=10) return indx+12;
                    else return indx+14;
                }
                
            }).attr('y',indy+25)
            .text(sealcount)
            .style('font-size', '8px')
            .style('fill','white');

            }

            

            sealcount=0;
            sentcount = 0

        })

    },[])

    return(
        <div id="axis-container">
            <svg id='year-similar-svg'></svg>
            <div id = "axis">
                <img src={axis} id = "axistu"></img>
            </div>
            <svg id="year-layer-svg"></svg>
        </div>
    )

}

export default TimeAxis