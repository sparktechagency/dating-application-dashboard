import { Form, Input, Modal, Radio, Select, Table } from 'antd'
import React, { useState } from 'react'
import { MdBlock, MdOutlineMessage } from 'react-icons/md';
import { RiBarChartFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
const { TextArea } = Input
const GuestHostInfo = ({ dataSource }) => {
  const [openModal, setOpenModal] = useState(false);
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
      title: <p className='flex justify-center'>Survey Response</p>,
      dataIndex: "survey",
      key: "survey",
      render: (_, record) => (
        <div className='flex justify-center'>
          <Link to={'/survey-response'} className='bg-[#2757A6] inline-block text-white p-1 rounded-sm '>
            <RiBarChartFill size={22} />
          </Link>
        </div>
      )
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (_, record) => (
        <div onClick={() => setOpenModal(true)} className='bg-[#FFA175] cursor-pointer inline-block text-white p-1 rounded-sm '>
          <MdOutlineMessage size={22} />
        </div>
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
      <Modal centered footer={false} open={openModal} onCancel={() => setOpenModal(false)}>
        <p className='text-xl font-medium text-center pb-8'>Message</p>
        <Form layout='vertical'>
          <Form.Item label="Send To">
            <Select
              // mode="multiple"
              placeholder="Please select"
              defaultValue={["Only to user"]}
              // onChange={handleChange}
              style={{
                width: '100%',
              }}
              options={[
                { value: 'Only to user', label: "Only to user" },
                { value: 'all user', label: "all user" },
                { value: 'listener', label: "listener" }
              ]}
            />
          </Form.Item>
          <Form.Item label="Message">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Send : ">
            <Radio.Group 
            // onChange={onChange} value={value}
            >
              <Radio value={1}>Notification</Radio>
              <Radio value={2}>Email</Radio>
            </Radio.Group>
          </Form.Item>
          <div className='flex items-center gap-4 justify-center'>
            <button className='border border-[#FFE2D4] px-5 py-2 text-[#FFA175] rounded-sm w-full'>cancel</button>
            <button className='bg-[#FFA175] px-5 py-2 text-white rounded-sm w-full'>Send</button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default GuestHostInfo