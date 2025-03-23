import { Modal, Table } from 'antd';
import React, { useState } from 'react'
import { LuCalendarClock } from 'react-icons/lu';
import ScheduleModal from '../ScheduleModal/ScheduleModal';
import { place } from '../../redux/api/baseApi';
import { tileLayer } from 'leaflet';

const ProfileUpdateRequest = ({ dataSource }) => {
    const [openScheduleModal, setScheduleModal]  = useState(false)
    const [podCastId , setPodCastId] = useState('')
   
    const columns = [
        {
            title: "Podcast ID",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Perticipant-1",
            dataIndex: "perticipant1",
            key: "perticipant1",
            render : (_,record)=>(
                <div className='flex  items-center gap-2'>
                    {
                       record?.perticipant1Img ?  <img className='h-12 w-12'  src={record?.perticipant1Img} alt="" /> : <img  className='h-12 w-12'  src={place} alt="" />
                    }
                    
                    <p className='font-medium'>{record?.perticipant1}</p>
                </div>
            )
          
        },
        {
            title: "Perticipant-2",
            dataIndex: "perticipant2",
            key: "perticipant2",
            render : (_,record)=>(
                <div className='flex  items-center gap-2'>
                    {
                        record?.perticipant2Img ?  <img className='h-12 w-12' src={record?.perticipant2Img} alt="" /> : <img className='h-12 w-12'  src={place} alt="" />
                    }
                    <img src={record?.perticipant2Img} alt="" />
                    <p className='font-medium'>{record?.perticipant2}</p>
                </div>
            )
        },

        {
            title: "Perticipant-3",
            dataIndex: "perticipant3",
            key: "perticipant3",
            render : (_,record)=>(
                <div className='flex  items-center gap-2'>
                    {
                        record?.perticipant3Img ? <img  className='h-12 w-12' src={record?.perticipant3Img} alt="" /> : <img className='h-12 w-12' src={place} alt="" />
                    }
                    <p className='font-medium'>{record?.perticipant3}</p>
                </div>
            )
        },
        {
            title: "Perticipant-4",
            dataIndex: "perticipant4",
            key: "perticipant4",
            render : (_,record)=>(
                <div className='flex  items-center gap-2'>
                    {
                        record?.perticipant4Img ?  <img className='h-12 w-12' src={record?.perticipant4Img} alt="" /> : <img className='h-12 w-12' src={place} alt="" />
                    }
                    
                    <p className='font-medium'>{record?.perticipant4}</p>
                </div>
            )
        },
        {
            title : 'Schedule Date & Time',
            dataIndex : "datetime",
            key : "datetime",
            render : (_, record)=>(
               
                <p>{record?.scheduleDate || "Not Schedule"}  : {record?.scheduleTime}</p>
            )
        },
       
        {
            title: "Set Schedule",
            dataIndex: "schedule",
            key: "schedule",
            render : (_,record)=>(
                <div onClick={()=> {
                    setScheduleModal(true)
                    setPodCastId(record?.id)

                }} className='bg-[#FFA175] text-white inline-block text-center p-1 rounded-md cursor-pointer'>
                    <LuCalendarClock size={22} />
                </div>
            )
        },
        {
            title : 'Done',
            dataIndex : 'done',
            key : 'done',
            render : ()=>(
                <button className='bg-[#FFA175] text-white px-2 py-1 rounded-md'>Done</button>
            )
        }
    ];
    return (
        <div className=''>
            <Table dataSource={dataSource} columns={columns} className="custom-pagination" pagination={false} />
            <ScheduleModal openScheduleModal={openScheduleModal} setScheduleModal={setScheduleModal} podCastId={podCastId} />
        </div>
    )
}

export default ProfileUpdateRequest