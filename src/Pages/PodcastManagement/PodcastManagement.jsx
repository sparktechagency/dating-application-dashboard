import { Checkbox, Modal, Pagination, Table } from "antd";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGetAllDonePodCastQuery,
  useSelectPodCastPartnerMutation
} from "../../redux/api/podcastManagementApi";
import { imageUrl, place } from "../../redux/api/baseApi";

import { toast } from "sonner";
const PodcastManagement = () => {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [chooseUser, setChooseUser] = useState();
  const [selectedParticipantId, setSelectedParticipantId] = useState([]); 
  const [podCastId, setPodCastId] = useState("");

  const handleCheckboxChange = (participantId) => {
    setSelectedParticipantId((prevSelected) =>
      prevSelected.includes(participantId)
        ? prevSelected.filter((id) => id !== participantId)
        : [...prevSelected, participantId]
    );
  };


  const { data: getAllDonePodcast } = useGetAllDonePodCastQuery(page);
  const [selectedPartner] = useSelectPodCastPartnerMutation();

  

  // console.log(getAllDonePodcast);

  const formattedData = Array.isArray(getAllDonePodcast?.data?.podcasts) && getAllDonePodcast?.data?.podcasts?.map((pod, i) => {
    return {
      key: i + 1,
      id: pod?._id,
      primaryParticipantId: pod?.primaryUser?._id,
      primaryParticipantName: pod?.primaryUser?.name || "N/A",
      primaryParticipantImg: pod?.primaryUser?.avatar,
      perticipant1: pod?.participants[0]?.user?.name || "N/A",
      perticipant1Id: pod?.participants[0]?.user?._id,
      perticipant1Img: pod?.participants[0]?.user?.avatar,
      perticipant1IsAllowed: pod?.participants[0]?.isAllow,
      perticipant2: pod?.participants[1]?.user?.name || "N/A",
      participant2Id: pod?.participants[1]?.user?._id,
      perticipant2Img: pod?.participants[1]?.user?.avatar,
      perticipant2IsAllowed: pod?.participants[1]?.isAllow,
      participant3Id: pod?.participants[2]?.user?._id,
      perticipant3: pod?.participants[2]?.user?.name || "N/A",
      perticipant3Img: pod?.participants[2]?.user?.avatar,
      perticipant3IsAllowed: pod?.participants[2]?.isAllow,
      participant4Id: pod?.participants[3]?.user?._id,
      perticipant4Img: pod?.participants[3]?.user?.avatar,
      perticipant4: pod?.participants[3]?.user?.name || "N/A",
      perticipant4IsAllowed: pod?.participants[3]?.isAllow,
      date: pod?.schedule?.date?.split("T")[0] || "NO Date",
      record: pod?.recordingUrl || "N/A",
    };
  });



  const participants = [
    {
      id: chooseUser?.perticipant1Id,
      name: chooseUser?.perticipant1,
      img: chooseUser?.perticipant1Img,
    },
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


  // console.log(participants);
  const handleSelectedParticipant = () => {
    const data = {
      podcastId: podCastId,
      selectedUserId: selectedParticipantId.map(id => ({ user: id }))
    };

    // console.log("this is podcudt and selected user id",data);
    selectedPartner(data)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenModal(false);
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  const handleDownload = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      const response = await fetch(`${imageUrl}/podcast/record-get-podcast/${id}`, { headers });
      const result = await response.json();
      if (result?.success && result?.data?.findPodcastId && result.data.findPodcastId.length > 0 && result.data.findPodcastId[0]?.recordingUrl) {
        const downloadUrl = `${imageUrl}${result.data.findPodcastId[0].recordingUrl}`;
        window.open(downloadUrl, '_blank');
      } else {
        toast.error("No recording found.");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to fetch recording URL.");
    }
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
      title: "Primary Participant",
      dataIndex: "primaryParticipant",
      key: "primaryParticipant",
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {!!record?.primaryParticipantImg ? (
            <img className="h-10 w-10 rounded-lg" src={`${imageUrl}${record?.primaryParticipantImg}`} alt="" />
          ) : (
            <img className="h-10 w-10" src={place} alt="" />
          )}

          <p className="font-medium">{record?.primaryParticipantName}</p>
        </div>
      ),
    },
    {
      title: "Participant-1",
      dataIndex: "perticipant1",
      key: "perticipant1",
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {!!record?.perticipant1Img ? (
            <img className="h-10 w-10 rounded-lg" src={`${imageUrl}${record?.perticipant1Img}`} alt="" />
          ) : (
            <img className="h-10 w-10" src={place} alt="" />
          )}

          <p className="font-medium">{record?.perticipant1}</p>
          {record?.perticipant1IsAllowed && <FaCheckCircle className="text-green-500 ml-1" />}
        </div>
      ),
    },
    {
      title: "Participant-2",
      dataIndex: "perticipant2",
      key: "perticipant2",
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {!!record?.perticipant2Img ? (
            <img className="h-10 w-10 rounded-lg" src={`${imageUrl}${record?.perticipant2Img}`} alt="" />
          ) : (
            <img src={place} className="h-10 w-10" alt="" />
          )}
          <p className="font-medium">{record?.perticipant2}</p>
          {record?.perticipant2IsAllowed && <FaCheckCircle className="text-green-500 ml-1" />}
        </div>
      ),
    },

    {
      title: "Participant-3",
      dataIndex: "perticipant3",
      key: "perticipant3",
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {!!record?.perticipant3Img ? (
            <img src={`${imageUrl}${record?.perticipant3Img}`} className="h-10 w-10 rounded-lg" alt="" />
          ) : (
            <img src={place} className="h-10 w-10" alt="" />
          )}

          <p className="font-medium">{record?.perticipant3}</p>
          {record?.perticipant3IsAllowed && <FaCheckCircle className="text-green-500 ml-1" />}
        </div>
      ),
    },
    {
      title: "Participant-4",
      dataIndex: "perticipant4",
      key: "perticipant4",
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {!!record?.perticipant4Img ? (
            <img className="h-10 w-10 rounded-lg" src={`${imageUrl}${record?.perticipant4Img}`} alt="" />
          ) : (
            <img className="h-10 w-10" src={place} alt="" />
          )}

          <p className="font-medium">{record?.perticipant4}</p>
          {record?.perticipant4IsAllowed && <FaCheckCircle className="text-green-500 ml-1" />}
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
          <button
            onClick={() => handleDownload(record?.id)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Download
          </button>
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
          current={getAllDonePodcast?.data?.pagination?.page}
          total={getAllDonePodcast?.data?.pagination?.total}
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
          {participants.filter((participant) => participant.id !== undefined)?.map((participant) => (
            <div
              key={participant?.id}
              className="flex px-24 items-center gap-4 mb-4"
            >
              <Checkbox
                checked={selectedParticipantId.includes(participant?.id)}
                onChange={() => handleCheckboxChange(participant?.id)}
              />
              {!!participant?.img ? (
                <img
                  src={`${imageUrl}${participant?.img}`}
                  alt={participant?.name}
                  className="h-10 w-10 rounded-lg"
                />
              ) : (
                <img src={place} alt="default" className="h-10 w-10" />
              )}
              <p>{participant?.name}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => handleSelectedParticipant()}
          className="bg-[#FFA175] flex w-full justify-center items-center text-white py-2 rounded-sm"
          disabled={selectedParticipantId?.length === 0}
        >
          Choose
        </button>
      </Modal>
    </div>
  );
};

export default PodcastManagement;
