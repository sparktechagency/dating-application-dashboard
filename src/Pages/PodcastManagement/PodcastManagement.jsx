import { Checkbox, Modal, Pagination, Table } from "antd";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGetAllDonePodCastQuery,
  useSelectPodCastPartnerMutation,
} from "../../redux/api/podcastManagementApi";
import { place } from "../../redux/api/baseApi";
import { toast } from "sonner";
const PodcastManagement = () => {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [chooseUser, setChooseUser] = useState();
  const [selectedParticipantId, setSelectedParticipantId] = useState(null);
  const [podCastId, setPodCastId] = useState("");

  const handleCheckboxChange = (participantId) => {
    setSelectedParticipantId(participantId);
  };

  const { data: getAllDonePodcast } = useGetAllDonePodCastQuery(page);
  const [selectedPartner] = useSelectPodCastPartnerMutation();

  const formattedData = getAllDonePodcast?.data?.podcasts?.map((pod, i) => {
    console.log(pod);
    return {
      key: i + 1,
      id: pod?._id,
      perticipant2: pod?.participant1?.name,
      participant2Id: pod?.participant1?._id,
      participant3Id: pod?.participant2?._id,
      participant4Id: pod?.participant3?._id,
      perticipant1: pod?.primaryUser?.name,
      perticipant1Img: pod?.primaryUser?.avatar,
      perticipant2Img: pod?.participant1?.avatar,
      perticipant3Img: pod?.participant2?.avatar,
      perticipant4Img: pod?.participant3?.avatar,
      perticipant3: pod?.participant2?.name,
      perticipant4: pod?.participant3?.name,
      date: pod?.schedule?.date?.split("T")[0] || "NO Date",
      record: pod?.recordingUrl,
    };
  });

  const participants = [
    {
      id: chooseUser?.participant2Id,
      name: chooseUser?.perticipant2,
      img: chooseUser?.perticipant2Img,
    },
    {
      id: chooseUser?.participant3Id,
      name: chooseUser?.perticipant3,
      img: chooseUser?.perticipant3Img,
    },
    {
      id: chooseUser?.participant4Id,
      name: chooseUser?.perticipant4,
      img: chooseUser?.perticipant4Img,
    },
  ];

  const handleSelectedParticipant = () => {
    const data = {
      podcastId: podCastId,
      selectedUserId: selectedParticipantId,
    };
    selectedPartner(data)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenModal(false);
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  const columns = [
    {
      title: "Podcast ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Perticipant-1",
      dataIndex: "perticipant1",
      key: "perticipant1",
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {record?.perticipant1Img ? (
            <img className="h-10 w-10" src={record?.perticipant1Img} alt="" />
          ) : (
            <img className="h-10 w-10" src={place} alt="" />
          )}

          <p className="font-medium">{record?.perticipant1}</p>
        </div>
      ),
    },
    {
      title: "Perticipant-2",
      dataIndex: "perticipant2",
      key: "perticipant2",
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {record?.perticipant2Img ? (
            <img className="h-10 w-10" src={record?.perticipant2Img} alt="" />
          ) : (
            <img src={place} className="h-10 w-10" alt="" />
          )}
          <p className="font-medium">{record?.perticipant2}</p>
        </div>
      ),
    },

    {
      title: "Perticipant-3",
      dataIndex: "perticipant3",
      key: "perticipant3",
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {record?.perticipant3Img ? (
            <img src={record?.perticipant3Img} className="h-10 w-10" alt="" />
          ) : (
            <img src={place} className="h-10 w-10" alt="" />
          )}

          <p className="font-medium">{record?.perticipant2}</p>
        </div>
      ),
    },
    {
      title: "Perticipant-4",
      dataIndex: "perticipant4",
      key: "perticipant4",
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {record?.perticipant4Img ? (
            <img className="h-10 w-10" src={record?.perticipant4Img} alt="" />
          ) : (
            <img className="h-10 w-10" src={place} alt="" />
          )}

          <p className="font-medium">{record?.perticipant4}</p>
        </div>
      ),
    },
    {
      title: "Select for Date",
      dataIndex: "selectDate",
      key: "selectDate",
      render: (_, record) => (
        <div
          onClick={() => {
            setOpenModal(true);
            setChooseUser(record);
            setPodCastId(record?.id);
          }}
          className="text-[#FFA175]  inline-block text-center p-1 rounded-md cursor-pointer"
        >
          <p>Choose</p>
        </div>
      ),
    },
    {
      title: "Recording",
      dataIndex: "recording",
      key: "recording",
      render: (_, record) => (
        <div className="text-[#FFA175]  inline-block text-center p-1 rounded-md cursor-pointer">
          <a href={record?.record} target="_blank" rel="noopener noreferrer" >
            <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
              Download
            </button>
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
          </Link>
          <span className="font-semibold text-[20px]">Podcast Management</span>
        </div>
        {/* <div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-1 rounded-md border border-[#FFA175] focus:border-[#FFA175] focus:outline-none "
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <CiSearch className="text-[#FFA175]" />
            </span>
          </div>
        </div> */}
      </div>

      <Table
        dataSource={formattedData}
        columns={columns}
        className="custom-pagination"
        pagination={false}
      />
      <div className="flex justify-center mt-5">
        <Pagination
          page={getAllDonePodcast?.data?.pagination?.page}
          total={getAllDonePodcast?.data?.pagination?.totalPodcasts}
          pageSize={getAllDonePodcast?.data?.pagination?.limit}
          onChange={(page) => setPage(page)}
        />
      </div>
      <Modal
        open={openModal}
        centered
        footer={false}
        onCancel={() => setOpenModal(false)}
      >
        <p className="text-xl font-medium text-center mb-10">Choose for Date</p>

        <div>
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="flex px-24 items-center gap-4 mb-4"
            >
              <Checkbox
                checked={selectedParticipantId === participant.id}
                onChange={() => handleCheckboxChange(participant.id)}
              />
              {participant.img ? (
                <img
                  src={participant.img}
                  alt={participant.name}
                  className="h-10 w-10"
                />
              ) : (
                <img src={place} alt="default" className="h-10 w-10" />
              )}
              <p>{participant.name}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => handleSelectedParticipant()}
          className="bg-[#FFA175] flex w-full justify-center items-center text-white py-2 rounded-sm"
        >
          Choose
        </button>
      </Modal>
    </div>
  );
};

export default PodcastManagement;
