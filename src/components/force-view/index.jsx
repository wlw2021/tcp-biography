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
import App2 from "./force-chart/test";
  const R = 30
  const MAX_LINE_WIDTH = 20

const ForceView = (prop) =>{

    const [personInfo,setPersonInfo] = useState(null)
    const [relationList, setRelationList] = useState(null)
    const [chartInfo, setChartInfo]=useState(null)

    useEffect(()=>{
        setPersonInfo(null)
        setRelationList(null)
        console.log(prop)
        console.log(prop.linkedID)
        //prop.setLinkedID('10183')
        const getShowValue = async() =>{
            var url = 'http://aailab.cn:28081/getpersonnet?cid='+prop.linkedID
            console.log(url)
            await axios({
                method:"get",
                url:url,
            }).then(function (res) {
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
                linkedID = {prop.linkedID}
                setLinkedID = {prop.setLinkedID}
                personInfo = {personInfo}
                relationList = {relationList}
                chartInfo = {chartInfo}
                setChartInfo = {setChartInfo}
                />
            </div>
            <div id = 'force-chart'>
                <ForceChart 
                linkedID = {prop.linkedID}
                setLinkedID = {prop.setLinkedID}
                personInfo = {personInfo}
                relationList = {relationList}
                chartInfo = {chartInfo}
                setChartInfo = {setChartInfo}
                />
                {/* <App2 /> */}
            </div>
        </div>
    )

}

export default ForceView