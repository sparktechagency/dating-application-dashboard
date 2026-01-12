import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { useGetAllNewPodcastQuery, useRemoveParticipantMutation } from "../../redux/api/DahsboardHomeApi";
import ScheduleUpdateRequest from "../../Components/ScheduleUpdateRequest/ScheduleUpdateRequest";

const ScheduleRequest = () => {
  const [page, setPage] = useState(1);
  const { data: getAllNewPodcast } = useGetAllNewPodcastQuery(page);
  const [removeParticipant] = useRemoveParticipantMutation();

  const handleRemoveParticipant = async ({ participantId }) => {
    try {
      await removeParticipant({ userId: participantId }).unwrap();
    } catch {
      // ignore
    }
  }

  const formattedData = Array.isArray(getAllNewPodcast?.data?.podcasts) && getAllNewPodcast?.data?.podcasts?.map((pod, i) => {
    const data = {
      id: pod?._id,
      key: i + 1,
      PrimaryParticipantName: pod?.primaryUser?.name,
      PrimaryParticipant: pod?.primaryUser?.avatar,
      // First participant is the primaryUser (Spotlight)
      perticipant1: pod?.primaryUser?.name || "N/A",
      perticipant1Id: pod?.primaryUser?._id || "",
      perticipant1Img: pod?.primaryUser?.avatar || "", 
      perticipant1Req: false,
      // Rest of participants (Spark-1, Spark-2, etc.)
      perticipant2: pod?.participants[0]?.user?.name || "N/A",
      perticipant2Id: pod?.participants[0]?.user?._id || "",
      perticipant2Img: pod?.participants[0]?.user?.avatar || "",
      perticipant2Req: !!pod?.participants[0]?.isRequest,
      perticipant3: pod?.participants[1]?.user?.name || "N/A",
      perticipant3Id: pod?.participants[1]?.user?._id || "",
      perticipant3Img: pod?.participants[1]?.user?.avatar || "",
      perticipant3Req: !!pod?.participants[1]?.isRequest,
      perticipant4: pod?.participants[2]?.user?.name || "N/A",
      perticipant4Id: pod?.participants[2]?.user?._id || "",
      perticipant4Img: pod?.participants[2]?.user?.avatar || "",
      perticipant4Req: !!pod?.participants[2]?.isRequest,
      perticipant5: pod?.participants[3]?.user?.name || "N/A",
      perticipant5Id: pod?.participants[3]?.user?._id || "",
      perticipant5Img: pod?.participants[3]?.user?.avatar || "",
      perticipant5Req: !!pod?.participants[3]?.isRequest,
      scheduleDate: pod?.schedule?.date,
      scheduleTime: pod?.schedule?.time,
      scheduleDay: pod?.schedule?.day,
      status: pod?.status
    }
    return data;
  })
  

  return (
    <div className="p-5 bg-white rounded-md">
      <div className="flex gap-2 items-center py-2 mb-5">
        <Link to={-1}>
          <FaArrowLeft className="text-[var(--primary-color)]" size={20} />
        </Link>
        <p className="text-xl font-semibold">Podcast Schedule Requests</p>
      </div>
      <ScheduleUpdateRequest dataSource={formattedData} onRemoveParticipant={handleRemoveParticipant} />
      <div className="flex justify-center mt-5">
        <Pagination
          current={page}
          total={getAllNewPodcast?.data?.pagination?.total}
          pageSize={getAllNewPodcast?.data?.pagination?.limit}
          onChange={(page) => setPage(page)}
        />
      </div>
      
    </div>
  );
};

export default ScheduleRequest;
