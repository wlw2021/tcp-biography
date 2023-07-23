import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import './index.css'
import person1 from '../../../data/seal-all.json';
import person2 from '../../../data/seal-allxy.json';
import axios from 'axios';


const SealLink =(prop)=>{    
    var personind=[];
    var person
    if(prop.whichCase==='13941')person=person2
    else person=person1
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

        personind=[]
    
        //印章人名连线
        d3.select("#seal-link-svg").selectChildren("*")?.remove();
        var svg = d3
        .select("#seal-link-svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 440 440")

        

        let width = 400
        let height = 400
       
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
        .enter().append('g').attr('id',(d)=>(d.data.name))
        .attr('class', function(d,i){
            if(d.depth===2){
            var basex, basey;
            var count;
            switch(d.parent.data.name){
                case"清": basex=qingx;basey=qingy;count=countq;countq++;break;
                case"元": basex=yuanx;basey=yuany;count=county;county++;break;
                case"明": basex=mingx;basey=mingy;count=countm;countm++;break;
                case"None": basex=wux;basey=wuy;count=countw;countw++;break;
            }
           if(count%2){
            d.y=basey+20;
           }
           else{
            d.y=basey;
           }
            d.x=(parseInt(count/2))*20+basex;

            

            var indinfo = {
                name:d.data.name,
                x:d.x,
                y:d.y
            }

            personind.push(indinfo)
            
            return "node";
        }
        if(d.depth===3) {
            var [transx,transy]=Rotateind(d.data.indx,d.data.indy)
            d.x=transx;
            d.y=transy;
            return "node-seal"
        };
        })
        
        var eles=g.selectAll('.node')._groups[0]
        
        eles.forEach((e)=>{
            var d=e.__data__;
            var b = svg.append('g').attr('id','node'+d.data.name).attr('class','blocks')

            b.on('click',()=>{
                     prop.setSelectedPerson(d.data.name)})

            if(d.data.name==='趙孟頫'){
                b.on('click',()=>{
                    prop.setSelectedPerson(d.data.name)})

                b.append('circle')
                .attr('cx',()=>{return d.x}).attr('cy',()=>{return d.y})
                .attr('r',9)
                .style('fill','white')
                .style('stroke',function(){
                    var depth = d.data.allnum/650+0.2;
                    if(depth>1)depth=1;
                    return "RGB(122,32,2,"+depth+")"
                })
                .on('click',()=>{
                                    prop.setSelectedPerson(d.data.name)})
                .style('stroke-width',1.3)

                b.append('circle')
                .attr('cx',()=>{return d.x}).attr('cy',()=>{return d.y})
                .attr('r',7)
                .style('fill',function(){
                    var depth = d.data.thisnum/10+0.2;
                    if(depth>1)depth=1;
                    return "RGB(151,99,95,"+depth+")"
                })
                .on('click',()=>{
                  prop.setSelectedPerson(d.data.name)})
                

                b.append('text')
                .attr('y', function () {
                    return d.y+4 
                })
                .attr('x', function () { return d.x-5 })
                .style('text-anchor', "start")
                .text(function(){
                    if(d.data.name[0]==='愛') return d.data.name.substring(4,5);
                    return d.data.name.substring(0,1);
                })
                .style('font-size', '9px')
                .style('fill','white');
            }
            else{
                b.append('rect')
                .attr('x',()=>{return d.x-8}).attr('y',()=>{return d.y-8})
                .attr('width',16)
                .attr('height',16)                
                .style('fill','white')
                .style('stroke',function(){
                    var depth = d.data.allnum/650+0.2;
                    if(depth>1)depth=1;
                    return "RGB(122,32,2,"+depth+")"
                })
                .style('stroke-width',1.3)

                b.append('rect')
                .attr('x',()=>{return d.x-8}).attr('y',()=>{return d.y-8})
                .attr('width',16)
                .attr('height',16)
                .style('fill','white')
                .style('stroke',function(){
                    var depth = d.data.allnum/650+0.2;
                    if(depth>1)depth=1;
                    return "RGB(122,32,2,"+depth+")"
                })
                .style('stroke-width',1.3)

                b.append('rect')
                .attr('x',()=>{return d.x-6}).attr('y',()=>{return d.y-6})
                .attr('width',12)
                .attr('height',12)
                .style('fill',function(){
                    var depth = d.data.thisnum/10+0.2;
                    if(depth>1)depth=1;
                    return "RGB(151,99,95,"+depth+")"
                })
                

                b.append('text')
                .attr('y', function () {
                    return d.y+4 
                })
                .attr('x', function () { return d.x-5 })
                .style('text-anchor', "start")
                .text(function(){
                    if(d.data.name[0]==='愛') return d.data.name.substring(4,5);
                    return d.data.name.substring(0,1);
                })
                .style('font-size', '9px')
                .style('fill','white');
            }

        })

        
        
        g.selectAll('.node-seal').append('circle')
        .attr('cx',(d)=>{return d.x}).attr('cy',(d)=>{return d.y})
        .attr('r',1.5)
        .style('fill',function(d){ 
            //console.log(prop.selectedPerson);              
            
            if(prop.selectedPerson===d.parent.data.name)
            return"rgb(0,0,0,0.3)"
            else return"none"
            
        })
        .style('stroke', function(d){                
            
            if(prop.selectedPerson===d.parent.data.name)
            return"rgb(0,0,0,1)"
            else return"none"
            
        })
        .style('stroke-width',0.5)

        var lg = svg.append('g').attr('id','links')

        lg.selectAll(".link")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .style("stroke", function(d){     
                if(prop.selectedPerson===d.source.data.name)                
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

            const showCYLines = async(svg) =>{ 
               
                var px,py
        
                var cylink = {
                    name:prop.selectedPerson,
                    children:[]
                }
                
        
                var url="http://localhost:28081/getlines/"+prop.whichCase+"/"+prop.selectedPerson
                await axios({
                        method:"get",
                        url:url,
                    }).then(function (res) {
                        cylink.children = res.data.data.cylines;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
        
                for(var p = 0; p<personind.length;p++){
                    if(cylink.name===personind[p].name){
                        px=personind[p].x;
                        py=personind[p].y;
                    }
                }
                
                
                if(prop.selectedPerson!='none'){        
                    
                    let width = 400
                    let height = 400
                
                    let cluster = d3.cluster()
                    .size([width, height - 80])
        
                    let hierarchy = d3.hierarchy(cylink)
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
        
                    nodes2.forEach((e)=>{
                        //console.log(prop.wordind)
                        //console.log(e);
                        if(e.height==1){
                            e.x=px;
                            e.y=py;
                        }
                        else{
                            var i
                            for(i=0 ; i<prop.wordind.length;i++){
                                if(e.data.text===prop.wordind[i].item[0]){
                                    if(e.data.type==='Thing'){
                                        e.x=prop.wordind[i].dimension.x/3+70
                                        e.y=prop.wordind[i].dimension.y/3+190
                                        return
                                    }
                                    else if(e.data.type==='Location'){
                                        e.x=prop.wordind[i].dimension.x/3+190
                                        e.y=prop.wordind[i].dimension.y/3+272
                                        return
                                    }
                                    else if(e.data.type==='Person'||e.data.type==='PersonName'){
                                        e.x=prop.wordind[i].dimension.x/3+98
                                        e.y=prop.wordind[i].dimension.y/3+260
                                        return
                                    }
                                    else if(e.data.type==='Time'){
                                        e.x=prop.wordind[i].dimension.x/3+205
                                        e.y=prop.wordind[i].dimension.y/3+193
                                        return
                                    }
                                }                               
                            }
                            e.x=px;
                            e.y=py;
                        }
                    })

                    //console.log(nodes2)
        
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
                        return"rgb(0,0,0,0.3)"         
                    })
                    .style('stroke', function(d){  
                        return"rgb(0,0,0,1)"            
                    })
                    .style('stroke-width',0.5)
                }
            }
        
            showCYLines(svg)
  
    },[prop.selectedPerson,prop.rotation,prop.wordind])
    

      return(
                  
            <div className="seal-link-container">
                <svg id="seal-link-svg"></svg>                
            </div>
           
      )

}

export default SealLink;

