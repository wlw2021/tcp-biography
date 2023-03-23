import axios from "axios";
import React, { useEffect, useState } from "react";
import './index.css'
import { axis } from "../../assets";
import * as d3 from "d3";
import year from '../../data/year.json'

const TimeAxis = () =>{

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

        var iy = 50;
        var nx=40;
        
        d3.select("#year-layer-svg").selectChildren("*")?.remove();
        d3.select("#year-similar-svg").selectChildren("*")?.remove();
        d3.select("#none-svg").selectChildren("*")?.remove();
        var ssvg = d3
        .select("#year-similar-svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 1730 110")

        var nsvg = d3
        .select("#none-svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 230 475")

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
                
                var noneList = authorlist['佚名']
                console.log(noneList)

                
                
                var ylen = 300/noneList.length

                noneList.forEach(async (pic)=>{
                    var type, image64
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
            iy+=100
           

        }
        showSimilar()

        var authorlevel = {};
        var sy=260;
        year.forEach((e)=>{
            if(e.birth===0 && e.death===0){
                //console.log(e)
                var g = nsvg.append('g').attr('id','scroll'+e.name);
                g.append('rect')
                .attr('x',nx).attr('y',sy)
                .attr('height',38.5).attr('width',160)
                .style('fill','#E4DAC5')
                .style('stroke','#8c765f')
                .style('stroke-width',1.4)

                g.append('text')
                .attr('x', nx+45).attr('y', sy+30)
                .style('text-anchor', "start")
                .style('font-family','宋体')
                .text(e.name)
                .style('font-size', '25px')
                
                sy+=50
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
            //console.log(authorlevel)
            authorlevel[e.name]=e.level;

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
                .text(e.name.substring(0,1))
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
            sentcount = 0}
        })

        //事件连线
        const showEvent = async()=>{
            var relation,person
            var personind = {}
            var url = 'http://aailab.cn:28081/getpersonscore?pid=894&addnames=&addcids='
            await axios({
                    method:"get",
                    url:url,
                }).then(function (res) {
                    //console.log(res.data)
                    relation=res.data.data.人物关系信息
                    person=res.data.data.人物列表
                })
                .catch(function (error) {
                    console.log(error);
                })

                //console.log(relation)

            Object.keys(relation).forEach((key)=>{
                var thisrelation=relation[key]
                var thisname

                Object.keys(person).some((pname)=>{
                    if(Number(person[pname])===Number(key)){
                        thisname = pname
                        return
                    }
                })
                
        
                var level = authorlevel[thisname]
                //console.log(authorlevel)
                //console.log(thisname)
                //console.log(level)
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
                //console.log(rsum)
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
                    .attr('height',thisrelation.全部关系数量.亲缘*35/rsum).attr('width',3)
                    .style('fill',colors.Kinship)
                    personind[key].kiny=ey;
                    ey+=thisrelation.全部关系数量.亲缘*35/rsum
                    

                    g.append('rect').attr('x',ex).attr('y',ey).attr('id','政治'+thisname)
                    .attr('height',thisrelation.全部关系数量.政治*35/rsum).attr('width',3)
                    .style('fill',colors.Political)
                    personind[key].poliy=ey;
                    ey+=thisrelation.全部关系数量.政治*35/rsum

                    g.append('rect').attr('x',ex).attr('y',ey).attr('id','文学'+thisname)
                    .attr('height',thisrelation.全部关系数量.文学*35/rsum).attr('width',3)
                    .style('fill',colors.Academic)
                    personind[key].acay=ey;
                    ey+=thisrelation.全部关系数量.文学*35/rsum

                    g.append('rect').attr('x',ex).attr('y',ey).attr('id','画作'+thisname)
                    .attr('height',thisrelation.全部关系数量.画作*35/rsum).attr('width',3)
                    .style('fill',colors.Paint)
                    personind[key].paiy=ey;
                    ey+=thisrelation.全部关系数量.画作*35/rsum

                    g.append('rect').attr('x',ex).attr('y',ey).attr('id','社交'+thisname)
                    .attr('height',thisrelation.全部关系数量.社交*35/rsum).attr('width',3)
                    .style('fill',colors.Social)
                    personind[key].socy=ey;
                    ey+=thisrelation.全部关系数量.社交*35/rsum

                    g.append('rect').attr('x',ex).attr('y',ey).attr('id','其他'+thisname)
                    .attr('height',thisrelation.全部关系数量.其他*35/rsum).attr('width',3)
                    .style('fill',colors.Others)
                    personind[key].othy=ey;
                    ey+=thisrelation.全部关系数量.其他*35/rsum 
                } 
             })

             //console.log(relation)
             //console.log(personind)
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
                    Object.keys(doubleaca).forEach((p2)=>{
                        //console.log(doubleaca[p2])
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
                                if(personind[p2].endx-personind[p1].endx<20){
                                    var x1=personind[p1].endx
                                    var x2=personind[p1].endx+40
                                    var x3=personind[p2].endx
                                }
                                else{
                                    var x1=personind[p1].endx
                                    var x2=(personind[p1].endx+personind[p2].endx)/2
                                    var x3=personind[p2].endx
                                }
                                var y1=(personind[p1].acay+personind[p1].paiy)/2
                                var y2=(personind[p2].acay+personind[p2].paiy)/2
                                var g = svg.append('g').attr('id','event'+p1+p2+'kin');
                                g.append('line').attr('class','scroll-line')
                                .attr('x1',x1).attr('x2',x2).attr('y1',y1).attr('y2',y1)
                                .style('stroke',colors.Academic).style('stroke-width',2)
    
                                g.append('line').attr('class','scroll-line')
                                .attr('x1',x2).attr('x2',x2).attr('y1',y1).attr('y2',y2)
                                .style('stroke',colors.Academic).style('stroke-width',2)
    
                                g.append('line').attr('class','scroll-line')
                                .attr('x1',x2).attr('x2',x3).attr('y1',y2).attr('y2',y2)
                                .style('stroke',colors.Academic).style('stroke-width',2)
                            }
                        })
                        
                    })

                }
             })

        }
        setTimeout(()=>{showEvent()},5000)
        
    },[])

    return(
        <div id="axis-container">
            <svg id='year-similar-svg'></svg>
            <div id = "axis">
                <img src={axis} id = "axistu"></img>
            </div>
            <svg id="year-layer-svg"></svg>
            <svg id='none-svg'></svg>
        </div>
    )

}

export default TimeAxis