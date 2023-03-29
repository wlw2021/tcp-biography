import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import './index.css'
import axios from 'axios';


const SealView = (prop) =>{
    useEffect(()=>{
        var sealStart={}
        const namesize = 45;
        const interval = 35;
        const leftm = 15;
        const rectsize = 130;
        const boxwidht=280;
        const boxheight = 40;

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
        .attr('y', sealStart[key])
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
    

        // g.append('rect')
        // .attr('class','image-rect')
        // .attr('x',leftm*0.9)
        // .attr('y',sealStart[key]+i*(rectsize+boxheight+interval)+interval)
        // .attr('filter','url(#shadow)')
        // .attr('width',rectsize)
        // .attr('height',rectsize)                 
        // .style('fill','black')

        g.append('rect')
        .attr('class','image-rect')
        .attr('x',leftm*0.9)
        .attr('y',sealStart[key]+i*(rectsize+boxheight+interval)+interval)
        .attr('width',rectsize)
        .attr('height',rectsize)                 
        .style('fill','white')
        .style('stroke','rgba(0,0,0,0.3)')
        .style('stroke-width',2)
        

        // g.append('rect')
        // .attr('class','image-rect')
        // .attr('x',leftm*2+rectsize)
        // .attr('y',sealStart[key]+i*(rectsize+boxheight+interval)+interval)
        // .attr('width',rectsize)
        // .attr('height',rectsize)  
        // .attr('filter','url(#shadow)')
        // .style('fill','black');

        g.append('rect')
        .attr('class','image-rect')
        .attr('x',leftm*2+rectsize)
        .attr('y',sealStart[key]+i*(rectsize+boxheight+interval)+interval)
        .attr('width',rectsize)
        .attr('height',rectsize)
        .style('fill','white')
        .style('stroke','rgba(0,0,0,0.3)')
        .style('stroke-width',2);

        g.append('image')
        .attr('xlink:href',imgj)
        .attr('x',leftm*1.2)
        .attr('y',sealStart[key]+i*(rectsize+boxheight+interval)+interval+interval*0.2)
        .attr('width',rectsize*0.9)
        .attr('height',rectsize*0.9);

        

        g.append('image')
        .attr('xlink:href',imgy)
        .attr('x',leftm*2.2+rectsize)
        .attr('y',sealStart[key]+i*(rectsize+boxheight+interval)+interval+2)
        .attr('width',rectsize*0.9)
        .attr('height',rectsize*0.9);

        g.append('rect').attr('x',leftm).attr('y',interval+sealStart[key]+i*(rectsize+boxheight+interval)+rectsize+15)
        .attr('width',boxwidht)
        .attr('height',boxheight)
        .attr('rx',5).attr('ry',5)
        .style('fill','white')
        .style('stroke','rgba(0,0,0,0.6)')       
        .style('stroke-width',2);

        g.append('text')
        .attr('x',leftm*1.3).attr('y',interval+sealStart[key]+i*(rectsize+boxheight+interval)+interval*0.3+rectsize+boxheight-1)
        .style('text-anchor', "start")            
        .style('font-size',27).style('font-family','宋体').style('font-weight',15)
        .style('fill','black').text(content)
        
        }
    }

    const showSeal = async() =>{       

        var author = {}

        var url = 'http://aailab.cn:28081/getyinzhanglist/'+prop.whichCase
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
        var cy=0;
        if(prop.selectedPerson === 'none'){
            Object.keys(author).map(async (key)=>{
                sealStart[key]=cy+namesize;
                var len=author[key].length
                cy+=len*(interval+rectsize+boxheight+namesize)+120;
            })
        }

        else{
            sealStart[prop.selectedPerson]=cy+namesize;
        }

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