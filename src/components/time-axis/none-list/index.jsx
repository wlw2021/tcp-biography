import axios from "axios";
import React, { useEffect, useState } from "react";
import './index.css'
import * as d3 from "d3";

const NoneDisplay = (prop) =>{
    useEffect(()=>{
        
        if(!prop.noneListP&&!prop.noneListS)return
        var iy = 30;
        var nx=40;
        
        console.log(prop)
        d3.select("#none-svg").selectChildren("*")?.remove();

        var nsvg = d3
        .select("#none-svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 230 475")
        
        const noneList = prop.noneListP
        const noneListS=prop.noneListS
        var ylen = 20

        if(noneList){
        noneList.forEach(async (pic)=>{
            var type, image64
            var url = 'http://aailab.cn:28081/getimg?imgid='+pic.相似画作图+'&imgtype=画心'
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
        
        var g = nsvg.append('g')
            .attr('id', 'simipic'+'pic'+pic.相似画作id).attr('class','pic'+pic.相似画作id);

        g.append('image')
        .attr('xlink:href',img)
        .attr('class','pic'+pic.相似画作id)
        .attr('x',nx)
        .attr('y',iy)
        .attr("preserveAspectRatio", "none")
        .attr('height',90)
        .attr('width',160)                             

        g.append('rect')
        .attr('class','pic'+pic.相似画作id)
        .attr('x',nx).attr('y',80+iy)
        .attr('height',20).attr('width',160)                            
        .style('fill','rgba(0,0,0,0.5)')

        g.append('text')
        .attr('class','pic'+pic.相似画作id)
        .attr('x',nx+7).attr('y',iy+92)
        .style('text-anchor', "start")            
        .style('font-size',12).style('font-family','仿宋')
        .style('fill','white').text(pic.画作名)
        iy+=ylen
        })
    }

    if(noneListS){
        if(noneList)iy+=30
        setTimeout(()=>{
            noneListS.forEach((e,i)=>{
                var g = nsvg.append('g').attr('id', 'noneauther'+e.name)

                g.append('rect').attr('x',nx).attr('y',iy+90+i*50).attr('width',160).attr('height',40)
                .attr('fill','none').attr('stroke','rgb(0,0,0,0.3)').attr('stroke-width',2)

                g.append('text').attr('y', iy+90+i*50+30).attr('x', ()=>{
                    if(e.name.length<3) return nx+52.5
                else return nx+40})
                .style('font-family','宋体')
                .style('text-anchor', "start").text(e.name).style('font-size', '25px')
                .style('fill','rgb(0,0,0,0.5)');
            })
        },300)
    }
        
    },[prop])

    return(
        <div id = 'none-container'>
            <svg id = 'none-svg'></svg>
        </div>
    )
}

export default NoneDisplay