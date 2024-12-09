import { Form, Input, Modal, Table } from 'antd'
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Subscriptions = () => {
    const [openModal, setOpenModal] = useState(false)
    const data = [
        {
            key: '12345',
            name: "Listeners",
            fee: "$500",
            action: "Edit"
        },
        {
            key: '12346',
            name: "Speaker",
            fee: "$300",
            action: "Edit"
        },
        {
            key: '12347',
            name: "Seeker",
            fee: "$500",
            action: "Edit"
        },
        {
            key: '12348',
            name: "VIP",
            fee: "$500",
            action: "Edit"
        },
    ]
    const columns = [
        {
            title: 'SL no.',
            dataIndex: "key",
            key: 'key'
        },
        {
            title: 'Subscription Name',
            dataIndex: "name",
            key: 'name'
        },
        {
            title: 'Subscription Fee',
            dataIndex: "fee",
            key: 'fee'
        },
        {
            title: 'Action',
            dataIndex: "action",
            key: 'action',
            render: (_, record) => (
                <div>
                    <p onClick={() => setOpenModal(true)} className='text-[#FFA175] cursor-pointer'>{record?.action}</p>
                </div>
            )
        },
    ]
    return (
        <div className='bg-white rounded-md p-4'>
            <div className='flex items-center gap-2'>
                <Link to={-1}><FaArrowLeft size={18} className='text-[var(--primary-color)] ' /></Link>
                <span className='font-semibold text-[20px]'> Subscriptions</span>
            </div>

            <div>
                <Table columns={columns} dataSource={data} />
            </div>
            <Modal centered footer={false} open={openModal} onCancel={() => setOpenModal(false)} >
                <p className='text-center text-xl font-semibold mb-5'>Edit</p>
                <Form
                    layout='vertical'
                >
                    <Form.Item label={<p className='text-[18px]'>Subscription Name</p>}>
                        <Input className='border border-[#FFA175] hover:border-[#FFA175] py-2 rounded-sm' />
                    </Form.Item>
                    <Form.Item label={<p className='text-[18px]'>Subscription Fee</p>}>
                        <Input className='border border-[#FFA175] hover:border-[#FFA175] py-2 rounded-sm' />
                    </Form.Item>
                    <div className='flex justify-center items-center gap-2 w-full'>
                        <button className='border border-[#FFE2D4] text-[#FFA175] w-full rounded-sm py-1 text-[20px]'>Cancel</button>
                        <button className='w-full bg-[#FFA175] py-[5px] text-[18px] text-white rounded-sm'>Update</button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default Subscriptions