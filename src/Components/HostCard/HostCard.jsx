import React from 'react'
import img from '../../assets/images/admin.png'
const HostCard = () => {
    return (
        <div className='grid grid-cols-4 gap-5 items-center justify-center'>
          {
            Array.from({length : 8}).map(item=>  <div className='bg-[#E8E5DA] hover:bg-[#E6E7F4] transition-all flex flex-col items-center py-8 rounded-md shadow-md'>
                <img src={img} alt="" />
                <p className='text-[#000B90] text-xl py-2'>Sanchez Haro Manuel</p>
                <p><span>Email:</span>sanchez@gmail.com </p>
                <p className='pt-2'><span>Contact:</span> +523264357356</p>
                <p className='pt-2'><span>License:</span> ABC-1234</p>
                <div className='flex items-center gap-5 text-white mt-4'>
                    <button className='bg-[#D7263D] rounded-md shadow-md px-2 py-1'>Cancel</button>
                    <button className='bg-[#000B90] rounded-md shadow-md  px-2 py-1'>Approve</button>
                </div>
            </div>
            )
          }
        </div>
    )
}

export default HostCard