import React, { useState } from 'react'
import HostCard from '../../Components/HostCard/HostCard'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { CiSearch } from 'react-icons/ci'
import GuestHostInfo from '../../Components/GuestHostInfo'
import img1 from '../../assets/images/user1.png'
import img2 from '../../assets/images/user2.png'
const HostManagement = () => {
    const [tab, setTab] = useState(true)

    const dataSource = [
        {
          key: "#12333",
          name: "Kathryn Murphy",
          img: img1,
          address : 'Banasree, Dhaka',
          dob: "1/04/22",
          contact: "+8802154852",
          email: "shukumar542@gmail.com",
          license: "6427461554554",
    
        },
        {
          key: "#12333",
          name: "Kathryn Murphy",
          img: img2,
          address : 'Banasree, Dhaka',
          dob: "1/04/22",
          contact: "+8802154852",
          email: "shukumar542@gmail.com",
          license: "6427461554554",
    
        },
        {
          key: "#12333",
          name: "Kathryn Murphy",
          img: img1,
          address : 'Banasree, Dhaka',
          dob: "1/04/22",
          contact: "+8802154852",
          email: "shukumar542@gmail.com",
          license: "6427461554554",
    
        },
        {
          key: "#12333",
          name: "Kathryn Murphy",
          img: img2,
          address : 'Banasree, Dhaka',
          dob: "1/04/22",
          contact: "+8802154852",
          email: "shukumar542@gmail.com",
          license: "6427461554554",
    
        },
       
      ];
    return (
        <div className='bg-white p-4 rounded-md'>

            <div className="flex justify-between item-center mb-5 ">
                <div className="flex items-center gap-2">
                    <Link to={-1}><FaArrowLeft size={18} className='text-[var(--primary-color)] ' /></Link>
                    <span className='font-semibold text-[20px]'>Host</span></div>
                <div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-full pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 "
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">

                            <CiSearch />
                        </span>
                    </div>
                </div>
            </div>


            <div className='flex items-center gap-5 text-xl'>
                <button className={` border border-[#EFC11F]  shadow-md  hover:shadow-xl rounded-full px-4 py-1 ${tab ? "bg-[#EFC11F]" : "text-[#EFC11F]"}`} onClick={() => setTab(true)}>Host Request</button>
                <button className={` border border-[#EFC11F]  shadow-md  hover:shadow-xl rounded-full px-4 py-1 ${!tab ? "bg-[#EFC11F]" : "text-[#EFC11F]"}`} onClick={() => setTab(false)}>All Host Info</button>
            </div>

            <div>
                <p className='text-2xl my-8 font-semibold'>Show All Host Request</p>

                <div>
                    {
                        tab ? <HostCard /> : <GuestHostInfo dataSource={dataSource}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default HostManagement