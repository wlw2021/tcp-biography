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
          key: 'id1'+'f',
          width: 200
        },
        {
          title: '关系人2',
          dataIndex: 'id2',
          key: 'id2'+'s',
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
            width: 200,
            filters: [
              { text: '亲缘', value: '亲缘' },
              { text: '政治', value: '政治' },
              { text: '文学', value: '文学' },
              { text: '画作', value: '画作' },
              { text: '社交', value: '社交' },
              { text: '其他', value: '其他' },              
            ],
            onFilter: (value, record) => record.type===value
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
        if(prop.chartInfo===null)
        {relationlist.forEach((d)=>{
            var name1 = person[d.人1id].姓名
            var name2 = person[d.人2id].姓名
            var begin, end, place;
            
            if(!d.起始年||d.起始年===undefined) begin = '不详'
            if(!d.结束年||d.结束年===undefined) end = '不详'
            if(!d.地点||d.地点===undefined) place = '不详'

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
        })}
        else{ 
          console.log(prop.chartInfo)
          var d=prop.chartInfo
          var name1 = person[d.人1id].姓名
            var name2 = person[d.人2id].姓名
            var begin, end, place;
            
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
        }
        setData(tabledata)

    },[prop])
          
      

      return(
        <div id='force-chart-container'>
            <Table dataSource={data} columns={columns} size = 'small'  pagination={{ pageSize: 6 }} style={{fontSize: 200}}/>
        </div>
      )
    


  }

  export default ForceChart