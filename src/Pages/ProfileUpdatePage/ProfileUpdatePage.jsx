import React, { useState } from "react";
import ProfileUpdateRequest from "../../Components/ProfileUpdateRequest/ProfileUpdateRequest";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import {  Pagination } from "antd";
import { useGetAllNewPodcastQuery, useGetAllPodcastQuery } from "../../redux/api/DahsboardHomeApi";

const ProfileUpdatePage = () => {
  const [page, setPage] = useState(1);
  const { data: getAllPodcast } = useGetAllNewPodcastQuery(page);

  console.log(getAllPodcast?.data?.pagination);


  const formattedData = getAllPodcast?.data?.podcasts?.map((pod , i)=>{
    return (
      {
        id : pod?._id,
        key: i + 1,
        PrimaryParticipantName: pod?.primaryUser?.name,
        PrimaryParticipant:  pod?.primaryUser?.avatar,
        perticipant2:pod?.participants[0]?.name,
        perticipant2Img:  pod?.participants[0]?.avatar,
        perticipant3: pod?.participants[1]?.name,
        perticipant3Img:  pod?.participants[1]?.avatar,
        perticipant4: pod?.participants[2]?.name,
        perticipant4Img:   pod?.participants[2]?.avatar,
        perticipant1: pod?.participants[3]?.name,
        perticipant1Img:   pod?.participants[3]?.avatar,
        scheduleDate : pod?.schedule?.date,
        scheduleTime : pod?.schedule?.time,
        scheduleDay : pod?.schedule?.day
      }
    )
  })

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
          current={getAllPodcast?.data?.pagination?.page}
          total={getAllPodcast?.data?.pagination?.totalPages}
          pageSize={getAllPodcast?.data?.pagination?.limit}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
