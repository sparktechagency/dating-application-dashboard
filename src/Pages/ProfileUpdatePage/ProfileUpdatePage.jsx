import React, { useState } from 'react'
import ProfileUpdateRequest from '../../Components/ProfileUpdateRequest/ProfileUpdateRequest';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Input, Pagination } from 'antd';
import img from '../../assets/images/user1.png'
import img2 from '../../assets/images/user2.png'
import img3 from '../../assets/images/user3.png'
import img4 from '../../assets/images/user4.png'

const ProfileUpdatePage = () => {
    const [current, setCurrent] = useState(1);

    const onChange = (page) => {
        setCurrent(page);
    };

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

        },
        {
            key: "#12332",
            perticipant1: "Holiday Parties",
            perticipant1Img: img,
            perticipant2Img: img2,
            perticipant3Img: img3,
            perticipant4Img: img4,
            perticipant2: 'Jhon Smith',
            perticipant3: "Wade Warren",
            perticipant4: "Danne Rusell",

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

        },

    ];

    return (
        <div className='bg-white rounded-md p-5'>
            <div className='flex items-center gap-2 py-2 mb-5'>
                    <Link to={-1}><FaArrowLeft className='text-[var(--primary-color)]' size={20} /></Link>
                    <p className='font-semibold text-xl'>Podcast Schedule Requests</p>
            </div>
            <ProfileUpdateRequest dataSource={dataSource} />
            <div className='mt-2 flex items-center justify-center'>
                <Pagination current={current}
                    onChange={onChange}
                    total={11}
                    pageSize={1}
                    showSizeChanger={false}
                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`} />
            </div>
        </div>
    )
}

export default ProfileUpdatePage