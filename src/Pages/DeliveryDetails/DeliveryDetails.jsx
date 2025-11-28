import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import GuestHostInfo from "../../Components/GuestHostInfo";
import { useGetAllUserQuery } from "../../redux/api/userManagement";
import { Input, Pagination, Select } from "antd";
import { Option } from "antd/es/mentions";

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
  const [gender, setGender] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [page, setPage] = useState(1);
  const { data: getAllUser } = useGetAllUserQuery({
    page,
    search,
    gender,
    bodyType,
    ethnicity
  });

  const formattedTableData = Array.isArray(getAllUser?.data?.users) && getAllUser?.data?.users?.map((user, i) => {
    const pageSize = getAllUser?.data?.pagination?.limit || 10; // Default to 10 if limit is not available
    return {
      key: (page - 1) * pageSize + i + 1,
      id: user?._id,
      authId: user?.auth?._id,
      name: user?.name,
      img: user?.avatar,
      address: user?.location?.place?.split(" ").slice(0, 3).join(" ") || "N/A",
      contact: user?.phoneNumber || "N/A",
      email: user?.auth?.email || "N/A",
      gender: user?.gender || "N/A",
      age: user?.dateOfBirth || "N/A",
      ethnicity: Array.isArray(user?.ethnicity) ? user.ethnicity.join(", ") : "N/A",
      bodyType: user?.bodyType || "N/A",
      isBlocked: user?.auth?.isBlocked || false,
    };
  });

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
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
          </Link>
          <span className="font-semibold text-[18px] sm:text-[20px]">User Management</span>
        </div>
        <div className="w-full lg:w-auto">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            <div className="w-full">
              <Select
                placeholder="Select Gender"
                className="w-full"
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
            <div className="w-full">
              <Select
                placeholder="Select Body Type"
                className="w-full"
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
            <div className="w-full">
              <Select
                placeholder="Select Ethnicity"
                className="w-full"
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
            <div className="relative w-full">
              <Input
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                type="text"
                placeholder="Search here..."
                className="w-full pl-10 pr-4"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <CiSearch className="text-[#FFA175]" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <div className="min-w-full">
          <GuestHostInfo dataSource={formattedTableData} />
        </div>
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
