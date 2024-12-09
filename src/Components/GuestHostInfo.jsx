import { Table } from 'antd'
import React from 'react'
import { MdBlock } from 'react-icons/md';
import { RiBarChartFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const GuestHostInfo = ({ dataSource }) => {
  const columns = [
    {
      title: "SL no",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={record?.img}
              className="w-[40px] h-[40px] rounded-md"
              alt=""
            />
            <p className="font-medium">{record?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Survey Response",
      dataIndex: "survey",
      key: "survey",
      render: (_, record) => (
        <Link to={'/survey-response'} className='bg-[#2757A6] inline-block text-white p-1 rounded-sm '>
          <RiBarChartFill size={22} />
        </Link>
      )
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",

      render: (_, record) => {
        return (
          <div className="flex items-center justify-center gap-1">
            <button className='bg-red-600 text-white p-2 rounded-md '>
              <MdBlock size={20} />
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