import { Navigate, useLocation } from "react-router-dom"
import { useGetAdminProfileQuery } from "../../redux/api/AuthApi";
import DashboardSkeleton from "../skeleton/DashboardSkeleton";

 const PrivateRoutes = ({children}) =>{
    const location = useLocation()
    const { data: getUserInfo,isError, isLoading } = useGetAdminProfileQuery();
    if(isLoading){
        return <DashboardSkeleton />
    }
    if (isError || !getUserInfo?.data?.email) {
        return <Navigate to="/auth/login" state={{ from: location }} />;
      }
    
      return children; 

}
export default PrivateRoutes;