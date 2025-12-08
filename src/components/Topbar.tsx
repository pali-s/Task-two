import React from 'react'
import { FaAngleDown, FaAngleRight, FaRegBell } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import { useGetUser } from '../queries/user/useGetUsers';

interface TopbarProps {
    pageName: string | null;
}

const Topbar: React.FC<TopbarProps> = ({ pageName }) => {
    const {data}= useGetUser();
    return (
        <div className='flex items-center bg-[#EBF0EE] shadow-xl
    py-[9px]
    rounded-md justify-between' >
            <div className='flex gap-2'>
                <div className='text-[#565656] font-normal text-md p-2.5 hidden sm:inline'>
                    Dashboard
                </div>
                {pageName && <div className='text-[#565656] font-normal text-md flex items-center gap-2'>
                    <FaAngleRight />  {pageName}
                </div>
                }
            </div>
            <div className='flex gap-2 text-md text-[#565656] items-center pr-2.5'>
                <FaRegBell className='hidden md:inline'/>
                <FaCircleUser className='hidden md:inline' />
                <span className='hidden md:inline'>{data?.name}</span>
                <FaAngleDown/>
            </div>
        </div>
    )
}

export default Topbar