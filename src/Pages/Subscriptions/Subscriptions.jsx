import { Form, Input, Modal, Table } from 'antd'
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Subscriptions = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openDescriptionModal, setOpenDescriptionModal] = useState(false)
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
            title: 'Description',
            dataIndex: "description",
            key: 'description',
            render: (_, record) => (
                <div>
                    <p onClick={() => setOpenDescriptionModal(true)} className='text-[#FFA175] cursor-pointer'>View</p>
                </div>
            )
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
            <Modal centered footer={false} onCancel={() => setOpenDescriptionModal(false)} open={openDescriptionModal}>
                <p className='text-xl font-medium text-center'>Description</p>
                <div className='my-2'>
                    Everything in the Listener package, plus:
                    <ul className='mt-5'>
                        <li>More Matches: Meet three matches instead of two.</li>
                        <li>Extended Chat: Access chat with your match for up to one week.</li>
                        <li> More Matches: Meet three matches instead of two.</li>
                        <li>Exclusive Content: Access to curated dating tips, insights, and advice not available to free-tier users.</li>
                        <li>Second Chance: Users can be matched again if their first match doesn't work out, providing another chance at connection</li>
                    </ul>
                    
                    
                    

                </div>
            </Modal>
        </div>
    )
}

export default Subscriptions