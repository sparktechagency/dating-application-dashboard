import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Pages/MainLayout/MainLayout";
import App from "../App";
import DeliveryDetails from "../Pages/DeliveryDetails/DeliveryDetails";
import Transaction from "../Pages/Transaction/Transaction";
import Profile from "../Pages/Profile/Profile";
import TremsCondition from "../Pages/TremsCondition/TremsCondition";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import FAQ from "../Pages/FAQ/FAQ";
import Login from "../Pages/Login/Login";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import Otp from "../Pages/Otp/Otp";
import UpdatePassword from "../Pages/UpdatePassword/UpdatePassword";
import Notification from "../Pages/Notification/Notification";
import SurveyResponse from "../Pages/SurveyResponse/SurveyResponse";
import Subscriptions from "../Pages/Subscriptions/Subscriptions";
import PodcastManagement from "../Pages/PodcastManagement/PodcastManagement";
import Matches from "../Pages/Matches/Matches";
import Support from "../Pages/Support/Support";
import Administrator from "../Pages/Administrator/Administrator";
import PrivateRoutes from "../Components/PrivateRoute/PrivateRoute";
import ConsumerPolicy from "../Pages/ConsumerPolicy/ConsumerPolicy";
import MediaPolicy from "../Pages/MediaPolicy/MediaPolicy";
import ScheduleRequest from "../Pages/ScheduleRequestPage/ScheduleRequest";
import VideoManagement from "../Pages/VideoManagement/VideoManagement";
import SmsPolicy from "../Pages/SmsPolicy/SmsPolicy";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoutes><MainLayout /></PrivateRoutes>,
        children: [
            {
                path: '/',
                element: <App /> 
            },
            {
                path: '/user-management',
                element: <DeliveryDetails />
            },
            {
                path: '/survey-response/:id',
                element: <SurveyResponse/>
            },
           
            {
                path: '/premium-subscriber',
                element: <Transaction />
            },
            {
                path : '/subscriptions',
                element : <Subscriptions/>
            },
            {
                path : '/podcast-management',
                element : <PodcastManagement/>
            },
            {
                path : '/matches',
                element : <Matches/>
            },
           
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/terms-condition',
                element: <TremsCondition />
            },
            {
                path: '/faq',
                element: <FAQ />
            },
            {
                path : '/consumer-policy',
                element : <ConsumerPolicy/>
            },
            {
                path : '/media-policy',
                element : <MediaPolicy/>
            },
            {
                path: '/schedule-request',
                element: <ScheduleRequest /> 
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicy />
            },
            {
                path : "/notification",
                element : <Notification/>
            },
            {
                path :  '/support',
                element : <Support/>
            },
            {
                path :  '/administrator',
                element : <Administrator/>
            },
            {
                path: '/video-management',
                element: <VideoManagement />
            },
            {
                path: '/sms-policy',
                element: <SmsPolicy />
            }


        ],


    },
    {
        path: '/auth/login',
        element: <Login />
    },
    {
        path: '/auth/forget-password',
        element: <ForgetPassword />
    },
    {
        path: '/auth/otp',
        element: <Otp />
    },
    {
        path: '/auth/update-password',
        element: <UpdatePassword />
    },
    
])