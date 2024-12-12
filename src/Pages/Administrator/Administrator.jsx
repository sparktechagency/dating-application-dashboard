import { Checkbox, Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import { CiCamera, CiSearch } from 'react-icons/ci'
import { FaArrowLeft, FaRegCalendarAlt } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import img from '../../assets/images/admin.png'
const Administrator = () => {
    const [openModal, setOpenModal] = useState(false)


    const options = [
        "Dashboard",
        "User Management",
        "Podcast Management",
        "Subscriptions",
        "Support",
        "Settings",
    ];

    return (
        <div className='bg-white p-4 rounded-md'>
            <div className="flex justify-between item-center ">
                <div className="flex items-center gap-2">
                    <Link to={-1}><FaArrowLeft size={18} className='text-[var(--primary-color)] ' /></Link>
                    <span className='font-semibold text-[20px]'>Administrator</span></div>
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
            <button onClick={() => setOpenModal(true)} className='flex  items-center gap-2 bg-[#FFA175] text-white px-2 py-1 rounded-sm mt-5'> <FiPlus /> New</button>

            <Modal centered footer={false} open={openModal} onCancel={() => setOpenModal(false)}>
                <p className='text-center text-xl font-medium mb-5'> New</p>
                <div className='relative'>
                    <img className='h-16 mx-auto' src={img} alt="" />
                    <p className='absolute top-[54%] left-[54%] '>
                        <CiCamera size={20} className='inline-block  bg-[#FFA175] text-white  rounded-md' />
                    </p>
                </div>
                <Form layout='vertical'>
                    <Form.Item
                        name="name" label={<p className=''>Name</p>}
                    >
                        <Input className='py-1 border-[#FFA175] hover:border-[#FFA175]' />
                    </Form.Item>
                    <Form.Item
                        name="email" label={<p className=''>Email</p>}
                    >
                        <Input className='py-1 border-[#FFA175] hover:border-[#FFA175]' />
                    </Form.Item>
                    <Form.Item
                        name="contact" label={<p className=''>Contact Number</p>}
                    >
                        <Input className='py-1 border-[#FFA175] hover:border-[#FFA175]' />
                    </Form.Item>
                    <Form.Item
                        name="password" label={<p className=''>Password</p>}
                    >
                        <Input.Password className='py-1 border-[#FFA175] hover:border-[#FFA175]' />
                    </Form.Item>
                    <Form.Item>
                        <Select className='border-[#FFA175] hover:border-[#FFA175]' defaultValue={["host"]} options={[
                            { name: "host", value: 'host' },
                            { name: "Admin", value: 'Admin' }
                        ]} />
                    </Form.Item>
                    <div className="max-w-md mx-auto">
                        <h3 className="text-lg font-semibold mb-2">Give Access To</h3>
                        <Checkbox
                            // onChange={handleCheckAll}
                            // checked={checkAll}
                            className="mb-2"
                        >
                            All
                        </Checkbox>
                        <Checkbox.Group
                            options={options}
                            // value={checkedList}
                            // onChange={handleChange}
                            className="flex flex-col gap-2"
                        />
                    </div>
                    <button className='bg-[#FFA175] w-full mt-2 rounded-sm  text-white py-2'>Save</button>
                </Form>
            </Modal>
        </div>
    )
}

export default Administrator