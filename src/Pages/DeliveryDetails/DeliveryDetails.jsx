import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import img1 from '../../assets/images/user1.png'
import img2 from '../../assets/images/user2.png'
import GuestHostInfo from '../../Components/GuestHostInfo'

const DeliveryDetails = () => {

  


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
    <div className='p-5 bg-white rounded-md'>

      <div className="flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}><FaArrowLeft size={18} className='text-[var(--primary-color)] ' /></Link>
          <span className='font-semibold text-[20px]'>Guest Management</span></div>
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


      <div className='mt-5'>
        <GuestHostInfo dataSource={dataSource} />
      </div>


    </div>
  )
}

export default DeliveryDetails