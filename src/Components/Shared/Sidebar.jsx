import { useEffect, useRef, useState } from "react";
import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboard, MdOutlineWorkspacePremium, MdPodcasts, MdSupport, MdVideoCall } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/logo.png";
import { FiAward } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";
import { useGetAdminProfileQuery } from "../../redux/api/AuthApi";
import { CiLogout } from "react-icons/ci";
// import { FaRegHeart } from "react-icons/fa";
const Sidebar = ({ onNavigate = () => { } }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate()
  const contentRefs = useRef([]);
  const { pathname } = useLocation();
  const { data: getProfile } = useGetAdminProfileQuery();

  const links = [];
  if (
    getProfile?.data?.access === "ALL" ||
    getProfile?.data?.access === "DASHBOARD"
  ) {
    links.push({
      path: "/",
      label: "Dashboard",
      icon: <MdOutlineDashboard size={25} />,
      sub_menu: false,
    });
  }
  if (
    getProfile?.data?.access === "ALL" ||
    getProfile?.data?.access === "USER_MANAGEMENT"
  ) {
    links.push({
      path: "/user-management",
      label: "User Management",
      icon: <FaRegUserCircle size={25} />,
      sub_menu: false,
    });
  }

  if (
    getProfile?.data?.access === "ALL" ||
    getProfile?.data?.access === "SCHEDULE_REQUEST"
  ) {
    links.push({
      path: "/schedule-request",
      label: "Schedule Request",
      icon: <CiCalendar size={25} />,
      sub_menu: false,
    });
  }

  if (
    getProfile?.data?.access === "ALL" ||
    getProfile?.data?.access === "PODCAST_MANAGEMENT"
  ) {
    links.push({
      path: "/podcast-management",
      label: "Podcast Management",
      icon: <MdPodcasts size={25} />,
      sub_menu: false,
    });
  }

  if (
    getProfile?.data?.access === "ALL" ||
    getProfile?.data?.access === "PODCAST_MANAGEMENT"
  ) {
    links.push({
      path: "/matches",
      label: "Matches",
      icon: <FaRegHeart size={25} />,
      sub_menu: false,
    });
  }

  if (
    getProfile?.data?.access === "ALL" ||
    getProfile?.data?.access === "VIDEO_MANAGEMENT"
  ) {
    links.push({
      path: "/video-management",
      label: "Video Management",
      icon: <MdVideoCall size={25} />,
      sub_menu: false,
    });
  }
  if (
    getProfile?.data?.access === "ALL" ||
    getProfile?.data?.access === "SUBSCRIPTIONS"
  ) {
    links.push({
      path: "/premium-subscriber",
      label: "Premium Subscribers",
      icon: <MdOutlineWorkspacePremium size={25} />,
      sub_menu: false,
    });
  }
  if (
    getProfile?.data?.access === "ALL" ||
    getProfile?.data?.access === "SUBSCRIPTIONS"
  ) {
    links.push({
      path: "/subscriptions",
      label: "Subscriptions",
      icon: <FiAward size={25} />,
      sub_menu: false,
    });
  }
  if (
    getProfile?.data?.access === "ALL" ||
    getProfile?.data?.access === "ADMINISTRATOR"
  ) {
    links.push({
      path: "/administrator",
      label: "Administrator",
      icon: <GrUserAdmin size={25} />,
      sub_menu: false,
    });
  }
  if (
    getProfile?.data?.access === "ALL" ||
    getProfile?.data?.access === "SUPPORT"
  ) {
    links.push({
      path: "/support",
      label: "Support",
      icon: <MdSupport size={25} />,
      sub_menu: false,
    });
  }


  if (
    getProfile?.data?.access === "ALL" ||
    getProfile?.data?.access === "SETTINGS"
  ) {
    links.push({
      path: "#",
      label: "Setting",
      icon: <IoSettingsOutline size={25} />,
      sub_menu: [
        {
          path: "/profile",
          label: "Profile",
          icon: <></>,
        },
        {
          path: "/faq",
          label: "FAQ",
          icon: <></>,
        },
        {
          path: "/terms-condition",
          label: "Terms & Condition",
          icon: <></>,
        },
        {
          path: "/privacy-policy",
          label: "Privacy Policy",
          icon: <></>,
        },
        {
          path: "/media-policy",
          label: "Media Policy",
          icon: <></>,
        },
        {
          path: "/sms-policy",
          label: "SMS Policy",
          icon: <></>,
        },
      ]
    });
  }

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (openIndex !== null && contentRefs.current[openIndex]) {
      contentRefs.current[
        openIndex
      ].style.maxHeight = `${contentRefs.current[openIndex].scrollHeight}px`;
    }
    contentRefs.current.forEach((ref, index) => {
      if (ref && index !== openIndex) {
        ref.style.maxHeight = "0px";
      }
    });
  }, [openIndex]);
  const handleLogOut = () => {
    if (typeof onNavigate === 'function') onNavigate();
    localStorage.removeItem("token");
    navigate("/auth/login");
    window.location.reload();
  };

  return (
    <div id="sidebar" className="pb-4">
      <div className="sticky top-0 mb-5 bg-white">
        <img
          src={img}
          className="w-[150px] h-[80px] mx-auto object-contain"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-2">
        {links?.map((item, index) => {
          const isActive = item.path === pathname;
          const isSubMenuActive =
            item.sub_menu &&
            item.sub_menu.some((subItem) => subItem.path === pathname);
          if (item?.sub_menu) {
            return (
              <div key={index}>
                {isSubMenuActive ? (
                  <div
                    className="absolute left-0  bg-[#FFA175] h-[45px] w-2  "
                    style={{
                      borderRadius: "0 8px 8px 0",
                    }}
                  ></div>
                ) : (
                  ""
                )}
                <div
                  onClick={() => toggleAccordion(index)}
                  className={`cursor-pointer flex justify-start ml-8  mr-3 gap-2 items-center text-[var(--primary-color)] ${isSubMenuActive ? "bg-[#2757A6] text-white " : "bg-white"
                    } py-[12px] px-2  rounded-tr-md    text-[16px] mb-[1px]`}
                >
                  {item?.icon}
                  {item?.label}
                  <IoIosArrowForward />
                </div>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="ml-8 mr-3 overflow-hidden duration-300 ease-in-out cursor-pointer accordion-content transition-max-height"
                  style={{ maxHeight: openIndex === index ? undefined : '0px' }}
                >
                  {item?.sub_menu?.map((sub_item, subIndex) => {
                    const isSubItemActive = sub_item.path === pathname;
                    return (
                      <NavLink
                        to={sub_item?.path}
                        key={subIndex}
                        className={`flex justify-center items-center ${isSubItemActive
                          ? "bg-[#2757A6] text-white"
                          : "bg-white text-[var(--primary-color)]  "
                          }  px-2  w-full py-2 mb-[1px] cursor-pointer `}
                        onClick={onNavigate}
                      >
                        {sub_item?.icon}
                        {sub_item?.label}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          } else {
            return (
              <div key={index}>
                {isActive ? (
                  <div
                    className="absolute left-0 bg-[#2757A6] h-[48px] w-[6px]  "
                    style={{
                      borderRadius: "0 8px 8px 0",
                    }}
                  ></div>
                ) : (
                  ""
                )}

                <NavLink
                  className={`cursor-pointer flex justify-start ml-8 mr-3 gap-2 items-center ${isActive
                    ? "bg-[#2757A6] text-white "
                    : "bg-white text-[var(--primary-color)] "
                    }  py-[12px] px-2  rounded-tr-md rounded-br-md font-medium text-[16px]`}
                  to={item?.path}
                  onClick={onNavigate}
                >
                  {item?.icon}
                  {item?.label}
                </NavLink>
              </div>
            );
          }
        })}
      </div>

      <div
        onClick={handleLogOut}
        className="flex text-[4E4E4E] rounded-tr-md items-center bg-white gap-3 ml-8 mr-3 cursor-pointer px-6 hover:bg-white-500 py-3 mt-32 transition-all"
      >
        <CiLogout size={24} color="text-[4E4E4E]" />
        Log Out
      </div>
    </div>
  );
};

export default Sidebar;
