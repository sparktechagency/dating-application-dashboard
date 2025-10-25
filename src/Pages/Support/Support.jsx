import { Form, Modal, Pagination, Table } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { LuReply } from "react-icons/lu";
import { Link } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {
  useGetAllSupportMessageQuery,
  useSupportMessageMutation,
} from "../../redux/api/supportApi";
import { imageUrl, place } from "../../redux/api/baseApi";
import { toast } from "sonner";

const Support = () => {
  const [replyId, setReplyId] = useState("");
  const [page, setPage] = useState(1);
  const [singleData, setSingleData] = useState();
  const [search, setSearch] = useState("");

  const { data: getAllMessage } = useGetAllSupportMessageQuery({
    page,
    name: search,
  });
  const [replyMessage] = useSupportMessageMutation();

  const [openReplyModal, setOpenReplyModal] = useState(false);
  const [detailsModal, setOpenDetailsModal] = useState(false);

  const columns = [
    {
      title: "ID No",
      dataIndex: "idNo",
      key: "idNo",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="flex gap-2 items-center">
            {!!record?.img ? (
              <img className="w-12 h-12 rounded-lg" src={`${imageUrl}${record?.img}`} alt="" />
            ) : (
              <img className="w-12 h-12" src={place} />
            )}
            <p>{record?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, record) => <p>{record?.description?.slice(0, 25)}...</p>,
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              setOpenDetailsModal(true);
              setSingleData(record);
            }}
            className="bg-[#2757A6] p-2 rounded-md text-white"
          >
            <IoEyeOutline size={22} />
          </button>
        </div>
      ),
    },
    {
      title: "Reply",
      dataIndex: "reply",
      key: "reply",
      render: (_, record) => {
        return (
          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                setReplyId(record?.id);
                setOpenReplyModal(true);
              }}
              className={`bg-[#FFA175] p-2 rounded-md text-white ${record?.reply && "bg-slate-400 cursor-not-allowed" } `}
              disabled={record?.reply}
            >
              <LuReply size={22} />
            </button>
          </div>
        );
      },
    },
  ];

  const formattedTableData = getAllMessage?.data?.supports?.map(
    (support, i) => {
      return {
        id: support?._id,
        key: i + 1,
        idNo: support?.user,
        date: support?.date?.split("T")[0],
        name: support?.userName,
        img: support?.userAvatar,
        description: support?.description,
        reply : support?.reply
      };
    }
  );

  const handleMessageReply = (values) => {
    replyMessage({ id: replyId, data: values })
      .unwrap()
      .then(() => {
        toast.success("Message Send Successfully!")
        setOpenReplyModal(false)

      })
      .catch((error) => toast.error(error?.data?.message));
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 items-center">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
          </Link>
          <span className="font-semibold text-[20px]">Support</span>
        </div>
        <div className="sm:w-[280px]">
          <div className="relative">
            <input
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-1 rounded-md border border-[#FFA175] focus:border-[#FFA175] focus:outline-none "
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <CiSearch className="text-[#FFA175]" />
            </span>
          </div>
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={formattedTableData}
          pagination={false}
          className="custom-pagination"
          scroll={{ x: 900 }}
          size="small"
        />
        <div className="flex justify-center mt-5">
          <Pagination
            page={getAllMessage?.data?.pagination?.page}
            total={getAllMessage?.data?.pagination?.total}
            pageSize={getAllMessage?.data?.pagination?.limit}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>

      <div>
        <Modal
          centered
          footer={false}
          open={openReplyModal}
          onCancel={() => setOpenReplyModal(false)}
        >
          <p className="text-xl font-semibold text-center">Reply</p>
          <Form layout="vertical" onFinish={handleMessageReply}>
            <Form.Item name={"reply"} label="Reply">
              <TextArea rows={5} />
            </Form.Item>
            <button className="bg-[#FFA175] text-white w-full rounded-md py-2">
              Reply
            </button>
          </Form>
        </Modal>
      </div>
      <div>
        <Modal
          centered
          footer={false}
          open={detailsModal}
          onCancel={() => setOpenDetailsModal(false)}
        >
          <p className="text-xl font-semibold text-center">Details</p>
          <div>
            <p className="flex justify-between items-center">
              <span className="font-semibold">ID No: </span>{" "}
              <span>{singleData?.key}</span>{" "}
            </p>
            <p className="flex justify-between items-center">
              <span className="font-semibold">Date: </span>{" "}
              <span>{singleData?.date}</span>{" "}
            </p>
            <p className="flex justify-between items-center">
              <span className="font-semibold">User Name: </span>{" "}
              <span>{singleData?.name}</span>{" "}
            </p>
            <p className="my-2">
              <span className="font-semibold">Description oht the issue: </span>{" "}
            </p>
            <p className="">
              <span>{singleData?.description}</span>{" "}
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Support;
