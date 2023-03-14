import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import {bklocation,bkperson,bkthing,bktime} from "../../../assets"
import './index.css'
import person from '../../../data/seal-all.json';
import locationci from'../../../data/location.json'
import personci from'../../../data/person.json'
import timeci from'../../../data/time.json'
import thingci from'../../../data/thing.json'
import caorong from'../../../data/caorong.json'
import zhaomengfu from'../../../data/zhaomengfu.json'
import axios from 'axios';
import WordCloud from '../word-cloud';



const SealLink =(prop)=>{

    function Rotateind(x,y){
        var pi = Math.PI;
        var x1=x-220;
        var y1=220-y;
        var theta = Math.atan2(y1,x1)
        var phi = (prop.rotation/180)*pi;
        var r=Math.sqrt((x1*x1)+(y1*y1))
        var xr = 220+(r*Math.cos(theta-phi))
        var yr = 220-(r*Math.sin(theta-phi))

        return [xr,yr];

    }

   
    function highlight(d) {
        prop.setSelectedPerson(d);
    }    
    useEffect(()=>{       
    
        //印章人名连线
        d3.select("#seal-link-svg").selectChildren("*")?.remove();

        let width = 400
        let height = 400
        
        var svg = d3
        .select("#seal-link-svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 440 440")

        
        
        //var url="http://aailab.cn:28081/getlines/894/"+prop.selectedPerson
        // var url = 'http://aailab.cn:28081/getauinfoscore/894'
        // axios({
        //     method:"get",
        //     url:url,
        // }).then(function (res) {
        //     console.log(res.data);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // })


        let cluster = d3.cluster()
        .size([width, height - 80])
        

        let hierarchyData = d3.hierarchy(person)
        .sum(function (d) {
          return d.value
        })
      // 初始化树状图
      let treeData = cluster(hierarchyData)
      // 获取节点
      let nodes = treeData.descendants()
      // 获取边,也就是连线
      let links = treeData.links()
      // 绘制线
      let g = svg.append('g').attr('id','nodelink')

      var qingx=103;
      var qingy=138;
      var mingx=198;
      var mingy=88;
      var yuanx=308;
      var yuany=138;
      var wux=228;
      var wuy=178;

         
      var countq=1;
      var countm=0;
      var county=0;
      var countw=0;

      g.selectAll('.node')
      .data(nodes)
        .enter().append('g')
        .attr('class', function(d,i){
            if(d.depth===2){
            var basex, basey;
            var count;
            switch(d.parent.data.name){
                case"清": basex=qingx;basey=qingy;count=countq;countq++;break;
                case"元": basex=yuanx;basey=yuany;count=county;county++;break;
                case"明": basex=mingx;basey=mingy;count=countm;countm++;break;
                case"none": basex=wux;basey=wuy;count=countw;countw++;break;
            }
           if(count%2){
            d.y=basey+20;
           }
           else{
            d.y=basey;
           }
            d.x=(parseInt(count/2))*20+basex;
            
            return "node";
        }
        if(d.depth===3) {
            var [transx,transy]=Rotateind(d.data.indx,d.data.indy)
            d.x=transx;
            d.y=transy;
            return "node-seal"
        };
        })
        
        g.selectAll('.node').append('rect')
        .attr('x',(d)=>{return d.x-8}).attr('y',(d)=>{return d.y-8})
        .attr('width',16)
        .attr('height',16)
        .on('click',function(d){
            highlight(d.srcElement.__data__.data.name)
        })
        .style('fill','white')
        .style('stroke',function(d){
            var depth = d.data.allnum/650+0.2;
            if(depth>1)depth=1;
            return "RGB(122,32,2,"+depth+")"
        })
        .style('stroke-width',1.3)

        g.selectAll('.node').append('rect')
        .attr('x',(d)=>{return d.x-6}).attr('y',(d)=>{return d.y-6})
        .attr('width',12)
        .attr('height',12)
        .on('click',function(d){
            highlight(d.srcElement.__data__.data.name)
        })
        .style('fill',function(d){
            var depth = d.data.thisnum/10+0.2;
            if(depth>1)depth=1;
            return "RGB(151,99,95,"+depth+")"
        })
        
        var zx,zy,cx,cy;

        g.selectAll('.node').append('text')
        .attr('y', function (d) {
             return d.y+4 
        })
        .attr('x', function (d) { return d.x-5 })
        .on('click',function(d){
            
            highlight(d.srcElement.__data__.data.name)
        })
        .style('text-anchor', "start")
        .text(function(d){
            return d.data.name.substring(0,1);
        })
        .style('font-size', '9px')
        .style('fill','white');

        g.selectAll('.node-seal').append('circle')
        .attr('cx',(d)=>{return d.x}).attr('cy',(d)=>{return d.y})
        .attr('r',1.5)
        .style('fill',function(d){ 
            //console.log(prop.selectedPerson);              
            
            if(prop.selectedPerson===d.parent.data.name||prop.selectedPerson==='none')
            return"rgb(0,0,0,0.3)"
            else return"none"
            
        })
        .style('stroke', function(d){                
            
            if(prop.selectedPerson===d.parent.data.name||prop.selectedPerson==='none')
            return"rgb(0,0,0,1)"
            else return"none"
            
        })
        .style('stroke-width',0.5)

        
        g.selectAll(".link")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .style("stroke", function(d){  
                if(d.source.data.name==='趙孟頫'){
                    zx=d.source.x;
                    zy=d.source.y;
                }
                          
                if(prop.selectedPerson===d.source.data.name||prop.selectedPerson==='none')
                
                return"rgb(0,0,0,0.3)"
                else return"none"
                
            })
            .style('stroke-width',0.7)
            .style("fill", "none")
            .attr("pointer-events", "none")
            .attr(
                "d",
                d3.linkHorizontal()
                    .x(function (d) {
                        return d.x
                    })
                    .y(function (d) {
                        return d.y
                    })
            )

           // 赵孟頫连线
            //var ci = zhaomengfu.data.cylines;
            

            if(prop.selectedPerson==='趙孟頫'){

                let hierarchy = d3.hierarchy(zhaomengfu)
                    .sum(function (d) {
                    return d.value
                    })
                // 初始化树状图
                let tree2 = cluster(hierarchy)
                // 获取节点
                let nodes2 = tree2.descendants()
                // 获取边,也就是连线
                let links2 = tree2.links()
                //console.log(nodes2)
                var i=0;

                nodes2.map((e)=>{
                    console.log(prop.wordind)
                    //console.log(e);
                    if(e.height==1){
                        e.x=zx;
                        e.y=zy;
                    }
                    else{
                        for(var i=0 ; i<prop.wordind.length;i++){
                            if(e.data.text===prop.wordind[i].item[0]){
                                if(e.data.type==='Thing'){
                                    e.x=prop.wordind[i].dimension.x+135-69
                                    e.y=prop.wordind[i].dimension.y+210-16
                                    return
                                }
                                else if(e.data.type==='Location'){
                                    e.x=prop.wordind[i].dimension.x+135-70+130
                                    e.y=prop.wordind[i].dimension.y+210-16+80
                                    return
                                }
                                else if(e.data.type==='Person'){
                                    e.x=prop.wordind[i].dimension.x+135-40
                                    e.y=prop.wordind[i].dimension.y+210-16+68
                                    return
                                }
                                else if(e.data.type==='Time'){
                                    e.x=prop.wordind[i].dimension.x+135-60+130
                                    e.y=prop.wordind[i].dimension.y+210-12
                                    return
                                }
                                return
                            }
                        }
                        e.x=zx;
                        e.y=zy;
                    }
                })

                var wg=svg.append('g').attr('class','wordlink')
                wg.selectAll(".linkword")
                .data(links2)
                .enter()
                .append("path")
                .attr("class", "linkword")
                .attr('id',function(e){
                    return e.target.data.text
                })
                .style("stroke", function(d){  
                if(d.target.x==0) return'none';
                                        
                return"rgb(0,0,0,0.3)"

                })
                .style('stroke-width',0.7)
                .style("fill", "none")
                .attr("pointer-events", "none")
                .attr(
                "d",
                d3.linkHorizontal()
                .x(function (d) {
                    return d.x
                })
                .y(function (d) {
                    return d.y
                })
                )

                wg.selectAll(".nodes2")
                .data(nodes2)
                .enter()
                .append('circle')
                .attr('cx',(d)=>{return d.x}).attr('cy',(d)=>{return d.y})
        .attr('r',1)
        .style('fill',function(d){ 
            //console.log(prop.selectedPerson);              
            
            
            return"rgb(0,0,0,0.3)"
         
        })
        .style('stroke', function(d){                
            
           
            return"rgb(0,0,0,1)"
            
            
        })
        .style('stroke-width',0.5)
            }              



       
    },[prop.selectedPerson,prop.rotation,prop.wordind])
    

      return(
                  
            <div className="seal-link-container">
                <svg id="seal-link-svg"></svg>                
            </div>
           
      )

}

export default SealLink;

