import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import './index.css'
import person from '../../data/seal-all.json';

const SealView = (prop) =>{

    useEffect(()=>{

    d3.select("#seal-view-svg").selectChildren("*")?.remove();

      var svg=d3.select("#seal-view-svg");
      var currentx=10;
      var currenty=15;

      var defs=svg.append("defs")
      var filter=defs.append("filter").attr("id", "shadow")

      filter.append('feGaussianBlur')
            .attr('in','SourcrGraphic')
            .attr('stdDeviation','2')
    
      

      

      person.children.map((e)=>{
        e.children.map((e)=>{
           // console.log(prop.selectedPerson)
            if(e.name===prop.selectedPerson||prop.selectedPerson==='none'){                  
            
            svg.append('text')
            .attr('class','seal-name')
            .attr('y', currenty)
            .attr('x', currentx)
            .style('text-anchor', "start")
            .text(e.name)
            .style('font-size', '15px')
            currenty+=10;
            e.children.map((e)=>{
                var filetcp="./seals/"+e.file+'.png';
                var filedb="./seals-origin/"+e.file+'.png';
                var g=svg.append("g");
               

                g.append('rect')
                 .attr('class','image-rect')
                 .attr('x',10)
                 .attr('y',currenty)
                 .attr('filter','url(#shadow)')
                 .attr('width',44)
                 .attr('height',44)                 
                 .style('fill','black')

                 g.append('rect')
                 .attr('class','image-rect')
                 .attr('x',10)
                 .attr('y',currenty)
                 .attr('width',44)
                 .attr('height',44)                 
                 .style('fill','white')
                 

                 g.append('rect')
                .attr('class','image-rect')
                .attr('x',60)
                .attr('y',currenty)
                .attr('width',44)
                .attr('height',44)
                .attr('filter','url(#shadow)')
                .style('fill','black');

                g.append('rect')
                .attr('class','image-rect')
                .attr('x',60)
                .attr('y',currenty)
                .attr('width',44)
                .attr('height',44)
                .style('fill','white');

                g.append('image')
                .attr('xlink:href',filetcp)
                .attr('x',12)
                .attr('y',currenty+2)
                .attr('width',40)
                .attr('height',40);

                g.append('image')
                .attr('xlink:href',filedb)
                .attr('x',62)
                .attr('y',currenty+2)
                .attr('width',40)
                .attr('height',40);
                currenty+=50
            })
            currenty+=40
        }            
        })
      })

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