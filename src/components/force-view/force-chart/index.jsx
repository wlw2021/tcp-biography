import React, {
    useEffect,
    useState
  } from "react"

import { Table } from "antd";
import './index.css'

  const ForceChart = (prop) =>{

    const columns = [
        {
          title: '关系人1',
          dataIndex: 'id1',
          key: 'id1',
          width: 200
        },
        {
          title: '关系人2',
          dataIndex: 'id2',
          key: 'id2',
          width: 200
        },
        {
          title: '关系',
          dataIndex: 'relation',
          key: 'relation',
          width: 200
        },
        {
            title: '关系类型',
            dataIndex: 'type',
            key: 'type',
            width: 200
          },
          {
            title: '地点',
            dataIndex: 'address',
            key: 'address',
            width: 200
          },
          {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
          }
      ];
       
      const [data, setData] = useState([])
    useEffect(()=>{
        //console.log(prop)
        if(!prop.relationList) return

        var relationlist = prop.relationList;
        var person = prop.personInfo;

        var count =0;
        var tabledata = [];
        relationlist.forEach((d)=>{
            var name1 = person[d.人1id].姓名
            var name2 = person[d.人2id].姓名
            var begin, end, place;
            
            if(!d.起始年) begin = '不详'
            if(!d.结束年) end = '不详'
            if(!d.地点) place = '不详'

            var time = begin+' ~ '+end

            var item = {
                key: count,
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
    const dataSource = [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ];
      
      

      return(
        <div id='force-chart-container'>
            <Table dataSource={data} columns={columns} size = 'small'  pagination={{ pageSize: 6 }} style={{fontSize: 200}}/>
        </div>
      )
    


  }

  export default ForceChart