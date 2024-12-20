import { Form, Modal, Table } from 'antd'
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaArrowLeft } from 'react-icons/fa'
import { IoEyeOutline } from 'react-icons/io5'
import { LuReply } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import img from '../../assets/images/user1.png'
import img2 from '../../assets/images/user2.png'
import TextArea from 'antd/es/input/TextArea'

const Support = () => {
    const [openReplyModal, setOpenReplyModal] = useState(false)
    const [detailsModal, setOpenDetailsModal] = useState(false)

    const columns = [
        {
            title: 'ID No',
            dataIndex: "key",
            key: 'key'
        },
        {
            title: 'Date',
            dataIndex: "date",
            key: 'date',

        },
        {
            title: 'User Name',
            dataIndex: "name",
            key: 'name',
            render: (_, record) => {
                return (
                    <div className='flex items-center gap-2'>
                        <img src={record?.img} alt="" />
                        <p>{record?.name}</p>
                    </div>
                )
            }
        },
        {
            title : 'Description',
            dataIndex : 'description',
            key : 'description'
        },
        {
            title: 'View',
            dataIndex: "view",
            key: 'view',
            render: () => (
                <div className='flex items-center gap-2'>
                    <button onClick={()=>setOpenDetailsModal(true)} className='bg-[#2757A6] p-2 rounded-md text-white'><IoEyeOutline size={22}  /></button>
                </div>
            )
        },
        {
            title: 'Reply',
            dataIndex: "reply",
            key: 'reply',
            render: () => (
                <div className='flex items-center gap-2'>
                    <button onClick={()=> setOpenReplyModal(true)} className='bg-[#FFA175] p-2 rounded-md text-white'><LuReply size={22} /></button>
                </div>
            )
        },
    ]


    const tableData = [
        {
            key : '#123',
            date : '12/06/24',
            name : 'Hari Dangang',
            img  : img,
            description : 'No-show at shceduled pi...'
        },
        {
            key : '#124',
            date : '14/06/24',
            name : 'Hari Dangang',
            img  : img2,
            description : 'No-show at shceduled pi...'
        },
    ]


    return (
        <div className='bg-white p-4 rounded-md'>
            <div className="flex justify-between item-center mb-5  ">
                <div className="flex items-center gap-2">
                    <Link to={-1}><FaArrowLeft size={18} className='text-[var(--primary-color)] ' /></Link>
                    <span className='font-semibold text-[20px]'>Support</span></div>
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
                <Table columns={columns} dataSource={tableData} />
            </div>

            <div>
                <Modal centered footer={false} open={openReplyModal} onCancel={()=> setOpenReplyModal(false)}>
                    <p className='text-center text-xl font-semibold'>Reply</p>
                    <Form layout='vertical'>
                        <Form.Item name={'Reply'} label="Reply" >
                            <TextArea rows={5}/>
                        </Form.Item>
                        <button className='bg-[#FFA175] text-white w-full rounded-md py-2'>Reply</button>
                    </Form>
                </Modal>
            </div>
            <div>
                <Modal centered footer={false} open={detailsModal} onCancel={()=> setOpenDetailsModal(false)}>
                    <p className='text-center text-xl font-semibold'>Details</p>
                    <div>
                        <p className='flex items-center justify-between'><span>ID No: </span> <span>#326548755</span> </p>
                        <p className='flex items-center justify-between'><span>Date: </span> <span>12/08/24</span> </p>
                        <p className='flex items-center justify-between'><span>User Name: </span> <span>Devon Lane</span> </p>
                        <p className='my-2'><span>Description oht the issue: </span> </p>
                        <p className=''><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span> </p>
                    </div>
                </Modal>
            </div>



        </div>
    )
}

export default Support