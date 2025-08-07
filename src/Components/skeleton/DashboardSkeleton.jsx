import { Skeleton } from "antd";

const DashboardSkeletonLayout = () => {
    return (
        <div className="flex min-h-screen bg-[#FFF9F6]">
            {/* Sidebar */}
            <aside className="w-60 bg-[#FFA87D] text-white space-y-4">
                <div className="mb-4 bg-white">
                    <Skeleton.Input active size="default" style={{ width: 250, height: 78 }} />
                </div>
                <div className="space-y-8 pt-10 pl-4">
                    {[...Array(7)].map((_, i) => (
                        <Skeleton.Input
                            key={i}
                            active
                            size="default"
                            style={{ width: 200, height: 50 }}
                        />
                    ))}
                </div>
                <div className="absolute bottom-8 left-4 right-4">
                    <Skeleton.Input active style={{ width: 200, height: 40 }} />
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-20 gap-5 bg-[#FFA87D] border-b px-6 flex items-center justify-end">
                    <Skeleton.Avatar active size="large" />
                    <Skeleton.Input active style={{ width: 150, height: 30 }} />
                </header>

                {/* Content */}
                <main className="p-6 space-y-6">
                    {/* Top Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, index) => (
                            <Skeleton.Button
                                key={index}
                                active
                                block
                                style={{ height: 220 }}
                            />
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Skeleton.Input active block style={{ height: 350 }} />
                        <Skeleton.Input active block style={{ height: 350 }} />
                    </div>

                    {/* Table */}
                    <Skeleton active paragraph={{ rows: 4 }} />
                </main>
            </div>
        </div>
    );
};

export default DashboardSkeletonLayout;
