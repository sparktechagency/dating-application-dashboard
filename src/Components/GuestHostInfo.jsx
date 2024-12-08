import { Table } from 'antd'
import React from 'react'
import { MdBlock } from 'react-icons/md';

const GuestHostInfo = ({dataSource}) => {
    const columns = [
        {
          title: "Order ID",
          dataIndex: "key",
          key: "key",
        },
        {
          title: "User's Name",
          dataIndex: "name",
          key: "name",
          render: (_, record) => {
            return (
              <div className="flex items-center gap-2">
                <img
                  src={record?.img}
                  className="w-[40px] h-[40px] rounded-full"
                  alt=""
                />
                <p className="font-medium">{record?.name}</p>
              </div>
            );
          },
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
        },
        
        {
          title: "Date of birth",
          dataIndex: "dob",
          key: "dob",
        },
        {
          title: "Contact Number",
          dataIndex: "contact",
          key: "contact",
        },
    
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "License No.",
          dataIndex: "license",
          key: "license",
        },
       
    
    
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
    
          render: (_, record) => {
            return (
              <div className="flex items-center justify-center gap-1">
                <button className='bg-red-600 text-white p-2 rounded-md '>
                <MdBlock  size={20}/>
                </button>
                
    
              </div>
            );
          },
          align: "center",
        },
      ];
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} className="custom-pagination" pagination={{
                pageSize: 5,
                showTotal: (total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`,
                locale: {
                    items_per_page: '',
                    prev_page: 'Previous',
                    next_page: 'Next',
                },
            }} />
        </div>
    )
}

export default GuestHostInfo