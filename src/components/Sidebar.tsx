import React from 'react'
import { LuLayoutDashboard } from 'react-icons/lu';
import { TbLogout2 } from 'react-icons/tb';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'
import { PiCardholderBold } from 'react-icons/pi';
import { BsFillPeopleFill } from 'react-icons/bs';
// import { clearAuthData } from '../utils/token';

interface SidebarProps {
    setPageName: React.Dispatch<React.SetStateAction<string | null>>;
    isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ setPageName, isOpen }) => {
    const navigate = useNavigate();
    const { clearAuthData } = useAuth();

    const handleLogout = () => {
        clearAuthData();
        navigate("/login");
    }

    const menuItems = [
        { name: 'Dashboard', icon: <LuLayoutDashboard className='text-lg' />, to: '/dashboard/', exact: true },
        { name: 'Staff Management', icon: <BsFillPeopleFill className='text-lg' />, to: '/dashboard/staff-management' },
        { name: 'Subscription Management', icon: <PiCardholderBold className='text-lg' />, to: '/dashboard/subscription-management' }
    ]

    return (
        <>
            <div className={` bg-[#EBF0EE] flex flex-col justify-between shadow-2xl h-full text-black  gap-5 ${isOpen ? 'w-72 p-5' : 'w-20'}`}>

                <div>
                    {/* logo section */}
                    <img alt='foodverse-logo' src='src\assets\images\foodverse.png' className={`transition-transform duration-300 ${isOpen ? "scale-100" : "scale-95 mx-3 my-5 w-full"}`}></img>

                    {/* User Section */}
                    <div className={`user-info_section ${isOpen && 'bg-[#F4E9D6] border border-[#ECDBBA] rounded-lg'}  flex items-center ${!isOpen && 'justify-center'} space-x-4 mt-3 mb-4 text-black`}>
                        {/* user image section */}
                        <img alt='user' className={`${isOpen ? 'w-12 h-12' : 'w-9 h-9'} rounded-full object-cover`} src='src\assets\images\user_logo.jpg'></img>
                        {/* text section */}
                        {isOpen &&
                            <div className='flex flex-col leading-tight'>
                                <span className='font-semibold'>SaSa:Twa</span>
                                <span className='text-sm'>Kirtipur,Lalitpur,Nepal</span>
                            </div>
                        }
                    </div>

                    {/* Navigation Links */}
                    <aside className="flex flex-col  p-0 gap-2">
                        {menuItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.to}
                                end={item.exact}
                                onClick={() => setPageName(item.name == 'Dashboard' ? "" : item.name)}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded-lg w-full h-10 ${!isOpen && 'justify-center'} ${isActive ? 'bg-[#346751] text-white' : 'text-[#161616] hover:bg-[#346751] hover:text-white'
                                    }`
                                }
                            >
                                {item.icon}
                                {isOpen &&
                                    <span className="text-md font-normal">{item.name}</span>
                                }
                            </NavLink>
                        ))}
                    </aside>
                </div>

                {/* Logout button */}
                <div className='logout-section'>
                    <button onClick={handleLogout} className={`flex items-center justify-center gap-2 p-2 h-10 font-semibold  ${!isOpen ? 'justify-center items-center rounded-full w-10 h-10 mx-4 my-4' : 'rounded-lg w-full'}  bg-[#346751] text-white hover:bg-[#274e3d] hover:text-white `}><TbLogout2 className='item-lg' />{isOpen && 'Logout'}</button>
                </div>
            </div>
        </>
    )
}

export default Sidebar