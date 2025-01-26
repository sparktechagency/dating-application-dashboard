import { Pagination, Table } from "antd";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/user1.png";
import img2 from "../../assets/images/user2.png";
import { FaArrowLeft } from "react-icons/fa";
import { useGetPremiumUsersQuery } from "../../redux/api/premiumSubscriber";
import { place } from "../../redux/api/baseApi";

const Transaction = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: getAllPremiumUsers } = useGetPremiumUsersQuery({page,search});
  console.log(getAllPremiumUsers?.data?.users);
  const columns = [
    {
      title: "SL no",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {
            record?.img ? <img className="h-12 w-12" src={record?.img} alt="" /> : <img className="h-12 w-12" src={place} />
          }
          
          <p>{record?.name}</p>
        </div>
      ),
    },
    {
      title: "Joining Date",
      dataIndex: "joining",
      key: "joining",
    },
    {
      title: "Subscription Plan",
      dataIndex: "subscription",
      key: "subscription",
    },

    {
      title: "Subscription Fee",
      dataIndex: "fee",
      key: "fee",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <div
          className={`rounded-full text-[#00A991] w-[60%] text-center  py-1 ${
            record?.status === "DUE"
              ? "border border-[#F3A211] rounded-full text-[#F3A211]"
              : "border border-[#00A991] "
          }`}
        >
          {record?.status}
        </div>
      ),
    },
  ];

  const formattedData = getAllPremiumUsers?.data?.users?.map((item , i) => {
    return {
      key: i + 1,
      joining: item?.subscription?.startedAt?.split("T")[0],
      img: item?.avatar,
      name: item?.name,
      hired: item?.subscription?.plan,
      fee: item?.subscription?.fee,
      subscription: item?.subscription?.plan,
      status:  item?.subscription?.status,
      
    };
  });



  return (
    <div className="p-5 bg-white rounded-md">
      <div className="flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
          </Link>
          <span className="font-semibold text-[20px]">Premium Subscribers</span>
        </div>
        <div>
          <div className="relative">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-1 rounded-md border border-[#FFA175] focus:border-[#FFA175] focus:outline-none "
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <CiSearch className="text-[#FFA175]" />
            </span>
          </div>
        </div>
      </div>

      <div></div>
      <div className="mt-5">
        <Table
          dataSource={formattedData}
          columns={columns}
          className="custom-pagination"
          pagination={false}
        />
      </div>
      <div className="flex justify-center mt-5">
          <Pagination
            page={getAllPremiumUsers?.data?.pagination?.page}
            total={getAllPremiumUsers?.data?.pagination?.totalUsers}
            pageSize={getAllPremiumUsers?.data?.pagination?.limit}
            onChange={(page) => setPage(page)}
          />
        </div>
    </div>
  );
};

export default Transaction;
