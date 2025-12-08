import React from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import { Outlet } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Dashboard = () => {
    const [pageName, setPageName] = React.useState<string | null>('');
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <div className="w-screen flex bg-[#FDFAF4] overflow-x-hidden h-screen">
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`${isOpen ? 'w-0 z-50 md:w-72' : 'w-16'} transition-all duration-300 left-0 h-screen fixed`}>
                <Sidebar setPageName={setPageName} isOpen={isOpen} />
            </div>

            {/* Main area (Topbar + Content) */}
            <div className= {`flex-1 flex flex-col text-black p-10 transition-all duration-300  ${isOpen ? "ml-0 md:ml-72" : "ml-16"}`}>

                {/* Topbar */}
                <Topbar pageName={pageName} />
                {/* Main Content */}
                <div className=''>
                    <Outlet />
                </div>
            </div>


            {/* Sidebar Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed top-4 ${isOpen ? 'left-68' : 'left-16'} z-50 p-2 rounded-full hover:bg-gray-300 transition-all duration-300 bg-[#95a59e50] text-[#1D1D1D]`}
            >
                {isOpen ? <FaAngleLeft /> : <FaAngleRight />}
            </button>
        </div>
    );
};

export default Dashboard;
