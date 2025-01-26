import React, { useState } from "react";
import ProfileUpdateRequest from "../../Components/ProfileUpdateRequest/ProfileUpdateRequest";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Input, Pagination } from "antd";
import { useGetAllPodcastQuery } from "../../redux/api/DahsboardHomeApi";

const ProfileUpdatePage = () => {
    const [page, setPage] = useState(1);
  const { data: getAllPodcast } = useGetAllPodcastQuery();


  const onChange = (page) => {
    setCurrent(page);
  };

  const formattedData = getAllPodcast?.data?.podcasts
    ?.slice(0, 4)
    ?.map((pod, i) => {
      return {
        id: pod?._id,
        key: i + 1,
        perticipant2: pod?.participant1?.name,
        perticipant1: pod?.primaryUser?.name,
        perticipant1Img: pod?.primaryUser?.avatar,
        perticipant2Img: pod?.participant1?.avatar,
        perticipant3Img: pod?.participant2?.avatar,
        perticipant4Img: pod?.participant3?.avatar,
        perticipant3: pod?.participant2?.name,
        perticipant4: pod?.participant3?.name,
        scheduleDate: pod?.schedule?.date,
        scheduleTime: pod?.schedule?.time,
      };
    });

  return (
    <div className="bg-white rounded-md p-5">
      <div className="flex items-center gap-2 py-2 mb-5">
        <Link to={-1}>
          <FaArrowLeft className="text-[var(--primary-color)]" size={20} />
        </Link>
        <p className="font-semibold text-xl">Podcast Schedule Requests</p>
      </div>
      <ProfileUpdateRequest dataSource={formattedData} />
      <div className="flex justify-center mt-5">
        <Pagination
          page={getAllPodcast?.data?.pagination?.page}
          total={getAllPodcast?.data?.pagination?.totalPages}
          pageSize={getAllPodcast?.data?.pagination?.limit}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
