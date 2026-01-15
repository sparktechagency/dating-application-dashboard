import {Modal, Pagination, Table } from "antd";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
// import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGetMatchedPodCastQuery,
  // useSelectPodCastPartnerMutation
} from "../../redux/api/podcastManagementApi";
import { imageUrl, place } from "../../redux/api/baseApi";

// import { toast } from "sonner";
const Matches = () => {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  // const [chooseUser, setChooseUser] = useState();
  // const [selectedParticipantId, setSelectedParticipantId] = useState([]); 
  // const [podCastId, setPodCastId] = useState("");

  // const handleCheckboxChange = (participantId) => {
  //   setSelectedParticipantId((prevSelected) =>
  //     prevSelected.includes(participantId)
  //       ? prevSelected.filter((id) => id !== participantId)
  //       : [...prevSelected, participantId]
  //   );
  // };


  const { data: getMatchedPodcast } = useGetMatchedPodCastQuery(page);
  // const [selectedPartner] = useSelectPodCastPartnerMutation();
  const formattedData = Array.isArray(getMatchedPodcast?.data?.podcasts) && getMatchedPodcast?.data?.podcasts?.map((pod, i) => {
    const baseData = {
      key: i + 1,
      id: pod?._id,
      primaryParticipantId: pod?.primaryUser?._id,
      primaryParticipantName: pod?.primaryUser?.name || "N/A",
      primaryParticipantImg: pod?.primaryUser?.avatar,
      date: pod?.schedule?.date?.split("T")[0] || "NO Date",
      record: pod?.recordingUrl || "N/A",
      matches: pod?.matches || [],
      createdAt: pod?.createdAt,
    };
    
    // Add match data dynamically
    if (Array.isArray(pod?.matches)) {
      pod.matches.forEach((match, idx) => {
        baseData[`match${idx + 1}Id`] = match?.user?._id;
        baseData[`match${idx + 1}`] = match?.user?.name || "N/A";
        baseData[`match${idx + 1}Img`] = match?.user?.avatar;
      });
    }
    
    return baseData;
  });



  // const participants = chooseUser?.matches?.map((match) => ({
  //   id: match?.user?._id,
  //   name: match?.user?.name,
  //   img: match?.user?.avatar,
  // })) || [];
  // const handleOpenModal = (record) => {
  //   setChooseUser(record);
  //   setPodCastId(record.id);
  //   setSelectedParticipantId([]);
  //   setOpenModal(true);
  // };

  // const handleSelectedParticipant = () => {
  //   const data = {
  //     podcastId: podCastId,
  //     selectedUserId: selectedParticipantId.map(id => ({ user: id }))
  //   };
  //   selectedPartner(data)
  //     .unwrap()
  //     .then((payload) => {
  //       toast.success(payload?.message);
  //       setOpenModal(false);
  //     })
  //     .catch((error) => toast.error(error?.data?.message));
  // };


  const columns = [
    {
      title: "Serial Number",
      dataIndex: "key",
      key: "key",
    },
    
    {
      title: "Spotlight",
      dataIndex: "primaryParticipant",
      key: "primaryParticipant",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {!!record?.primaryParticipantImg ? (
            <img className="w-10 h-10 rounded-lg" src={`${imageUrl}${record?.primaryParticipantImg}`} alt="" />
          ) : (
            <img className="w-10 h-10" src={place} alt="" />
          )}

          <p className="font-medium">{record?.primaryParticipantName}</p>
        </div>
      ),
    },
    ...(formattedData && formattedData[0] ? Array.from({ length: formattedData[0]?.matches?.length || 0 }, (_, i) => ({
      title: `Spark-${i + 1}`,
      dataIndex: `match${i + 1}`,
      key: `match${i + 1}`,
      render: (_, record) => {
        const imagePath = record[`match${i + 1}Img`];
        return (
          <div className="flex items-center gap-2">
            {!!imagePath ? (
              <img className="w-10 h-10 rounded-lg" src={`${imageUrl}${imagePath}`} alt="" />
            ) : (
              <img className="w-10 h-10" src={place} alt="" />
            )}
            <p className="font-medium">{record[`match${i + 1}`]}</p>
          </div>
        );
      },
    })) : []),
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <p className="font-medium">
          {text ? new Date(text).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
        </p>
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <button
    //       onClick={() => handleOpenModal(record)}
    //       className="px-4 py-2 bg-[#FFA175] text-white rounded-md text-sm hover:bg-orange-600"
    //     >
    //       Choose
    //     </button>
    //   ),
    // },
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
          current={getMatchedPodcast?.data?.pagination?.page}
          total={getMatchedPodcast?.data?.pagination?.total}
          pageSize={getMatchedPodcast?.data?.pagination?.limit}
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

        {/* <div>
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
        </div> */}
        {/* <button
          onClick={() => handleSelectedParticipant()}
          className="bg-[#FFA175] flex w-full justify-center items-center text-white py-2 rounded-sm"
          disabled={selectedParticipantId?.length === 0}
        >
          Choose
        </button> */}
      </Modal>
    </div>
  );
};

export default Matches;
