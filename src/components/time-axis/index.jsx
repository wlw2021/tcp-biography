import axios from "axios";
import React, { useEffect, useState } from "react";
import './index.css'
import { axis } from "../../assets";
import * as d3 from "d3";
import SimilarPaint from "./similar-painting";
import NoneDisplay from "./none-list";
import year from '../../data/year.json'

const TimeAxis = () =>{

    const [noneListP,setNoneListP]=useState(null)
    const [noneListS,setNoneListS]=useState(null)
    const [position, setPosition] = useState (null)
    const [info, setInfo] = useState (null)

    const senty = [14,11,4];

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

    useEffect(()=>{    
        d3.select("#year-layer-svg").selectChildren("*")?.remove();
        
        var svg = d3
        .select("#year-layer-svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 1730 300")

        var peryearlen=1700/810;
        

//////////////////////作者卷轴//////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

        const authorScroll =async () =>{
            var relation,person
            var personind = {}
            var url = 'http://aailab.cn:28081/getpersonscore?pid=894&addnames=&addcids='
            await axios({
                    method:"get",
                    url:url,
                }).then(function (res) {
                    console.log(res.data)
                    relation=res.data.data.人物关系信息
                    person=res.data.data.人物列表
                })
                .catch(function (error) {
                    console.log(error);
                })

                var authorlevel = {};
                var noneauthor =[];
               year.forEach((e)=>{
                   if(e.birth===0 && e.death===0){
                       noneauthor.push(e)
                   }  
                   else  
                   {if(e.birth==0){
                       e.birth=e.death-50;
                   }
                   else if(e.death==0){
                       e.death=e.birth+50;
                   }
                   var indx = (e.birth-1195)*peryearlen;
                   var length = (e.death-e.birth)*peryearlen;
                   var indy=(e.level-2)*63-10;
                   authorlevel[e.name]=e.level;
                 
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
                   if(e.name==='趙孟頫'){
                       g.append('circle')
                       .attr('cx',indx-23.5).attr('cy',indy+23)
                       .attr('r',19)
                       .style('fill','white')
                       .style('stroke',"RGB(122,32,2,1)")
                       .style('stroke-width',2.5)
                   
       
                       g.append('circle')
                       .attr('cx',indx-23.5).attr('cy',(d)=>indy+23.5)
                       .attr('r',16)
                       .style('fill',"RGB(151,99,95,1)")
                   
                       g.append('text')
                       .attr('y', indy+32).attr('x', indx-37)
                       .style('text-anchor', "start")
                       .text(e.name.substring(0,1))
                       .style('font-family','宋体')
                       .style('font-size', '25px')
                       .style('fill','white');
                   }
       
                   else{
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
                       .text(()=>{
                           if(e.name.substring(0,1)==='(')return '溥'
                           else if(e.name.substring(0,1)==='愛') return e.name.substring(4,5)
                           else return e.name.substring(0,1)
                       })
                       .style('font-family','宋体')
                       .style('font-size', '25px')
                       .style('fill','white');
                   }            
       
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

                   
                   var thisname=e.name
                   var thisrelation
                   var key = e.cid
                   Object.keys(relation).some((k)=>{
                    if(e.cid===k){
                        thisrelation = relation[k]
                        return
                    }
                })
    
                    Object.keys(person).some((pname)=>{
                        if(Number(person[pname])===Number(key)){
                            thisname = pname
                            return
                        }
                    })
                    
            
                    var level = authorlevel[thisname]
                    var ey=(level-2)*63-10
                    if(thisrelation.卒年!=null){
                        var ex=(thisrelation.卒年-1195)*peryearlen+5;
                    }
                    else if(thisrelation.生年!=null){
                        var ex=(thisrelation.生年+50-1195)*peryearlen+5;
                    }
                    else{return}
    
                    
                    //console.log(thisrelation)
                    var rsum = 0;
                    var allre = thisrelation.全部关系数量
                    Object.values(allre).forEach((value)=>{
                        rsum+=value
                    })
                    //console.log(rsum, thisname)
                    var devtime
                    if(rsum>=200){
                        devtime=6
                    }
                    else if(rsum>=100){
                        devtime=4
                    }
                    else if(rsum>=50){
                        devtime=2.5
                    }
                    else if(rsum<10){
                        devtime=0.7
                    }
                    else devtime=1;
                    if(rsum!=0&&level){
                        personind[key]={
                            endx:ex,
                            kiny:0,
                            poliy:0,
                            acay:0,
                            paiy:0,
                            socy:0,
                            othy:0
                        }
                        var g = svg.append('g').attr('id','event'+thisrelation.姓名);
                        
                        Object.keys(thisrelation.全部关系年份).forEach((rkey)=>{
                            var type
                            switch(rkey){
                                case'亲缘':type = 'Kinship';break;
                                case'其他':type = 'Others';break;
                                case '政治':type = 'Political';break;
                                case '文学':type = 'Academic';break;
                                case '社交':type = 'Social';break;
                                case '画作':type = 'Paint';break;
                            }
                            Object.keys(thisrelation.全部关系年份[rkey]).forEach((ykey)=>{
                                var soloex = (Number(ykey)-1195)*peryearlen
                                g.append('rect').attr('x',soloex).attr('y',ey).attr('id',rkey+' '+thisname+ykey)
                                .attr('height',45).attr('width',3)
                                .style('fill',colors[type])
                            })
                        })
    
                        g.append('rect').attr('x',ex).attr('y',ey).attr('id','亲缘'+thisname)
                        .attr('height',thisrelation.全部关系数量.亲缘/devtime).attr('width',3)
                        .style('fill',colors.Kinship)
                        personind[key].kiny=ey;
                        ey+=thisrelation.全部关系数量.亲缘/devtime
                        
    
                        g.append('rect').attr('x',ex).attr('y',ey).attr('id','政治'+thisname)
                        .attr('height',thisrelation.全部关系数量.政治/devtime).attr('width',3)
                        .style('fill',colors.Political)
                        personind[key].poliy=ey;
                        ey+=thisrelation.全部关系数量.政治/devtime
    
                        g.append('rect').attr('x',ex).attr('y',ey).attr('id','文学'+thisname)
                        .attr('height',thisrelation.全部关系数量.文学/devtime).attr('width',3)
                        .style('fill',colors.Academic)
                        personind[key].acay=ey;
                        ey+=thisrelation.全部关系数量.文学/devtime
    
                        g.append('rect').attr('x',ex).attr('y',ey).attr('id','画作'+thisname)
                        .attr('height',thisrelation.全部关系数量.画作/devtime).attr('width',3)
                        .style('fill',colors.Paint)
                        personind[key].paiy=ey;
                        ey+=thisrelation.全部关系数量.画作/devtime
    
                        g.append('rect').attr('x',ex).attr('y',ey).attr('id','社交'+thisname)
                        .attr('height',thisrelation.全部关系数量.社交/devtime).attr('width',3)
                        .style('fill',colors.Social)
                        personind[key].socy=ey;
                        ey+=thisrelation.全部关系数量.社交/devtime
    
                        g.append('rect').attr('x',ex).attr('y',ey).attr('id','其他'+thisname)
                        .attr('height',thisrelation.全部关系数量.其他/devtime).attr('width',3)
                        .style('fill',colors.Others)
                        personind[key].othy=ey;
                        ey+=thisrelation.全部关系数量.其他/devtime
                    } 
              
                }
               })

               //console.log(noneauthor)
               setNoneListS(noneauthor)
    
               const handleClick=(rela,e)=>{
                console.log(person)
                var x=e.clientX
                var y=e.clientY
                var name1,name2;
                setInfo(rela)
                Object.keys(person).forEach((key)=>{
                    if(person[key]===rela.人1id){
                        name1=key
                    }
                    if(person[key]===rela.人2id){
                        name2=key
                    }
                })

                setInfo({
                    id1:name1,
                    id2:name2,
                    relation:rela.关系,
                    type:rela.关系类型,
                    place:rela.地点? rela.地点:'不详',
                    begin:rela.起始年? rela.起始年:'不详',
                    end:rela.结束年? rela.结束年:'不详',
                })
                setPosition({
                    x:x,
                    y:y
                })  
                 
                setTimeout(()=>{
                    setPosition(null)
                    setInfo(null)
                },5000)            
               }
              

/////////////////////////////// ///////////////事件连线
var strech = [30,60,40];
var eventi = 0
Object.keys(relation).forEach((p1)=>{
    if(personind[p1]===undefined) return;
    else{
        var doublekin = relation[p1].相关亲缘
        var doublepoli = relation[p1].相关政治
        var doubleaca = relation[p1].相关文学
        var doublepai = relation[p1].相关画作
        var doublesoc = relation[p1].相关社交
        var doubleoth = relation[p1].相关其他
        //console.log(doublesoc)
 ///////////文学事件///////////////////////////////////////////////////       
        Object.keys(doubleaca).forEach((p2)=>{
            if(personind[p2]===undefined) return;
            doubleaca[p2].forEach((rela)=>{
                //console.log(rela)
                if(rela.起始年!=null||rela.结束年!=null){
                    var xind
                    if(rela.起始年!=null){
                        xind=(rela.起始年-1195)*peryearlen;
                    }
                    if(rela.结束年!=null){
                        xind=(rela.结束年-1195)*peryearlen;
                    }
                    var y1=personind[p1].kiny
                    var y2=personind[p2].kiny
                    var g = svg.append('g').attr('id','event'+p1+p2+'aca');

                    g.append('rect')
                    .attr('x',xind).attr('y',y1)
                    .attr('width',3).attr('height',45)
                    .style('fill',colors.Academic)

                    g.append('rect')
                    .attr('x',xind).attr('y',y2)
                    .attr('width',3).attr('height',45)
                    .style('fill',colors.Academic)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',xind).attr('x2',xind).attr('y1',y1+45).attr('y2',y2)
                    .style('stroke',colors.Academic).style('stroke-width',2)
                }
                else{
                    if(personind[p2].endx-personind[p1].endx<0){
                        var x1=personind[p1].endx
                        var x2=personind[p1].endx+strech[(eventi++)%3]
                        var x3=personind[p2].endx
                    }
                    else{
                       return
                    }
                    var y1=(personind[p1].acay+personind[p1].paiy)/2
                    var y2=(personind[p2].acay+personind[p2].paiy)/2
                    var g = svg.append('g').attr('id','event'+p1+p2+'aca');
                    g.append('line').attr('class','scroll-line').on('mouseover',(e)=>{
                        handleClick(rela,e)
                    })
                    .attr('x1',x1).attr('x2',x2).attr('y1',y1).attr('y2',y1)
                    .style('stroke',colors.Academic).style('stroke-width',2)

                    g.append('line').attr('class','scroll-line').on('mouseover',(e)=>{
                        handleClick(rela,e)
                    })
                    .attr('x1',x2).attr('x2',x2).attr('y1',y1).attr('y2',y2)
                    .style('stroke',colors.Academic).style('stroke-width',2)

                    g.append('line').attr('class','scroll-line').on('mouseover',(e)=>{
                        handleClick(rela,e)
                    })
                    .attr('x1',x2).attr('x2',x3).attr('y1',y2).attr('y2',y2)
                    .style('stroke',colors.Academic).style('stroke-width',2)

                }
            })
            
        })
 ///////////亲缘事件连线///////////////////////////////////////////////////  
        Object.keys(doublekin).forEach((p2)=>{
            if(personind[p2]===undefined) return;
            doublekin[p2].forEach((rela)=>{
                //console.log(rela)
                if(rela.起始年!=null||rela.结束年!=null){
                    var xind
                    if(rela.起始年!=null){
                        xind=(rela.起始年-1195)*peryearlen;
                    }
                    if(rela.结束年!=null){
                        xind=(rela.结束年-1195)*peryearlen;
                    }
                    var y1=personind[p1].kiny
                    var y2=personind[p2].kiny
                    var g = svg.append('g').attr('id','event'+p1+p2+'kin');

                    g.append('rect')
                    .attr('x',xind).attr('y',y1)
                    .attr('width',3).attr('height',45)
                    .style('fill',colors.Kinship)

                    g.append('rect')
                    .attr('x',xind).attr('y',y2)
                    .attr('width',3).attr('height',45)
                    .style('fill',colors.Kinship)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',xind).attr('x2',xind).attr('y1',y1+45).attr('y2',y2)
                    .style('stroke',colors.Kinship).style('stroke-width',2)
                }
                else{
                    if(personind[p2].endx-personind[p1].endx<0){
                        var x1=personind[p1].endx
                        var x2=personind[p1].endx+strech[(eventi++)%3]
                        var x3=personind[p2].endx
                    }
                    else{
                       return
                    }
                    var y1=(personind[p1].kiny+personind[p1].poliy)/2
                    var y2=(personind[p2].kiny+personind[p2].poliy)/2
                    var g = svg.append('g').attr('id','event'+p1+p2+'kin');
                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x1).attr('x2',x2).attr('y1',y1).attr('y2',y1)
                    .style('stroke',colors.Kinship).style('stroke-width',2)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x2).attr('x2',x2).attr('y1',y1).attr('y2',y2)
                    .style('stroke',colors.Kinship).style('stroke-width',2)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x2).attr('x2',x3).attr('y1',y2).attr('y2',y2)
                    .style('stroke',colors.Kinship).style('stroke-width',2)
                }
            })
            
        })
 ///////////政治事件///////////////////////////////////////////////////  
        Object.keys(doublepoli).forEach((p2)=>{
            if(personind[p2]===undefined) return;
            doublepoli[p2].forEach((rela)=>{
                //console.log(rela)
                if(rela.起始年!=null||rela.结束年!=null){
                    var xind
                    if(rela.起始年!=null){
                        xind=(rela.起始年-1195)*peryearlen;
                    }
                    if(rela.结束年!=null){
                        xind=(rela.结束年-1195)*peryearlen;
                    }
                    var y1=personind[p1].kiny
                    var y2=personind[p2].kiny
                    var g = svg.append('g').attr('id','event'+p1+p2+'poli');

                    g.append('rect')
                    .attr('x',xind).attr('y',y1)
                    .attr('width',3).attr('height',45)
                    .style('fill',colors.Political)

                    g.append('rect')
                    .attr('x',xind).attr('y',y2)
                    .attr('width',3).attr('height',45)
                    .style('fill',colors.Political)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',xind).attr('x2',xind).attr('y1',y1+45).attr('y2',y2)
                    .style('stroke',colors.Political).style('stroke-width',2)
                }
                else{
                    if(personind[p2].endx-personind[p1].endx<0){
                        var x1=personind[p1].endx
                        var x2=personind[p1].endx+strech[(eventi++)%3]
                        var x3=personind[p2].endx
                    }
                    else{
                       return
                    }
                    var y1=(personind[p1].poliy+personind[p1].acay)/2
                    var y2=(personind[p2].poliy+personind[p2].acay)/2
                    var g = svg.append('g').attr('id','event'+p1+p2+'poli');
                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x1).attr('x2',x2).attr('y1',y1).attr('y2',y1)
                    .style('stroke',colors.Political).style('stroke-width',2)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x2).attr('x2',x2).attr('y1',y1).attr('y2',y2)
                    .style('stroke',colors.Political).style('stroke-width',2)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x2).attr('x2',x3).attr('y1',y2).attr('y2',y2)
                    .style('stroke',colors.Political).style('stroke-width',2)
                }
            })            
        })
///////////画作事件///////////////////////////////////////////////////  
        Object.keys(doublepai).forEach((p2)=>{
            if(personind[p2]===undefined) return;
            doublepai[p2].forEach((rela)=>{
                //console.log(rela)
                if(rela.起始年!=null||rela.结束年!=null){
                    var xind
                    if(rela.起始年!=null){
                        xind=(rela.起始年-1195)*peryearlen;
                    }
                    if(rela.结束年!=null){
                        xind=(rela.结束年-1195)*peryearlen;
                    }
                    var y1=personind[p1].kiny
                    var y2=personind[p2].kiny
                    var g = svg.append('g').attr('id','event'+p1+p2+'pai');

                    g.append('rect')
                    .attr('x',xind).attr('y',y1)
                    .attr('width',3).attr('height',45)
                    .style('fill',colors.Paint)

                    g.append('rect')
                    .attr('x',xind).attr('y',y2)
                    .attr('width',3).attr('height',45)
                    .style('fill',colors.Paint)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',xind).attr('x2',xind).attr('y1',y1+45).attr('y2',y2)
                    .style('stroke',colors.Paint).style('stroke-width',2)
                }
                else{
                    if(personind[p2].endx-personind[p1].endx<0){
                        var x1=personind[p1].endx
                        var x2=personind[p1].endx+strech[(eventi++)%3]
                        var x3=personind[p2].endx
                    }
                    else{
                       return
                    }
                    var y1=(personind[p1].paiy+personind[p1].socy)/2
                    var y2=(personind[p2].paiy+personind[p2].socy)/2
                    var g = svg.append('g').attr('id','event'+p1+p2+'pai');
                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x1).attr('x2',x2).attr('y1',y1).attr('y2',y1)
                    .style('stroke',colors.Paint).style('stroke-width',2)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x2).attr('x2',x2).attr('y1',y1).attr('y2',y2)
                    .style('stroke',colors.Paint).style('stroke-width',2)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x2).attr('x2',x3).attr('y1',y2).attr('y2',y2)
                    .style('stroke',colors.Paint).style('stroke-width',2)
                }
            })
            
        })
///////////社交事件///////////////////////////////////////////////////  
        Object.keys(doublesoc).forEach((p2)=>{
            if(personind[p2]===undefined) return;
            doublesoc[p2].forEach((rela)=>{
                //console.log(rela)
                if(rela.起始年!=null||rela.结束年!=null){
                    var xind
                    if(rela.起始年!=null){
                        xind=(rela.起始年-1195)*peryearlen;
                    }
                    if(rela.结束年!=null){
                        xind=(rela.结束年-1195)*peryearlen;
                    }
                    var y1=personind[p1].kiny
                    var y2=personind[p2].kiny
                    var g = svg.append('g').attr('id','event'+p1+p2+'soc');

                    g.append('rect')
                    .attr('x',xind).attr('y',y1)
                    .attr('width',3).attr('height',45)
                    .style('fill',colors.Social)

                    g.append('rect')
                    .attr('x',xind).attr('y',y2)
                    .attr('width',3).attr('height',45)
                    .style('fill',colors.Social)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',xind).attr('x2',xind).attr('y1',y1+45).attr('y2',y2)
                    .style('stroke',colors.Social).style('stroke-width',2)
                }
                else{
                    if(personind[p2].endx-personind[p1].endx<0){
                        var x1=personind[p1].endx
                        var x2=personind[p1].endx+strech[(eventi++)%3]
                        var x3=personind[p2].endx
                    }
                    else{
                       return
                    }
                    var y1=(personind[p1].socy+personind[p1].othy)/2
                    var y2=(personind[p2].socy+personind[p2].othy)/2
                    var g = svg.append('g').attr('id','event'+p1+p2+'soc');
                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x1).attr('x2',x2).attr('y1',y1).attr('y2',y1)
                    .style('stroke',colors.Social).style('stroke-width',2)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x2).attr('x2',x2).attr('y1',y1).attr('y2',y2)
                    .style('stroke',colors.Social).style('stroke-width',2)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x2).attr('x2',x3).attr('y1',y2).attr('y2',y2)
                    .style('stroke',colors.Social).style('stroke-width',2)
                }
            })
            
        })
///////////其他事件///////////////////////////////////////////////////  
        Object.keys(doubleoth).forEach((p2)=>{
            if(personind[p2]===undefined) return;
            doubleoth[p2].forEach((rela)=>{
                //console.log(rela)
                if(rela.起始年!=null||rela.结束年!=null){
                    var xind
                    if(rela.起始年!=null){
                        xind=(rela.起始年-1195)*peryearlen;
                    }
                    if(rela.结束年!=null){
                        xind=(rela.结束年-1195)*peryearlen;
                    }
                    var y1=personind[p1].kiny
                    var y2=personind[p2].kiny
                    var g = svg.append('g').attr('id','event'+p1+p2+'oth');

                    g.append('rect')
                    .attr('x',xind).attr('y',y1)
                    .attr('width',3).attr('height',45)
                    .style('fill',colors.Others)

                    g.append('rect')
                    .attr('x',xind).attr('y',y2)
                    .attr('width',3).attr('height',45)
                    .style('fill',colors.Others)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',xind).attr('x2',xind).attr('y1',y1+45).attr('y2',y2)
                    .style('stroke',colors.Others).style('stroke-width',2)
                }
                else{
                    if(personind[p2].endx-personind[p1].endx<0){
                        var x1=personind[p1].endx
                        var x2=personind[p1].endx+strech[(eventi++)%3]
                        var x3=personind[p2].endx
                    }
                    else{
                       return
                    }
                    var y1=personind[p1].othy
                    var y2=personind[p2].othy
                    var g = svg.append('g').attr('id','event'+p1+p2+'oth');
                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x1).attr('x2',x2).attr('y1',y1).attr('y2',y1)
                    .style('stroke',colors.Others).style('stroke-width',2)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x2).attr('x2',x2).attr('y1',y1).attr('y2',y2)
                    .style('stroke',colors.Others).style('stroke-width',2)

                    g.append('line').attr('class','scroll-line')
                    .attr('x1',x2).attr('x2',x3).attr('y1',y2).attr('y2',y2)
                    .style('stroke',colors.Others).style('stroke-width',2)
                }
            })
            
        })

    }
 })
               
        }
        authorScroll()
         

///////////////////////////////事件连线////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
        // const showEvent = async()=>{           

             

        // }
        //setTimeout(()=>{showEvent()},5000)
        
    },[])

    return(
        <div id="axis-container">
            <div id='year-similar'>
                <SimilarPaint 
                 noneListP ={noneListP}
                 setNoneListP ={setNoneListP}/>
            </div>
            <div id = "axis">
                <img src={axis} id = "axistu"></img>
            </div>
            <svg id="year-layer-svg"></svg>
            <div id='none-display'>
                <NoneDisplay 
                noneListP ={noneListP}
                setNoneListP ={setNoneListP}
                noneListS ={noneListS}
                setNoneListS ={setNoneListS}/>
            </div>
            {!!position && (
        <div
          className="info"
          style={{
            transform: `translate(${position.x }px,${
              position.y -1850
            }px)`
          }}
        >
          {info && (
            <>
             <svg id= 'tool-tip' height ='600' width ="450">
              <rect width ='400' height='330' fill='rgba(255,255,255,0.5)' stroke='black' atroke-width='10'></rect>
              <text x='30' y='50' textAnchor="start" fontSize={30}>{info.id1} - {info.id2}</text>
              <text x='30' y='100' textAnchor="start" fontSize={30}>关系：{info.relation}</text>
              <text x='30' y='150' textAnchor="start" fontSize={30}>关系类型：{info.type}</text>
              <text x='30' y='200' textAnchor="start" fontSize={30}>起始年：{info.begin}</text>             
              <text x='30' y='250' textAnchor="start" fontSize={30}>结束年：{info.end}</text>
              <text x='30' y='300' textAnchor="start" fontSize={30}>地点：{info.place}</text>
             </svg>
            </>
          )}
        </div>
      )}   
        </div>
    )

}

export default TimeAxis