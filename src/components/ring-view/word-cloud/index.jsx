import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import Js2WordCloud from "js2wordcloud"
import { shapePerson, shapeLocation, shapeThing, shapeTime, bklocation,bkperson,bkthing,bktime } from "../../../assets"
import './index.css'
import personData from '../../../data/person.json'
import locationData from '../../../data/location.json'
import thingData from '../../../data/thing.json'
import timeData from '../../../data/time.json'





const WordCloud = () => {
    const ColorRuler = [
        "rgba(0, 0, 0, 0.3)",
        "rgba(0, 0, 0, 0.5)",
        "rgba(0, 0, 0, 0.7)",
        "rgba(0, 0, 0, 0.9)",
        "rgba(0, 0, 0, 1)",
    ]

    var fontmax=8, fontmin=5;

    
    const renderCloud = (list, num) => {
        
        let min_weight = list
            .map((item) => item[1])
            .reduce((x, y) => (x < y ? x : y))
        
        let max_weight = list
            .map((item) => item[1])
            .reduce((x, y) => (x > y ? x : y))
        let len = ColorRuler.length - 1
        let basic_domain = new Array(len + 1).fill(0).map((d, i) => i / len)
        let domain = basic_domain.map(
            (d) => min_weight + d * (max_weight - min_weight)
        )
        let ciColor = d3
            .scaleLinear()
            .clamp(true)
            .domain(domain)
            .range(ColorRuler)
        let imageShape;
        switch(num){
            case 1: imageShape = shapePerson;break;
            case 2: imageShape = shapeLocation;break;
            case 3: imageShape = shapeThing;break;
            case 4: imageShape = shapeTime;break;
        }
        
        const options = {
            fontFamily: "宋体",
            minFontSize: fontmin,
            maxFontSize: fontmax,
            tooltip: {
                show: true,
                formatter: function (item) {
                    return '"' + item[0] + '"' + "的词频: " + item[1]
                },
            },
            list: list,
            //@ts-ignore
            color: (word, weight, fontSize, distance, theta) => ciColor(weight),
            backgroundColor: "rgba(0,0,0,0)",
            imageShape: imageShape,
            rotateRatio: 0,
        }
        let container;
        switch(num){
            case 1: container=document.getElementById("person-cloud");break;
            case 2: container=document.getElementById("location-cloud");break;
            case 3: container=document.getElementById("thing-cloud");break;
            case 4: container=document.getElementById("time-cloud");break;
            default: container=document.getElementById("person-cloud");
        }
       
        let wc = new Js2WordCloud(container)
        wc.showLoading({
            backgroundColor: "rgba(0,0,0,0)",
            text: "渲染中……",
            effect: "spin",
        })
        setTimeout(function () {
            wc.hideLoading()
            wc.setOption(options)
        }, 20)
        window.onresize = () => {
            wc.resize()
        }
    }

    useEffect(() => {              
        renderCloud(personData, 1)
        renderCloud(locationData, 2)
        renderCloud(thingData, 3)
        renderCloud(timeData, 4)
    }, [])

    return (
        <div id='word-cloud-container'>
            <div id = 'person-container' className="word-container">
                <img src = {bkperson} id='bkperson'></img>
                <div id="person-cloud" className="word-cloud"> </div>
            </div>

            <div id = 'location-container' className="word-container">
                <img src = {bklocation} id='bklocation'></img>
                <div id="location-cloud" className="word-cloud"> </div>
            </div>

            <div id = 'time-container' className="word-container">
                <img src = {bktime} id='bktime'></img>
                <div id="time-cloud" className="word-cloud"> </div>
            </div>

            <div id = 'thing-container' className="word-container">
                <img src = {bkthing} id='bkthing'></img>
                <div id="thing-cloud" className="word-cloud"> </div>
            </div>
            
        </div>
        
    )
}
export default WordCloud
