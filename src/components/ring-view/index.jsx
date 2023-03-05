import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import { logo, ringview, origin } from '../../assets';
import './index.css'
import WordCloud from './word-cloud';
import person from '../../data/seal-all.json';
import sealind from '../../data/index.json'


const RingView =()=>{

    const [selectedPerson, setSelectedPerson] = useState("none");

    function highlight(d) {
        setSelectedPerson(d);
    }

    

    useEffect(()=>{
        d3.select("#seal-link-svg").selectChildren("*")?.remove();

        let width = 400
        let height = 400
        
        var svg = d3
        .select("#seal-link-svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 440 440")

        let cluster = d3.cluster()
        .size([width, height - 80])
        .separation(function (a, b) {
          return (a.parent === b.parent ? 1 : 2) / a.depth
        })

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
      let g = svg.append('g')

      var qingx=103;
      var qingy=138;
      var mingx=198;
      var mingy=88;
      var yuanx=308;
      var yuany=138;
      var wux=228;
      var wuy=178;

     var qinga=[{
        x:115,
        y:100
     }] 
     var minga=[{
        x:180,
        y:60
     }] 
     var yuana=[{
        x:280,
        y:130
     }] 
     var wua=[{
        x:190,
        y:130
     }] 

     console.log(nodes);
    //  function isindvalid(x,y,dy){
    //     if(x===0||y===0) return false;
    //     var list;
    //     switch(dy){
    //         case"清": list = qinga;break;
    //         case"明": list = minga;break;
    //         case"元": list = yuana;break;
    //         case"无": list = wua;break;
    //     }
    //     for(var i=0; i<list.length;i++){
    //         var endx1=x+16, endy1=y+16;
    //         var endx2=list[i].x+16, endy2=list[i].y+16;
    //         if(!(endy1<list[i].y||endy2<y||list[i].x>endx1||x>endx2))return false;
    //     }
    //     return true;
    // }

    // function getx(dy){
    //     switch(dy){
    //         case"清": return Math.random*(mingx-qingx)+qingx;
    //         case"明": return Math.random*(yuanx-mingx)+mingx;
    //         case"元": return Math.random*(300-yuanx)+yuanx;
    //         case"无": return 210;
    //     }

    // }

    // function gety(dy){
    //     console.log(dy)
    //     switch(dy){
    //         case"清": return Math.random*(150-qingy)+qingy;
    //         case"明": return Math.random*(150-mingy)+mingy;
    //         case"元": return Math.random*(150-yuanx)+yuanx;
    //         case"无": return 210;
    //     }
    // }

    
    // for(var j=0; j<nodes.length; j++){
        
    // }

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
            console.log(count/2)
            d.x=(parseInt(count/2))*20+basex;
            
            return "node";
        }
        if(d.depth===3) {
            d.x=d.data.indx;
            d.y=d.data.indy;
            return "node-seal"
        };
        })
        console.log(nodes);
        g.selectAll('.node').append('rect')
        .attr('x',(d)=>{return d.x-8}).attr('y',(d)=>{return d.y-8})
        .attr('width',16)
        .attr('height',16)
        .style('fill','white')
        .style('stroke',function(d){
            var depth = d.data.allnum/40+0.2;
            if(depth>1)depth=1;
            return "RGB(122,32,2,"+depth+")"
        })
        .style('stroke-width',1.3)

        g.selectAll('.node').append('rect')
        .attr('x',(d)=>{return d.x-6}).attr('y',(d)=>{return d.y-6})
        .attr('width',12)
        .attr('height',12)
        .style('fill',function(d){
            var depth = d.data.thisnum/10+0.2;
            if(depth>1)depth=1;
            return "RGB(151,99,95,"+depth+")"
        })
        

        g.selectAll('.node').append('text')
        .attr('y', function (d) { return d.y+4 })
        .attr('x', function (d) { return d.x-5 })
        .style('text-anchor', "start")
        .text(function(d){
            return d.data.name.substring(0,1);
        })
        .style('font-size', '9px')
        .style('fill','white');

        g.selectAll('.node-seal').append('circle')
        .attr('cx',(d)=>{return d.x}).attr('cy',(d)=>{return d.y})
        .attr('r',1.5)
        .style('fill','RGB(0,0,0,0.5)')
        .style('stroke', "black")
        .style('stroke-width',1)

        console.log(links);

        g.selectAll(".link")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .style("stroke", function(d){
                if(d.source.height>1)return"none"
                else return"rgb(0,0,0,0.3)"
                
            })
            .style('stroke-width',0.7)
            .style("fill", "none")
            .attr("pointer-events", "none")
            .attr(
                "d",
                d3
                    .linkHorizontal()
                    .x(function (d: any) {
                        return d.x
                    })
                    .y(function (d: any) {
                        return d.y
                    })
            )

      
     
    //   console.log(nodes)
    //   //绘制文本和节点
    //   g.selectAll('.node')
    //   .data(nodes)
    //     .enter().append('g')
    //     .attr('class', function (d) { return 'node' + (d.children ? ' node--internal' : ' node--leaf') })
    //     .attr('transform', function (d) { return 'translate(' + d.y + ',' + d.x + ')' })
    //   g.selectAll('.node').append('circle')
    //     .attr('r', 5)
    //     .style('fill', 'green')
    //   g.selectAll('.node').append('text')
    //     .attr('dy', 3)
    //     .attr('x', function (d) { return d.children ? -8 : 8 })
    //     .style('text-anchor', function (d) { return d.children ? 'end' : 'start' })
    //     .text(function (d) {
    //       return d.data.name
    //     })
    //     .style('font-size', '11px')
       
    },[])
    

      return(
        <div className='ring-view'>
            <div id="logo">
                <img src={logo} alt="标志" />
            </div>

            <WordCloud />

           

            <div id = 'ring-view'>
                <img src={ringview} id='ringtu'></img>
            </div>

            <div id = 'origin'>
                <img src={origin} id='origintu'></img>
            </div>

            <div className="seal-link-container">
                <svg id="seal-link-svg"></svg>
            </div>
            
            
                        
        </div>
           
      )

}

export default RingView;

