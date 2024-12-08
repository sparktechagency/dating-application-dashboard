import React, { useState } from 'react'
import Tab from '../../Components/Tab/Tab'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import HostCard from '../../Components/HostCard/HostCard';
import GuestHostInfo from '../../Components/GuestHostInfo';
import img1 from '../../assets/images/user1.png'
import img2 from '../../assets/images/user2.png'

const BarTender = () => {
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
    <div className='bg-white rounded-md p-4'>
        
      <div className="flex justify-between item-center pb-8">
        <div className="flex items-center gap-2">
          <Link to={-1}><FaArrowLeft size={18} className='text-[var(--primary-color)] ' /></Link>
          <span className=' text-[20px]'>Bartender Information</span></div>
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
        <Tab req={'Bartender Request'} info={'All Bartender Info'} setTab={setTab} tab={tab} />
        <div className='mt-10'>
            {
                tab ? <div>
                <p className='text-2xl mb-5'>Show All Bartender Request</p>
                <HostCard/>
            </div> : <div>
                <p className='text-2xl mb-5'>All Bartender Information</p>
                <GuestHostInfo dataSource={dataSource}/>
            </div>
            }
        </div>
    </div>
  )
}

export default BarTender