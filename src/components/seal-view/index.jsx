import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import './index.css'
import person from '../../data/seal-all.json';
import axios from 'axios';
import { DRAW_MODES } from 'pixi.js';

const SealView = (prop) =>{

    const [isOver, setIsOver] = useState(true)

    useEffect(()=>{
        const namesize = 45;
        const interval = 15;
        const rectsize = 130;
        const boxwidht=270;
        const boxheight = 35;

    d3.select("#seal-view-svg").selectChildren("*")?.remove();
    var svg=d3.select("#seal-view-svg");

    var defs=svg.append("defs")
      var filter=defs.append("filter").attr("id", "shadow")

      filter.append('feGaussianBlur')
            .attr('in','SourcrGraphic')
            .attr('stdDeviation','2')
    
            if(prop.selectedPerson==='none'){
                svg.attr('height',(rectsize+interval)*186+namesize*19+18*190)
            }
            var currentx=0
            var currenty=45

    const drawPersonSeal = async (key, seals) =>{

         svg.append('text')
        .attr('class','seal-name')
        .attr('y', currenty)
        .attr('x', currentx)
        .style('text-anchor', "start")
        .text(key)
        .style('font-family', '宋体')
        .style('font-size', namesize)
        .style('font-weight',10)

        currenty += interval*2

        for(var i = 0;i<seals.length;i++){
            var e = seals[i]
            var typej,image64j
            var typey,image64y
            var content = e.top1.印章内容

        var url = 'http://aailab.cn:28081/getimg?imgid='+e.印章截图地址+'&imgtype=截图'
        await axios({
            method:"get",
            url:url,
        }).then(function (res) {
            //console.log(res.data)
            typej = res.data.data.note
            image64j=res.data.data.streamimg
        })
        .catch(function (error) {
            console.log(error);
        })

        url = 'http://aailab.cn:28081/getimg?imgid='+e.top1.印章匹配图地址+'&imgtype=匹配'
        await axios({
            method:"get",
            url:url,
        }).then(function (res) {
            //console.log(res.data)
            typey = res.data.data.note
            image64y=res.data.data.streamimg
        })
        .catch(function (error) {
            console.log(error);
        })

        var imgy = "data:image/"+typey+";base64,"+image64y
        var imgj = "data:image/"+typej+";base64,"+image64j

        var g=svg.append("g");
    

        g.append('rect')
        .attr('class','image-rect')
        .attr('x',interval*0.9)
        .attr('y',currenty)
        .attr('filter','url(#shadow)')
        .attr('width',rectsize)
        .attr('height',rectsize)                 
        .style('fill','black')

        g.append('rect')
        .attr('class','image-rect')
        .attr('x',interval*0.9)
        .attr('y',currenty)
        .attr('width',rectsize)
        .attr('height',rectsize)                 
        .style('fill','white')
        

        g.append('rect')
        .attr('class','image-rect')
        .attr('x',interval*2+rectsize)
        .attr('y',currenty)
        .attr('width',rectsize)
        .attr('height',rectsize)  
        .attr('filter','url(#shadow)')
        .style('fill','black');

        g.append('rect')
        .attr('class','image-rect')
        .attr('x',interval*2+rectsize)
        .attr('y',currenty)
        .attr('width',rectsize)
        .attr('height',rectsize)
        .style('fill','white');

        g.append('image')
        .attr('xlink:href',imgj)
        .attr('x',interval*1.2)
        .attr('y',currenty+interval*0.2)
        .attr('width',rectsize*0.9)
        .attr('height',rectsize*0.9);

        

        g.append('image')
        .attr('xlink:href',imgy)
        .attr('x',interval*2.2+rectsize)
        .attr('y',currenty+2)
        .attr('width',rectsize*0.9)
        .attr('height',rectsize*0.9);

        g.append('rect').attr('x',interval).attr('y',currenty+rectsize+8)
        .attr('width',boxwidht)
        .attr('height',boxheight)
        .style('fill','white')
        .style('stroke','black')
        .style('stroke-width',1.3);

        g.append('text')
        .attr('x',interval*1.2).attr('y',currenty+interval*0.2+rectsize+boxheight*0.9)
        .style('text-anchor', "start")            
        .style('font-size',30).style('font-family','仿宋')
        .style('fill','black').text(content)
        currenty+=rectsize+interval+boxheight+10
        }
        setIsOver(true)
        return true
    }

    const showSeal = async() =>{       

        var author = {}

        var url = 'http://aailab.cn:28081/getyinzhanglist/894'
        await axios({
            method:"get",
            url:url,
        }).then(function (res) {
            console.log(res.data)
            author = res.data.data
        })
        .catch(function (error) {
            console.log(error);
        })
        //console.log(author)
        
        Object.keys(author).map(async (key)=>{
            if(key===prop.selectedPerson||prop.selectedPerson==='none'){                
                var seals = author[key] 
                if(key===prop.selectedPerson){
                    var len = seals.length
                    svg.attr('height',(rectsize+interval*2+boxheight)*len+namesize+100)
                }
                
                await drawPersonSeal(key,seals)                
                
                currenty+=190
            }
        })
    }

    showSeal()

    

    //   person.children.map((e)=>{
    //     e.children.map((e)=>{
    //        // console.log(prop.selectedPerson)
    //         if(e.name===prop.selectedPerson||prop.selectedPerson==='none'){
                

            
    //     }            
    //     })
    //   })

    },[prop.selectedPerson])

    
    //   var g=svg.append("g");
    //   g.append('image')
    //   .attr('xlink:href',".seals/909_1__0.png")
    //   .attr('x',20)
    //   .attr('y',20)
    //   .attr('width',40)
    //   .attr('height',40);

    return(
        <div id = "seal-view">           
            <svg id = "seal-view-svg">
            </svg>
        </div>
    )
}

export default SealView;