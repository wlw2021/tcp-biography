import React, { useEffect, useState } from 'react';
import './index.css'
import { divide } from '../../assets';
import RingView from '../../components/ring-view';
import DevideShow from '../../components/label-view';
import SealView from '../../components/seal-view';
import axios from 'axios';
const Features =(prop)=>{
    const [personnn, setperson] = useState({
        "children":[]
    })
    const [uppic, setuppic] = useState(null)
    const [downpic, setdownpic] = useState(null)
    const [origin, setorigin] = useState(null)    
    
    useEffect(()=>{
        const getinfo = async()=>{
            var dylist, aulist
            var personn={
                "children":[]
            }
            var url="http://localhost:28081/getauthorlist/"+prop.whichCase
                    await axios({
                            method:"get",
                            url:url,
                        }).then(function (res) {
                            dylist=res.data.data.dylist
                            aulist=res.data.data.aulist
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            dylist.forEach((e)=>{
                if(e!='unknow'){
                personn.children.push({
                    "name":e,
                    "children":[]
                })}
                else{
                    personn.children.push({
                        "name":'None',
                        "children":[]
                    })
                }
            })
            var tmp = []
            aulist.unknow.forEach((e)=>{
                tmp.push(
                    {
                        "name":e.姓名,
                        "thisnum": e.本幅,
                        "allnum": e.总数,
                        "children":e.印章列表
                    }
                )
            })
            personn.children.forEach((e)=>{
                if(e.name==='None'){
                    e.children=tmp
                }
            })
    
            Object.keys(aulist).forEach((key)=>{
                if(key!=='unknow'){
                    tmp=[]
                    aulist[key].forEach((e)=>{
                        tmp.push(
                            {
                                "name":e.姓名,
                                "thisnum": e.本幅,
                                "allnum": e.总数,
                                "children":e.印章列表
                            }
                        )
                    })
                    personn.children.forEach((e)=>{
                        if(e.name===key){
                            e.children=tmp
                        }
                    })
                }
            })
            setperson(personn)
        }
    
        const getpic = async()=>{
            var url='http://localhost:28081/getimg?imgid='+prop.whichCase+'&imgtype=新图'
            await axios({
                    method:"get",
                    url:url,
                }).then(function (res) {
                    setuppic(res.data.data[0].streamimg)
                    setdownpic(res.data.data[1].streamimg)
                })
                .catch(function (error) {
                    console.log(error);
                })
    
                url='http://localhost:28081/getimg?imgid='+prop.whichCase+'&imgtype=画作'
                await axios({
                        method:"get",
                        url:url,
                    }).then(function (res) {
                        setorigin(res.data.data.streamimg)
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
        }
        getinfo()
        getpic()
    },[prop.whichCase])

        
      return(
        <div className='B-container'>
            <div id="ring-view-container">
                <RingView 
                origin={origin}
                uppic={uppic}
                downpic={downpic}
                person={personnn}
                picid={prop.picid}
                whichCase={prop.whichCase}
                 selectedPerson = {prop.selectedPerson}
                 setSelectedPerson = {prop.setSelectedPerson}
                />                
            </div>    

            <div id="divide">
                <img id='dividetu' src={divide} alt="分割线" />
            </div>  
            <div id="seal-container">
                <SealView 
                whichCase={prop.whichCase}
                selectedPerson = {prop.selectedPerson}
                setSelectedPerson = {prop.setSelectedPerson}/>                               
            </div>    
            <div id="lable-view-container">
                <DevideShow 
                whichCase={prop.whichCase}
                linkedID={prop.linkedID}
                setLinkedID={prop.setLinkedID}
                linkedName={prop.linkedName}
                setLinkedName={prop.setLinkedName}
                matrixID = {prop.matrixID}
                setMatrixID = {prop.setMatrixID}
                matrixName = {prop.matrixName}
                setMatrixName = {prop.setMatrixName}
                addScroll = {prop.addScroll}
                setAddScroll = {prop.setAddScroll}
                selectedPerson = {prop.selectedPerson}
                setSelectedPerson = {prop.setSelectedPerson}/>                
            </div>      
        </div>
           
      )

}

export default Features;

