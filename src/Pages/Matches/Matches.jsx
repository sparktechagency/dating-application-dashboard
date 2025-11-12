import { Checkbox, Modal, Pagination, Table } from "antd";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGetAllDonePodCastQuery,
  useSelectPodCastPartnerMutation
} from "../../redux/api/podcastManagementApi";
import { imageUrl, place } from "../../redux/api/baseApi";

import { toast } from "sonner";
const Matches = () => {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [chooseUser] = useState();
  const [selectedParticipantId, setSelectedParticipantId] = useState([]); 
  const [podCastId] = useState("");

  const handleCheckboxChange = (participantId) => {
    setSelectedParticipantId((prevSelected) =>
      prevSelected.includes(participantId)
        ? prevSelected.filter((id) => id !== participantId)
        : [...prevSelected, participantId]
    );
  };


  const { data: getAllDonePodcast } = useGetAllDonePodCastQuery(page);
  const [selectedPartner] = useSelectPodCastPartnerMutation();
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
  const handleSelectedParticipant = () => {
    const data = {
      podcastId: podCastId,
      selectedUserId: selectedParticipantId.map(id => ({ user: id }))
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
      title: "Serial Number",
      dataIndex: "key",
      key: "key",
    },
    
    // {
    //   title: "Primary User",
    //   dataIndex: "primaryParticipant",
    //   key: "primaryParticipant",
    //   render: (_, record) => (
    //     <div className="flex items-center gap-2">
    //       {!!record?.primaryParticipantImg ? (
    //         <img className="w-10 h-10 rounded-lg" src={`${imageUrl}${record?.primaryParticipantImg}`} alt="" />
    //       ) : (
    //         <img className="w-10 h-10" src={place} alt="" />
    //       )}

    //       <p className="font-medium">{record?.primaryParticipantName}</p>
    //     </div>
    //   ),
    // },
    {
      title: "Match-1",
      dataIndex: "perticipant1",
      key: "perticipant1",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {!!record?.perticipant1Img ? (
            <img className="w-10 h-10 rounded-lg" src={`${imageUrl}${record?.perticipant1Img}`} alt="" />
          ) : (
            <img className="w-10 h-10" src={place} alt="" />
          )}

          <p className="font-medium">{record?.perticipant1}</p>
          {record?.perticipant1IsAllowed && <FaCheckCircle className="ml-1 text-green-500" />}
        </div>
      ),
    },
    {
      title: "Match-2",
      dataIndex: "perticipant2",
      key: "perticipant2",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {!!record?.perticipant2Img ? (
            <img className="w-10 h-10 rounded-lg" src={`${imageUrl}${record?.perticipant2Img}`} alt="" />
          ) : (
            <img src={place} className="w-10 h-10" alt="" />
          )}
          <p className="font-medium">{record?.perticipant2}</p>
          {record?.perticipant2IsAllowed && <FaCheckCircle className="ml-1 text-green-500" />}
        </div>
      ),
    },

    {
      title: "Match-3",
      dataIndex: "perticipant3",
      key: "perticipant3",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {!!record?.perticipant3Img ? (
            <img src={`${imageUrl}${record?.perticipant3Img}`} className="w-10 h-10 rounded-lg" alt="" />
          ) : (
            <img src={place} className="w-10 h-10" alt="" />
          )}

          <p className="font-medium">{record?.perticipant3}</p>
          {record?.perticipant3IsAllowed && <FaCheckCircle className="ml-1 text-green-500" />}
        </div>
      ),
    },
    {
      title: "Match-4",
      dataIndex: "perticipant4",
      key: "perticipant4",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {!!record?.perticipant4Img ? (
            <img className="w-10 h-10 rounded-lg" src={`${imageUrl}${record?.perticipant4Img}`} alt="" />
          ) : (
            <img className="w-10 h-10" src={place} alt="" />
          )}

          <p className="font-medium">{record?.perticipant4}</p>
          {record?.perticipant4IsAllowed && <FaCheckCircle className="ml-1 text-green-500" />}
        </div>
      ),
    },
  ];


  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
          </Link>
          <span className="font-semibold text-[20px]">Matches</span>
        </div>
      </div>

      <Table
        dataSource={formattedData}
        columns={columns}
        className="custom-pagination"
        pagination={false}
        scroll={{ x: 900 }}
        size="small"
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
        <p className="mb-10 text-xl font-medium text-center">Choose for Date</p>

        <div>
          {participants.filter((participant) => participant.id !== undefined)?.map((participant) => (
            <div
              key={participant?.id}
              className="flex items-center gap-4 px-24 mb-4"
            >
              <Checkbox
                checked={selectedParticipantId.includes(participant?.id)}
                onChange={() => handleCheckboxChange(participant?.id)}
              />
              {!!participant?.img ? (
                <img
                  src={`${imageUrl}${participant?.img}`}
                  alt={participant?.name}
                  className="w-10 h-10 rounded-lg"
                />
              ) : (
                <img src={place} alt="default" className="w-10 h-10" />
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

export default Matches;
