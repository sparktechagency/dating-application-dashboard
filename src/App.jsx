
import IncomeOverview from './Components/IncomeOverview/IncomeOverview'
import { Link } from 'react-router-dom'
import ProfileUpdateRequest from './Components/ProfileUpdateRequest/ProfileUpdateRequest'
import './app.css'
import profile from './assets/images/profileuser.png'
import medal from './assets/images/medal.png'
import profit from './assets/images/profits.png'
import mic from './assets/images/microphone.png'
import img from './assets/images/user1.png'
import img2 from './assets/images/user2.png'
import img3 from './assets/images/user3.png'
import img4 from './assets/images/user4.png'
import UserGrowthChart from './Components/UserGrowthChart/UserGrowthChart'
import { useGetAnalyticsQuery } from './redux/api/DahsboardHomeApi'
function App() {
  // All APIs
  const {data : getAnalytics} = useGetAnalyticsQuery()
 

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
      count: getAnalytics?.data?.totalIncome,
    },
    {
      title: 'Total Podcast',
      icon: mic,
      count: getAnalytics?.data?.totalPodcast,
    }
  ]



  // table data 
  const dataSource = [
    {
      key: "#12331",
      perticipant1: "Holiday Parties",
      perticipant1Img: img,
      perticipant2Img: img2,
      perticipant3Img: img3,
      perticipant4Img: img4,
      perticipant2: 'Jhon Smith',
      perticipant3: "Wade Warren",
      perticipant4: "Danne Rusell",

    },
    {
      key: "#12333",
      perticipant1: "Holiday Parties",
      perticipant1Img: img,
      perticipant2Img: img2,
      perticipant3Img: img3,
      perticipant4Img: img4,
      perticipant2: 'Jhon Smith',
      perticipant3: "Wade Warren",
      perticipant4: "Danne Rusell",

    },
    {
      key: "#12334",
      perticipant1: "Holiday Parties",
      perticipant1Img: img,
      perticipant2Img: img2,
      perticipant3Img: img3,
      perticipant4Img: img4,
      perticipant2: 'Jhon Smith',
      perticipant3: "Wade Warren",
      perticipant4: "Danne Rusell",

    },

  ];

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
          <p className='text-2xl font-semibold'>Podcast Schedule Request</p> <Link className='text-[#2757A6]' to={`/schedule-request`}>
            View all
          </Link>
        </div>

        <ProfileUpdateRequest dataSource={dataSource} />
      </div>


    </div>
  )
}

export default App
