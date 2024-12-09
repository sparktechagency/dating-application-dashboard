import { Table } from 'antd'
import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaArrowLeft } from 'react-icons/fa'
import { LuCalendarClock } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import img from '../../assets/images/user1.png'
import img2 from '../../assets/images/user2.png'
import img3 from '../../assets/images/user3.png'
import img4 from '../../assets/images/user4.png'

const PodcastManagement = () => {
    const dataSource = [
        {
            key: "#12331",
            perticipant1: "Holiday Parties",
            perticipant1Img: img,
            perticipant2Img: img2,
            perticipant3Img: img3,
            perticipant4Img: img4,
            perticipant2: 'Jhon Smith',
            perticipant3: "Wade Warren",
            perticipant4: "Danne Rusell",
            date : "12/07/24 at 4PM",
        },
        {
            key: "#12333",
            perticipant1: "Holiday Parties",
            perticipant1Img: img,
            perticipant2Img: img2,
            perticipant3Img: img3,
            perticipant4Img: img4,
            perticipant2: 'Jhon Smith',
            perticipant3: "Wade Warren",
            perticipant4: "Danne Rusell",
            date : "12/07/24 at 4PM",

        },
        {
            key: "#12334",
            perticipant1: "Holiday Parties",
            date : "12/07/24 at 4PM",
            perticipant1Img: img,
            perticipant2Img: img2,
            perticipant3Img: img3,
            perticipant4Img: img4,
            perticipant2: 'Jhon Smith',
            perticipant3: "Wade Warren",
            perticipant4: "Danne Rusell",
            date : "12/07/24 at 4PM",
        },

    ];
    const columns = [
        {
            title: "Podcast ID",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Date & Time",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Perticipant-1",
            dataIndex: "perticipant1",
            key: "perticipant1",
            render: (_, record) => (
                <div className='flex  items-center gap-2'>
                    <img src={record?.perticipant1Img} alt="" />
                    <p className='font-medium'>{record?.perticipant1}</p>
                </div>
            )

        },
        {
            title: "Perticipant-2",
            dataIndex: "perticipant2",
            key: "perticipant2",
            render: (_, record) => (
                <div className='flex  items-center gap-2'>
                    <img src={record?.perticipant2Img} alt="" />
                    <p className='font-medium'>{record?.perticipant1}</p>
                </div>
            )
        },

        {
            title: "Perticipant-3",
            dataIndex: "perticipant3",
            key: "perticipant3",
            render: (_, record) => (
                <div className='flex  items-center gap-2'>
                    <img src={record?.perticipant3Img} alt="" />
                    <p className='font-medium'>{record?.perticipant1}</p>
                </div>
            )
        },
        {
            title: "Perticipant-4",
            dataIndex: "perticipant4",
            key: "perticipant4",
            render: (_, record) => (
                <div className='flex  items-center gap-2'>
                    <img src={record?.perticipant4Img} alt="" />
                    <p className='font-medium'>{record?.perticipant4}</p>
                </div>
            )
        },

        {
            title: "Recording",
            dataIndex: "recording",
            key: "recording",
            render: (_, record) => (
                <div className='text-[#FFA175]  inline-block text-center p-1 rounded-md cursor-pointer'>
                   <p>Download</p>
                </div>
            )
        },
    ];
    return (
        <div className='bg-white p-4 rounded-md'>
            <div className="flex justify-between item-center ">
                <div className="flex items-center gap-2">
                    <Link to={-1}><FaArrowLeft size={18} className='text-[var(--primary-color)] ' /></Link>
                    <span className='font-semibold text-[20px]'>Podcast Management</span></div>
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


            <Table dataSource={dataSource} columns={columns} className="custom-pagination" pagination={{
                
            }} />


        </div>
    )
}

export default PodcastManagement