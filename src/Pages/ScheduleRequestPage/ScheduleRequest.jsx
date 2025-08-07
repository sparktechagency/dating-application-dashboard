import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { useGetAllNewPodcastQuery } from "../../redux/api/DahsboardHomeApi";
import ScheduleUpdateRequest from "../../Components/ScheduleUpdateRequest/ScheduleUpdateRequest";

const ScheduleRequest = () => {
  const [page, setPage] = useState(1);
  const { data: getAllNewPodcast } = useGetAllNewPodcastQuery(page);



  const formattedData = Array.isArray(getAllNewPodcast?.data?.podcasts) && getAllNewPodcast?.data?.podcasts?.map((pod, i) => {
    console.log(pod);
    const data = {
      id: pod?._id,
      key: i + 1,
      PrimaryParticipantName: pod?.primaryUser?.name,
      PrimaryParticipant: pod?.primaryUser?.avatar,
      perticipant1: pod?.participants[0]?.user?.name || "N/A",
      perticipant1Img: pod?.participants[0]?.user?.avatar || "", 
      perticipant2: pod?.participants[1]?.user?.name || "N/A",
      perticipant2Img: pod?.participants[1]?.user?.avatar || "",
      perticipant3: pod?.participants[2]?.user?.name || "N/A",
      perticipant3Img: pod?.participants[2]?.user?.avatar || "",
      perticipant4: pod?.participants[3]?.user?.name || "N/A",
      perticipant4Img: pod?.participants[3]?.user?.avatar || "",
      scheduleDate: pod?.schedule?.date,
      scheduleTime: pod?.schedule?.time,
      scheduleDay: pod?.schedule?.day,
      status: pod?.status
    }
    return data;
  })
 
  

  return (
    <div className="bg-white rounded-md p-5">
      <div className="flex items-center gap-2 py-2 mb-5">
        <Link to={-1}>
          <FaArrowLeft className="text-[var(--primary-color)]" size={20} />
        </Link>
        <p className="font-semibold text-xl">Podcast Schedule Requests</p>
      </div>
      <ScheduleUpdateRequest dataSource={formattedData} />
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
