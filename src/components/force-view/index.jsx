import axios from "axios";
import './index.css'
import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
  } from "react"
import * as d3 from "d3"
import ForceLink from "./force-link";
import ForceChart from "./force-chart";
  const R = 30
  const MAX_LINE_WIDTH = 20

const ForceView = (prop) =>{

    const [personInfo,setPersonInfo] = useState(null)
    const [relationList, setRelationList] = useState(null)

    useEffect(()=>{

        const getShowValue = async() =>{
            var url = 'http://aailab.cn:28081/getpersonnet?cid='+ '10183'
            await axios({
                method:"get",
                url:url,
            }).then(function (res) {
                console.log('here')
                console.log(res.data)
                setPersonInfo(res.data.data.人物信息)
                setRelationList(res.data.data.关系列表)                                
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        getShowValue()   
    },[prop])  


    return(
        <div id="force-container">
            <div id = 'force-link'>
                <ForceLink 
                linkedid = {prop.linkedid}
                setLinkedid = {prop.setLinkedid}
                personInfo = {personInfo}
                relationList = {relationList}
                />
            </div>
            <div id = 'force-chart'>
                <ForceChart 
                linkedid = {prop.linkedid}
                setLinkedid = {prop.setLinkedid}
                personInfo = {personInfo}
                relationList = {relationList}
                />
            </div>
        </div>
    )

}

export default ForceView