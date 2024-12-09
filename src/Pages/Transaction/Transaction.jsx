import { Table } from 'antd'
import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import img1 from '../../assets/images/user1.png'
import img2 from '../../assets/images/user2.png'
import { FaArrowLeft } from 'react-icons/fa'

const Transaction = () => {
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
      render : (_, record)=>(
        <div className='flex items-center gap-2'>
          <img src={record?.img} alt="" />
          <p>{record?.name}</p>
        </div>
      )
    },
    {
      title: "Joining Date",
      dataIndex: "joining",
      key: "joining",
    },
    {
      title: "Subscription Plan",
      dataIndex: "subscription",
      key: "subscription",
    },

    {
      title: "Subscription Fee",
      dataIndex: "fee",
      key: "fee",
    },

   
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <div className={`rounded-full text-[#00A991] w-[60%] text-center  py-1 ${record?.status === "Due" ? "border border-[#F3A211] rounded-full text-[#F3A211]" : "border border-[#00A991] "}`}>
          {record?.status}
        </div>
      )
    },



  ];


  const dataSource = [
    {
      key: "#12333",
      joining: "12/01/24",
      name: "Jhon Smith",
      img: img1,
      hired: "Josep lucial",
      fee: '$500',
      subscription : "Speaker",
      status: "Due"
    },

    {
      key: "#12333",
      joining: "12/01/24",
      img: img2,
      name: "Jhon Smith",
      hired: "Josep lucial",
      fee: '$500',
      subscription : "Speaker",
      status: "Paid"
    },

    {
      key: "#12333",
      joining: "12/01/24",
      img: img1,
      name: "Jhon Smith",
      hired: "Josep lucial",
      fee: '$500',
      subscription : "Speaker",
      status: "Due"
    },

    {
      key: "#12333",
      joining: "12/01/24",
      name: "Jhon Smith",
      img: img2,
      hired: "Josep lucial",
      fee: '$500',
      subscription : "Speaker",
      status: "Paid"
    },

    {
      key: "#12333",
      joining: "12/01/24",
      name: "Jhon Smith",
      hired: "Josep lucial",
      img: img1,
      fee: '$500',
      subscription : "Speaker",
      status: "Due"
    },


  ];

  return (
    <div className='p-5 bg-white rounded-md'>

      <div className="flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}><FaArrowLeft size={18} className='text-[var(--primary-color)] ' /></Link>
          <span className='font-semibold text-[20px]'>Premium Subscribers</span></div>
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-1 rounded-md border border-[#FFA175] focus:border-[#FFA175] focus:outline-none "
            />
            <span className="absolute left-3 top-2.5 text-gray-400">

              <CiSearch className='text-[#FFA175]' />
            </span>
          </div>
        </div>
      </div>

      <div>
      </div>
      <div className='mt-5'>
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


    </div>
  )
}

export default Transaction