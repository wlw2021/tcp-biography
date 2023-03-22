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
  //import figure from "../../../assets"
  import {painter,figure} from "../../../assets"
import Relation from "../../../pages/D-Relation";

  const R = 30
  const MAX_LINE_WIDTH = 20

  const useForceGraph = (data, id2name, size) => {
    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])
    const [max, setMax] = useState(1)
  
    useEffect(() => {
      if (!size) return
      if(!data) return
  
      const linkCnt = {}
      let forceMax = 1

      //console.log(data)
      
      data.forEach((d) => {
        const p1=d.人1id
        const p2=d.人2id
        const key = p1 + "-" + p2

        if (linkCnt[key] === undefined) {
          linkCnt[key] = {
            source: p1,
            target: p2,
            cnt: 1
          }
        } else {
          linkCnt[key].cnt++
          forceMax = Math.max(forceMax, linkCnt[key].cnt)
        }
      })
  
      //console.log(linkCnt)
  
      const forceLinks = Object.values(linkCnt)
      const forceNodes = Object.keys(id2name).map((d) => {return({ id: +d })})  
  
      const scale = d3
        .scaleLinear()
        .domain([1, forceMax])
        .range([size / 2 - R * 2, 4 * R])
      const forceLink = d3
        .forceLink(forceLinks)
        .id((d) => d.id)
        .distance((d) => scale(d.cnt))
  
      setTimeout(() => {
        try {
          d3.forceSimulation(forceNodes)
            .force("link", forceLink)
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(size / 2, size / 2))
            .force("collide", d3.forceCollide().radius(R * 2))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .stop()
            .tick(10000)
        } catch (e) {
          console.log(e)
        }
  
        setNodes(forceNodes)
        setLinks(forceLinks)
        setMax(forceMax)
      }, 0)
    }, [data, id2name, size])
  
    return {
      nodes,
      links,
      scale: d3.scaleLog().domain([1, max]).range([2, MAX_LINE_WIDTH])
    }
  }

const DEFAULT = d3.zoomIdentity.translate(0, 0).scale(1)
const useZoom = (ref) => {
  const [transform, setTransform] = useState(DEFAULT)

  useEffect(() => {
    const zoom = d3
      .zoom()
      .scaleExtent([0.7, 32])
      .on("zoom", (e) => {
        setTransform(e.transform)
      })

    d3.select(ref.current).select("svg").call(zoom).transition().duration()
  }, [ref])

  return transform
}

// const useHeight = (ele) => {
//   const [height, setHeight] = useState(0)

//   useLayoutEffect(() => {
//     if (!ele) return

//     const handleElementChange = () => {
//       const newHeight = ele.offsetHeight
//       setHeight(newHeight)
//     }

//     handleElementChange()

//     if (!window?.ResizeObserver) return
//     const resizeObserver = new ResizeObserver(handleElementChange)
//     resizeObserver.observe(ele)

//     return () => {
//       resizeObserver.disconnect()
//     }
//   }, [ele])

//   return height
// }

const ForceLink = (prop) =>{    
    const $container = useRef(null)
    const height = 1030
  
    const { nodes, links, scale } = useForceGraph(prop.relationList, prop.personInfo, height)
    const [info, setInfo] = useState(null) // 山水，人物，花鸟
    const [position, setPosition] = useState(null)
  
    console.log(prop.personInfo)

    const transform = useZoom($container)

  const range = useMemo(() => {
    let minX = Number.MAX_VALUE
    let minY = Number.MAX_VALUE
    let maxX = Number.MIN_VALUE
    let maxY = Number.MIN_VALUE

    nodes.forEach((node) => {
      minX = Math.min(minX, node.x)
      minY = Math.min(minY, node.y)
      maxX = Math.max(maxX, node.x)
      maxY = Math.max(maxY, node.y)
    })

    return {
      x: [minX, maxX],
      y: [minY, maxY]
    }
  }, [nodes])

  const xScale = useMemo(() => {
    return transform.rescaleX(d3.scaleLinear().domain(range.x).range([0, height]).nice())
  }, [height, range.x, transform])

  const yScale = useMemo(() => {
    return transform.rescaleY(d3.scaleLinear().domain(range.y).range([0, height]).nice())
  }, [height, range.y, transform])

  const onHoverPerson = useCallback(
    (node) => {
      setInfo(prop.personInfo[node.id])
      setPosition({
        x: xScale(node.x),
        y: yScale(node.y)
      })
    },
    [prop.personInfo, xScale, yScale]
  )

  const onMouseOutPerson = useCallback(() => {
    setInfo(null)
    setPosition(null)
  }, [])

  const fontSize = useMemo(() => {
    return Math.min(20, 12 * Math.sqrt(transform.k))
  }, [transform.k])

  console.log(links)

    return(
        <div id="force-link-container" ref={$container}>
            <svg width="100%" height={height + "px"} viewBox={`0 0 ${height} ${height}`}>
        <g stroke="#ccc" opacity={0.6} cursor="pointer">
          {links.map((link) => {
            if (link.source.id !== 17690 && link.target.id !== 17690) {
              return null
            }

            const id1 = link.source.id + "-" + link.target.id
            const id2 = link.target.id + "-" + link.source.id
            //const key = link.source.id+'rr'
            return (
              <>
                {/* strokeWidth略宽达到stroke+fill效果 */}
                <line
                  key={link.index}
                  x1={xScale(link.source.x)}
                  y1={yScale(link.source.y)}
                  x2={xScale(link.target.x)}
                  y2={yScale(link.target.y)}
                  stroke="black"
                  strokeWidth={scale(link.cnt) * 1.2 + 1}
                />
                <line
                  key={link.index}
                  x1={xScale(link.source.x)}
                  y1={yScale(link.source.y)}
                  x2={xScale(link.target.x)}
                  y2={yScale(link.target.y)}
                  stroke= "#ccc"
                  strokeWidth={scale(link.cnt) * 1.2}
                />
              </>
            )
          })}
        </g>
        <g fontSize={fontSize} textAnchor="middle" cursor="pointer">
          {nodes.map((node) => {
            const r = 30
            return (
              <g
                //key={node.id}
                transform={`translate(${xScale(node.x) - r / 2}, ${yScale(node.y) - r / 2})`}
                
                {...(prop.personInfo[node.id]
                  ? {
                      onMouseOver: () => onHoverPerson(node),
                      onMouseOut: onMouseOutPerson
                    }
                  : {})}
              >
                <image href={prop.personInfo[node.id] ? painter : figure} width={r} height={r} />)
                <text dx={r / 2} dy={r + fontSize}>
                  {prop.personInfo[node.id].姓名}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
      {!!position && (
        <div
          className="info"
          style={{
            transform: `translate(${position.x - height / 2 + 50}px,${
              position.y - height / 2 + 60
            }px)`
          }}
        >
          {info && (
            <>
              <p>总数:</p>
            </>
          )}
        </div>
      )}
        </div>
    )

}

export default ForceLink