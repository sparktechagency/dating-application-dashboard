
import IncomeOverview from './Components/IncomeOverview/IncomeOverview'
import { Link } from 'react-router-dom'
import './App.css'
import profile from './assets/images/profileuser.png'
import medal from './assets/images/medal.png'
import profit from './assets/images/profits.png'
import mic from './assets/images/microphone.png'
import UserGrowthChart from './Components/UserGrowthChart/UserGrowthChart'
import { useGetAllNewPodcastQuery, useGetAnalyticsQuery, useRemoveParticipantMutation } from './redux/api/DahsboardHomeApi'
import ScheduleUpdateRequest from './Components/ScheduleUpdateRequest/ScheduleUpdateRequest'
function App() {
  // All APIs
  const { data: getAnalytics } = useGetAnalyticsQuery()
  const { data: getAllPodcast } = useGetAllNewPodcastQuery()
  const [removeParticipant] = useRemoveParticipantMutation()


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
      <div className="grid grid-cols-1 gap-5 justify-center items-center md:grid-cols-4">
        {
          data?.map((item, index) => <div className='flex flex-col gap-3 justify-center items-center p-2 py-7 w-full h-full bg-white rounded-md' key={index}>
            <p className='text-2xl font-medium'>{item?.title}</p>
            <div className='p-3 bg-white rounded-full'>
              <img src={item?.icon} alt="" />
            </div>
            <p className='text-3xl font-semibold'>{item?.count}</p>
          </div>)
        }
      </div>

      {/* Chart */}
      <div className='grid grid-cols-1 gap-5 mt-5 md:grid-cols-2'>
        <div className='p-4 w-full h-full bg-white rounded-md'>
          <IncomeOverview />
        </div>
        <div className='p-4 w-full h-full bg-white rounded-md'>
          <UserGrowthChart />
        </div>
      </div>


      {/* Profile update request section */}
      <div className="mt-5 bg-[white] p-4 sm:p-5 rounded-md">

        <div className='flex flex-col gap-3 justify-between items-start p-3 mb-3 sm:flex-row sm:items-center sm:gap-2 sm:p-5'>
          <p className='text-xl font-semibold sm:text-2xl'>Podcast Schedule Request</p>
          <Link className='text-[#2757A6] hover:underline shrink-0' to={`/schedule-request`}>
            View all
          </Link>
        </div>

        <div className='overflow-x-auto'>
          <ScheduleUpdateRequest
            dataSource={formattedData}
            onRemoveParticipant={async ({ participantId }) => {
              try {
                await removeParticipant({ userId: participantId }).unwrap()
              } catch {
                // ignore
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
