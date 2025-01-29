import React, { useEffect, useRef, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import {  MdOutlineDashboard, MdOutlineWorkspacePremium, MdPodcasts, MdSupport } from 'react-icons/md'
import { NavLink, useLocation } from 'react-router-dom'
import img from '../../assets/images/logo.png'
import { FiAward } from 'react-icons/fi'
import { GrUserAdmin } from 'react-icons/gr'
import { useGetAdminProfileQuery } from '../../redux/api/AuthApi'
const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const contentRefs = useRef([]);
  const { pathname } = useLocation();
  const {data : getProfile} = useGetAdminProfileQuery();
  console.log(getProfile?.data?.access);


  const links = [
    {
      path: '/',
      label: 'Dashboard',
      icon: <MdOutlineDashboard size={25} />,
      sub_menu: false
    },
    {
      path: '/user-management',
      label: 'User Management',
      icon: <FaRegUserCircle size={25} />,
      sub_menu: false
    },
    {
      path: '/podcast-management',
      label: 'Podcast Management',
      icon: <MdPodcasts size={25} />,
      sub_menu: false
    },
    {
      path: '/premium-subscriber',
      label: 'Premium Subscribers',
      icon: <MdOutlineWorkspacePremium  size={25} />,
      sub_menu: false
    },
    {
      path: '/subscriptions',
      label: 'Subscriptions',
      icon: <FiAward size={25} />,
      sub_menu: false
    },
    {
      path: '/administrator',
      label: 'Administrator',
      icon: <GrUserAdmin size={25} />,
      sub_menu: false
    },
    {
      path: '/support',
      label: 'Support',
      icon: <MdSupport  size={25} />,
      sub_menu: false
    },
    
    {
      path: '#',
      label: 'Setting',
      icon: <IoSettingsOutline size={25} />,
      sub_menu: [
        {
          path: '/profile',
          label: 'Profile',
          icon: <></>,
        },
        {
          path: '/faq',
          label: 'FAQ',
          icon: <></>,
        },
        {
          path: '/terms-condition',
          label: 'Terms & Condition',
          icon: <></>,
        },
        {
          path: '/privacy-policy',
          label: 'Privacy Policy',
          icon: <></>,
        },



      ]
    },
  ]

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  useEffect(() => {
    if (openIndex !== null && contentRefs.current[openIndex]) {
      contentRefs.current[openIndex].style.maxHeight = `${contentRefs.current[openIndex].scrollHeight}px`;
    }
    contentRefs.current.forEach((ref, index) => {
      if (ref && index !== openIndex) {
        ref.style.maxHeight = '0px';
      }
    });
  }, [openIndex]);


  return (
    <div id='sidebar' className='flex flex-col gap-5  '>
      <div className='bg-white'>
        <img src={img} className='w-[150px] h-[80px] mx-auto object-contain' alt="" />
      </div>
      {
        links?.map((item, index) => {
          const isActive = item.path === pathname;
          const isSubMenuActive = item.sub_menu && item.sub_menu.some(subItem => subItem.path === pathname);
          if (item?.sub_menu) {
            return (
              <div key={index} >
                {isSubMenuActive ? <div className='absolute left-0  bg-[#FFA175] h-[45px] w-2  ' style={{
                  borderRadius: "0 8px 8px 0",
                }}>
                </div> : ""}
                <div onClick={() => toggleAccordion(index)}
                  className={`cursor-pointer flex justify-start ml-8  mr-3 gap-2 items-center text-[var(--primary-color)] ${isSubMenuActive ? "bg-[#2757A6] text-white " : "bg-white"} py-[12px] px-2  rounded-tr-md    text-[16px] mb-[1px]`}
                >
                  {item?.icon}
                  {item?.label}
                  <IoIosArrowForward />

                </div>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className='accordion-content ml-8 mr-3 overflow-hidden transition-max-height duration-300 ease-in-out cursor-pointer  '
                  style={{
                    maxHeight: openIndex === index ? `${contentRefs.current[index]?.scrollHeight}px` : '0px'
                  }}
                >
                  {
                    item?.sub_menu?.map((sub_item, subIndex) => {
                      const isSubItemActive = sub_item.path === pathname;
                      return (
                        <NavLink
                          to={sub_item?.path}
                          key={subIndex}
                          className={`flex justify-center items-center  ${isSubItemActive ? "bg-[#2757A6] text-white" : "bg-white text-[var(--primary-color)]  "}  px-2  w-full py-2 mb-[1px] cursor-pointer `}
                        >
                          {sub_item?.icon}
                          {sub_item?.label}
                        </NavLink>
                      );
                    })
                  }
                </div>


              </div>
            )
          } else {
            return (
              <div key={index} >
                {
                  isActive ? <div className='absolute left-0   bg-[#2757A6]  h-[48px] w-[6px]  ' style={{
                    borderRadius: "0 8px 8px 0",
                  }}>
                  </div> : ""
                }

                <NavLink
                  className={`cursor-pointer flex justify-start ml-8  mr-3 gap-2 items-center  ${isActive ? "bg-[#2757A6] text-white " : "bg-white text-[var(--primary-color)] "}  py-[12px] px-2  rounded-tr-md rounded-br-md font-medium text-[16px]`}
                  to={item?.path}
                >
                  {item?.icon}
                  {item?.label}
                </NavLink>
              </div>
            )
          }
        })
      }


    </div >
  )
}

export default Sidebar