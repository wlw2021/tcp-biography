import React, { useEffect, useState } from 'react';
import TimeAxis from '../../components/time-axis';
import './index.css'
import axios from 'axios';
//import { logo } from '../../assets';
const Appreciation =(prop)=>{
  const [relation, setRelation] = useState(null)
  const [person, setPerson] = useState(null)
  const [year, setyear] = useState(null)
    useEffect(()=>{
      const getinfo=async()=>{
        var url = 'http://localhost:28081/getpersonscore?pid='+prop.whichCase+'&addnames=&addcids='
        await axios({
                method:"get",
                url:url,
            }).then(function (res) {
               setRelation( res.data.data.人物关系信息)
               setPerson(res.data.data.人物列表)
               
            })
            .catch(function (error) {
                console.log(error);
            })
            var theyear=2000
               Object.keys(relation).forEach((e)=>{
                if(relation[e]!=null){
                  if(relation[e].生年<theyear)theyear=relation[e].生年
                }
               })
               console.log('hereokok')
               console.log(theyear)
               setyear(theyear)
      }
      getinfo()
    },[prop.whichCase])
    

      return(
        <div className='C-container'>
            <TimeAxis 
            person={person}
            relation={relation}
            linkedID={prop.linkedID}
            setLinkedID={prop.setLinkedID}
            linkedName={prop.linkedName}
            setLinkedName={prop.setLinkedName}
            setSelectedPerson = {prop.setSelectedPerson}
            whichCase={prop.whichCase}
            addScroll = {prop.addScroll}
            setAddScroll = {prop.setAddScroll}/>         
        </div>
           
      )

}

export default Appreciation;

