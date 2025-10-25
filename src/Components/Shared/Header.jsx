import { Link, useNavigate } from 'react-router-dom'
import { Badge } from 'antd';
import { IoIosNotificationsOutline } from "react-icons/io";
import { useGetAdminProfileQuery } from '../../redux/api/AuthApi';
import { imageUrl } from '../../redux/api/baseApi';
import { FaRegUserCircle } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
const Header = ({ onMenuClick }) => {
  const {data : getUser, isLoading} = useGetAdminProfileQuery()
    const navigate = useNavigate()
  return (
    <div className='w-full sticky top-0 z-50 py-[18.5px] bg-[var(--primary-color)] flex justify-between items-center gap-4 px-4'>
    <button
      type='button'
      onClick={onMenuClick}
      className='md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md bg-white/10 hover:bg-white/20 transition-colors'
      aria-label='Open sidebar'
    >
      <RxHamburgerMenu size={22} color="#ffffff" />
    </button>
    {/* <div>
        <Link to="/notification" style={{ boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.24)" }} className=' bg-[#F2F2F2] h-10 flex items-center w-10 rounded-full p-2'>
            <Badge>
                <IoIosNotificationsOutline className='text-[var(--primary-color)]' size={25} />
            </Badge>
        </Link>
    </div> */}
    <div onClick={() => navigate('/profile')} className='flex justify-end items-center gap-1 border-gray-400 p-[2px] px-4 rounded-md cursor-pointer ml-auto'>
       
       {
        getUser?.data?.avatar ?
         <img className='h-10 w-10 rounded-full' src={`${imageUrl}/${getUser?.data?.avatar}`} alt="" /> : <FaRegUserCircle size={25} color='#ffff' />
       } 
        <p className='font-medium text-white'>{getUser?.data?.name}</p>
    </div>
</div>
  )
}

export default Header