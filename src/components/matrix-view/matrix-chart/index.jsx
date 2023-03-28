import React, {
    useEffect,
    useState
  } from "react"

import { Table } from "antd";
import './index.css'

  const MatrixChart = (prop) =>{

    const columns = [
        {
          title: '关系人1',
          dataIndex: 'id1',
          key: 'id1',
          width: 170
        },
        {
          title: '关系人2',
          dataIndex: 'id2',
          key: 'id2',
          width: 170
        },
        {
          title: '关系',
          dataIndex: 'relation',
          key: 'relation',
          width: 320
        },
        {
            title: '关系类型',
            dataIndex: 'type',
            key: 'type',
            width: 150
          },
          {
            title: '地点',
            dataIndex: 'address',
            key: 'address',
            width: 180
          },
          {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
          }
      ];
       
      const [data, setData] = useState([])
    useEffect(()=>{
        console.log(prop)
        if(!prop.relation) return

        var relationlist = prop.relation;
        var person = prop.itemlist;

        var count =0;
        var tabledata = [];
        relationlist.forEach((d)=>{
            var name1, name2;
            var begin, end, place;

            Object.keys(person).forEach((e)=>{
              if(person[e]===d.人1id){
                name1=e
              }

              if(person[e]===d.人2id){
                name2=e
              }
            })
            
            if(!d.起始年) begin = '不详'
            if(!d.结束年) end = '不详'
            if(!d.地点) place = '不详'

            var time = begin+' ~ '+end

            var item = {
                key: count++,
                id1:name1,
                id2:name2,
                relation:d.关系,
                type:d.关系类型,
                address:place,
                time:time
            }
            
            tabledata.push(item)
        })
        setData(tabledata)

    },[prop])
         

      return(
        <div id='force-chart-container'>
            <Table dataSource={data} columns={columns} size = 'small'  pagination={{ pageSize: 6 }} style={{fontSize: 200}}/>
        </div>
      )
    


  }

  export default MatrixChart