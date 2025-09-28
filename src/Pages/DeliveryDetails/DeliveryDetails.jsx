import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import GuestHostInfo from "../../Components/GuestHostInfo";
import { useGetAllUserQuery } from "../../redux/api/userManagement";
import { Pagination, Select } from "antd";

const ageOptions = Array.from({ length: 55 - 35 + 1 }, (_, i) => 35 + i);

const options = [
  "Athletic",
  "Curvy",
  "Slim",
  "Average",
  "Plus-size",
  "Muscular",
];

const ethnicityOption = [
  "African American / Black",
  "Asian",
  "Caucasian/White",
  "Hispanic/Latino",
  "Middle Eastern",
  "Native American",
  "Pacific Islander",
  "Other",
  "No preference",
]

const DeliveryDetails = () => {
  const [search, setSearch] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [gender, setGender] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [page, setPage] = useState(1);
  const { data: getAllUser } = useGetAllUserQuery({
    page,
    search,
    minAge,
    maxAge,
    gender,
    bodyType,
    ethnicity
  });

  // console.log(getAllUser);

  const formattedTableData = Array.isArray(getAllUser?.data?.users) && getAllUser?.data?.users?.map((user, i) => {
    return {
      key: i + 1,
      id: user?._id,
      authId: user?.auth?._id,
      name: user?.name,
      img: user?.avatar,
      address: user?.location?.place.split(" ").slice(0, 3).join(" ") || "N/A",
      // dob: user?.,
      contact: user?.phoneNumber,
      email: user?.auth?.email,
      gender: user?.gender || "N/A",
      age: user?.age,
      ethnicity: user?.ethnicity || "N/A",
      bodyType: user?.bodyType || "N/A",
      isBlocked: user?.auth?.isBlocked,
    };
  });

  // console.log(formattedTableData);


  // Handle minimum age function
  const handleMinAge = (value) => {
    setMinAge(value);
  };

  // Handle maximum  age
  const handleMaxAge = (value) => {
    setMaxAge(value);
  };

  // Handle gender function
  const handleGender = (value)=>{
    setGender(value === undefined ? "" : value);
  }
  // Handle Bdoy Type function
  const handleBodyType = (value)=>{
    setBodyType(value === undefined ? "" : value);
  }
  const handleEthnicity = (value)=>{
    setEthnicity(value === undefined ? "" : value);
  }



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
         
          <div>
            {/* <p> Min Age</p> */}
            <Select
              placeholder="Select Gender"
              style={{ width: 140, marginBottom: 20 }}
              allowClear
              onChange={handleGender}
            >
              <Option value={"female"}>Female</Option>
              <Option value={"Male"}>Male</Option>
              <Option value={"non-binary"}>Non-binary</Option>
              <Option value={"transgender"}>Transgender</Option>
              <Option value={"gender-fluid"}>Gender Fluid</Option>
            </Select>
          </div>
          <div>
            {/* <p> Min Age</p> */}
            <Select
              placeholder="Select Body Type"
              style={{ width: 140, marginBottom: 20 }}
              allowClear
              onChange={handleBodyType}
            >
             {options.map((age) => (
                <Option key={age} value={age}>
                  {age}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            {/* <p> Min Age</p> */}
            <Select
              placeholder="Select Ethnicity"
              style={{ width: 140, marginBottom: 20 }}
              allowClear
              onChange={handleEthnicity}
            >
             {ethnicityOption.map((age) => (
                <Option key={age} value={age}>
                  {age}
                </Option>
              ))}
            </Select>
          </div>
          <div className="relative">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-1 rounded-md border border-[#272626] focus:border-[#FFA175] focus:outline-none "
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
