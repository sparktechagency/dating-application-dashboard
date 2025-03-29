import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import GuestHostInfo from "../../Components/GuestHostInfo";
import { useGetAllUserQuery } from "../../redux/api/userManagement";
import { Pagination, Select } from "antd";

const ageOptions = Array.from({ length: 55 - 35 + 1 }, (_, i) => 35 + i);

const DeliveryDetails = () => {
  const [search, setSearch] = useState("");
  const [minAge, setMinAge] = useState("");
  const [page, setPage] = useState(1);
  const { data: getAllUser } = useGetAllUserQuery({ page, search , minAge });
  console.log(getAllUser?.data?.pagination);
  const formattedTableData = getAllUser?.data?.users?.map((user, i) => {
    return {
      key: i + 1,
      id: user?._id,
      authId: user?.auth?._id,
      name: user?.name,
      img: user?.avatar,
      address: user?.address || "N/A",
      // dob: user?.,
      contact: user?.phoneNumber,
      email: user?.auth?.email,
      gender: user?.gender || "N/A",
      age: user?.age,
      isBlocked: user?.auth?.isBlocked,
    };
  });

  const handleMinAge = (value) => {
    setMinAge(value);
  };

  return (
    <div className="p-5 bg-white rounded-md">
      <div className="flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
          </Link>
          <span className="font-semibold text-[20px]">User Management</span>
        </div>
        <div className="flex  gap-2 ">
          <Select
            placeholder="Select Age"
            style={{ width: 150, marginBottom: 20 }}
            allowClear
            onChange={handleMinAge}
          >
            {ageOptions.map((age) => (
              <Option key={age} value={age}>
                {age}
              </Option>
            ))}
          </Select>
          <div className="relative">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-1 rounded-md border border-[#FFA175] focus:border-[#FFA175] focus:outline-none "
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <CiSearch className="text-[#FFA175]" />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <GuestHostInfo dataSource={formattedTableData} />
        <div className="flex justify-center mt-5">
          <Pagination
            current={page}
            total={getAllUser?.data?.pagination?.total}
            pageSize={getAllUser?.data?.pagination?.limit}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
