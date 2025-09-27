
import IncomeOverview from './Components/IncomeOverview/IncomeOverview'
import { Link } from 'react-router-dom'
import './App.css'
import profile from './assets/images/profileuser.png'
import medal from './assets/images/medal.png'
import profit from './assets/images/profits.png'
import mic from './assets/images/microphone.png'
import UserGrowthChart from './Components/UserGrowthChart/UserGrowthChart'
import { useGetAllNewPodcastQuery, useGetAnalyticsQuery } from './redux/api/DahsboardHomeApi'
import ScheduleUpdateRequest from './Components/ScheduleUpdateRequest/ScheduleUpdateRequest'
function App() {
  // All APIs
  const { data: getAnalytics } = useGetAnalyticsQuery()
  const { data: getAllPodcast } = useGetAllNewPodcastQuery()


  // 
  const data = [
    {
      title: 'Total Users',
      icon: profile,
      count: getAnalytics?.data?.users,
    },
    {
      title: 'Premium Users',
      icon: medal,
      count: getAnalytics?.data?.premiumUsers,
    },
    {
      title: 'Total Income',
      icon: profit,
      count: getAnalytics?.data?.totalIncome.toFixed(2),
    },
    {
      title: 'Total Podcast',
      icon: mic,
      count: getAnalytics?.data?.totalPodcast,
    }
  ]


  const formattedData = getAllPodcast?.data?.podcasts?.slice(0, 4)?.map((pod, i) => {
    return (
      {
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
    )
  }).sort((a, b) => {
    if (a.status === "ReqScheduled" && b.status !== "ReqScheduled") {
      return -1;
    } else if (a.status !== "ReqScheduled" && b.status === "ReqScheduled") {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div>

      {/*  statistics card for dashboard home page */}
      <div className="grid grid-cols-4 justify-center items-center gap-5">
        {
          data?.map((item, index) => <div className='w-full h-full flex justify-center items-center  flex-col gap-3 py-7 bg-white p-2 rounded-md' key={index}>
            <p className='text-2xl  font-medium'>{item?.title}</p>
            <div className='bg-white rounded-full p-3'>
              <img src={item?.icon} alt="" />
            </div>
            <p className='text-3xl font-semibold'>{item?.count}</p>
          </div>)
        }
      </div>

      {/* Chart */}
      <div className='grid grid-cols-2 mt-5 gap-5'>
        <div className='w-full h-full bg-white p-4 rounded-md'>
          <IncomeOverview />
        </div>
        <div className='w-full h-full bg-white p-4 rounded-md'>
          <UserGrowthChart />
        </div>
      </div>


      {/* Profile update request section */}
      <div className="mt-5 bg-[white] p-5 rounded-md">

        <div className='flex justify-between items-center gap-2 mb-3 p-5'>
          <p className='text-2xl font-semibold'>Podcast Schedule Request</p>
          <Link className='text-[#2757A6]' to={`/schedule-request`}>
            View all
          </Link>
        </div>

        <ScheduleUpdateRequest dataSource={formattedData} />
      </div>


    </div>
  )
}

export default App
