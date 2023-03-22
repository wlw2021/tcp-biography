import axios from "axios";
import './index.css'
import React, { useEffect, useState } from "react"
import * as d3 from "d3"

const colors = {
    'Others': '#AAB0BE',
    'Political': '#7891AA',
    'Academic': '#AD7982',
    'Social': '#8AA79B',
    'Kinship':'#CA9087',
    'Paint':'#D6BF9E',
    'None':'none'
  }


const types = ['Others','Political','Academic','Social','Kinship','Paint','None']
const boxSize =25


const Matrix = (prop) =>{
    useEffect(()=>{
      const items = []
      var itemlist = prop.itemlist
      var itemorder=prop.personOrder
      if (!itemlist) return;
      
      itemorder.forEach((e)=>{
        items.push(e[0])
      })
        d3.select("#matrix-svg").selectChildren("*")?.remove();

        const scale = (n) => {
          const width = n * boxSize;
          
          return (i) => {
            return i * boxSize;
          }
        }
      
        const getmatrix = (list,table)=>{
          const matrix = [];
          const n = items.length;
          console.log(list)
          //console.log(table)
          
          for (let i = 0; i < n; i++) {
            const xScale = scale(n - i - 1);
            const id1=table[items[i]]            
            for (let j = i + 1; j < n; j++) {
              const id2=table[items[j]]
              //console.log(id1,id2)
                var others=0,politic=0,academic=0,social=0,kin=0,paint=0;
                var key;
                
                list.forEach((d)=>{
                  if((d.人1id===id1 && d.人2id===id2)){
                    switch(d.关系类型){
                      case'文学': academic++;break;
                      case'社交': social++;break;
                      case'政治': politic++;break;
                      case'亲缘': kin++;break;
                      case'画作': paint++;break;
                      case'其他': others++;break;
                    }
                  }
                })
                var max = Math.max(others,politic,academic,social,kin,paint)

                if(max==0){
                  key='None'
                }
                else if(others==max){
                  key='Others'
                }
                else if(politic==max){
                  key='Political'
                }
                else if(academic==max){
                  key='Academic'
                }
                else if(social==max){
                  key='Social'
                }
                else if(kin==max){
                  key='Kinship'
                }
                else if(paint==max){
                  key='Paint'
                }
              
                matrix.push({
                  source: items[i],
                  target: items[j],
                  x: xScale(j - 1),
                  y: i * boxSize,
                  type: key,
                  color: colors[key]
                });
              
            }
          }
          
          return matrix;
        }

        const matrix = getmatrix(prop.relation,itemlist)
        const eachRow = Math.hypot(boxSize, boxSize);
        const margin = {top: 20, left: 260, right: 20, bottom: 20};
        const chartHeight = eachRow * items.length;
        //const chartWidth = width - margin.left - margin.right;
        const height = chartHeight + margin.top + margin.bottom;
        const svg = d3.select('#matrix-svg').attr('height',1100).attr('width',1100).attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 "+height+" "+height)
        const labelWidth = 120;

        console.log(matrix)

  
  const group = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const listing = group.selectAll('g.list-item')
    .data(items)
    .join('g')
    .attr('class', 'list-item')
    .attr('transform', (d, i) => `translate(0, ${i * eachRow})`)

  //最上面的一横
  // listing.filter((d, i) => i == 0)
  //   .append('line')
  //   .attr('x1', 0)
  //   .attr('x2', labelWidth)
  //   .attr('y1', 0)
  //   .attr('y2', 0)
  //   .attr('stroke', '#000')
  //   .attr('stroke-width', '1.5px');
  
  const labels = listing.append('text')
    .attr('text-anchor', 'end')
    .attr('x', labelWidth - 5)
    .attr('y', eachRow / 2 + 4)
    .text(d => d)
   //中间的平横
  // const borders = listing.append('line')
  //   .attr('x1', 0)
  //   .attr('x2', labelWidth)
  //   .attr('y1', eachRow)
  //   .attr('y2', eachRow)
  //   .attr('stroke', '#000')
  //   .attr('stroke-width', '1.5px');
  
  const circleGroup = group.append('g')
    .attr('class', 'circleGroup')
    .attr('transform', `translate(${labelWidth + 18}, ${eachRow / 2}) rotate(${45})`)
  
  const circles = circleGroup.selectAll('g.dot').data(matrix)
    .join('g')
    .attr('class', 'dot')
    .attr('transform', d => `translate(${d.x}, ${d.y})`)

  
  circles.append('rect')
    .attr('fill', d => d.color)
    .attr('width', boxSize)
    .attr('height', boxSize)
    
    .attr('stroke', '#000')
    .attr('stroke-width', '1.5px')
  
    //两道斜横
  // const twoLines = group.selectAll('scope-line')
  //   .data([{
  //     x1: labelWidth,
  //     x2: labelWidth + boxSize,
  //     y1: 0,
  //     y2: 0,
  //     rotate: `44.5 ${labelWidth} 0`
  //   }, {
  //     x1: labelWidth,
  //     x2: labelWidth + boxSize,
  //     y1: chartHeight,
  //     y2: chartHeight,
  //     rotate: `-44.5 ${labelWidth} ${chartHeight}`
  //   }])
  //   .join('line')
  //   .attr('class', 'scope-line')
  //   .attr('x1', d => d.x1)
  //   .attr('x2', d => d.x2)
  //   .attr('y1', d => d.y1)
  //   .attr('y2', d => d.y2)
  //   .attr('stroke', '#000')
  //   .attr('stroke-width', '1.5px')
  //   .attr('transform', d => `rotate(${d.rotate})`);
        
    },[prop])  


    return(
        <div id="matrix-container">
            <svg id = "matrix-svg"></svg>            
        </div>
    )

}

export default Matrix