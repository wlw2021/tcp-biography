import React, {
  useEffect,
  useState,
  useRef
} from "react"
import { SearchOutlined } from '@ant-design/icons';
import { Table, Form, Typography, Button, Space, Input} from "antd";
import './index.css'

const EditableCell = ({
editing,
dataIndex,
title,
record,
index,
children,
...restProps
}) => {
const inputNode = <Input />;
//console.log(dataIndex)
return (
  <td {...restProps}>
    {editing ? (
      <Form.Item
        name={dataIndex}
        style={{
          margin: 0,
        }}
        rules={[
          {
            required: true,
            message: `Please Input ${title}!`,
          },
        ]}
      >
        {inputNode}
      </Form.Item>
    ) : (
      children
    )}
  </td>
);
};

const MatrixChart = (prop) =>{

  const [searchText, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState('');
const searchInput = useRef(null);
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};
const handleReset = (clearFilters) => {
  clearFilters();
  setSearchText('');
};
const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
    <div
      style={{
        padding: 8,
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{
          marginBottom: 12,
          fontSize:20,
          display: 'block',
        }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{
            width: 120,
            height:35,
            fontSize:20,
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{
            width: 123,
            height:35,
            fontSize:20,
          }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          style={{
            width: 123,
            height:35,
            fontSize:20,
          }}
          onClick={() => {
            close();
          }}
        >
          close
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined
      style={{
        color: filtered ? '#1890ff' : undefined,
      }}
    />
  ),
  onFilter: (value, record) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownOpenChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  render: (text) =>      
      text
});

  
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState([])
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      id1: '',
      id2: '',
      relation: '',
      type:'',
      address:'',
      startyear:'',
      endyear:'',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
    
  const columns = [
    {
      title: 'Figure 1',
      dataIndex: 'id1',
      key: 'id1'+'f',
      width: 200,
      editable: true,
      ...getColumnSearchProps('id1'),
    },
    {
      title: 'Figure 2',
      dataIndex: 'id2',
      key: 'id2'+'s',
      width: 200,
      editable: true,
      ...getColumnSearchProps('id2'),
    },
    {
      title: 'Thing',
      dataIndex: 'relation',
      key: 'relation',
      width: 300,
      editable: true,
      filters: [
        { text: '任官', value: '任职' },
        { text: '派系', value: '派系' },
        { text: '其他', value: '其他'}           
      ],
      onFilter: (value, record) => record.relation.substring(0,2) === value
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        width: 150,
        editable: true,
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
        title: 'Location',
        dataIndex: 'address',
        key: 'address',
        width: 150,
        editable: true,
      },
      {
        title: 'Begin',
        dataIndex: 'startyear',
        key: 'startyear',
        width: 120,
        editable: true,
      },
      {
        title: 'End',
        dataIndex: 'endyear',
        key: 'endyear',
        width: 120,
        editable: true,
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        key: 'operation',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 25,
                  fontSize:'20px'
                }}
              >
                Save
              </Typography.Link >
            <Typography.Link  onClick={cancel} style={{fontSize:'20px'}}>
              Cancel
            </Typography.Link>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{fontSize:'20px'}}>
              Edit
            </Typography.Link>
          );
        },
        
      }
  ];
       
    useEffect(()=>{
        //console.log(prop)
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
            
            if(!d.起始年||d.起始年===undefined) {begin = '不详'}
            else begin=d.起始年
            if(!d.结束年||d.结束年===undefined) {end = '不详'}
            else end = d.结束年
            if(!d.地点||d.地点===undefined) {place = '不详'}
              else place = d.地点

            var time = begin+' ~ '+end

            var item = {
                key: count++,
                id1:name1,
                id2:name2,
                relation:d.关系,
                type:d.关系类型,
                address:place,
                startyear: begin,
                endyear:end,
                edit:'none'
            }
            
            tabledata.push(item)
        })
        setData(tabledata)

    },[prop])
         

    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });

      return(
        <div id='force-chart-container'>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              size = 'small'
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                pageSize: 6
              }}
            />
          </Form>
        </div>
      )  

  }

  export default MatrixChart