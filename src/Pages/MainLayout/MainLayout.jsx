import React from 'react'
import Sidebar from '../../Components/Shared/Sidebar'
import Header from '../../Components/Shared/Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
    return (
        <div className='flex items-stretch gap-0 bg-[#F2F2F2]'>
            <div className='hidden md:block w-[300px] bg-[var(--primary-color)] h-screen overflow-y-auto'>
                <Sidebar />
            </div>
            <div className='w-full h-screen overflow-y-auto relative'>
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <div className='p-6 bg-[#F2F2F2]'>
                    <Outlet />
                </div>
            </div>
            <div className={`md:hidden fixed inset-0 z-50 ${isSidebarOpen ? '' : 'pointer-events-none'}`}>
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className={`fixed inset-0 bg-black/40 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
                />
                <div className={`fixed left-0 top-0 bottom-0 w-[280px] bg-[var(--primary-color)] transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className='h-full overflow-y-auto'>
                        <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout