import { CiEdit, CiTrash } from 'react-icons/ci'
import { IoMdAdd } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { LuArrowUpDown } from 'react-icons/lu'
import { PiExport } from 'react-icons/pi'
import { TbFilterPlus } from 'react-icons/tb'
import { useGetStaff } from '../../queries/user/useGetStaff'
import { useState } from 'react'
import { Pagination } from '@mui/material'
import EditStaff from '../../components/Modals/EditStaff'

interface FilteredStaff {
    name: string;
    email: string;
    phone_number: number;
    role: string;
    id: string;
}

const StaffManagement = () => {
    const [searchText, setSearchText] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [isOpen, setisOpen] = useState(false);
    const [staffId, setStaffId] = useState<string | null>(null);

    const handleEdit = (id: string) => {
        console.log('Edit Clicked', id);
        setStaffId(id);
        setisOpen(true);
    }

    const toggleSort = () => {
        if (sortOrder === 'asc') setSortOrder('desc');
        else setSortOrder('asc');
    }

    const { data, error } = useGetStaff();
    const tableHeading: string[] = [
        'Full Name',
        'Email',
        'Phone Number',
        'Role',
        'Actions'
    ]

    const FilteredData = data?.map((staff: FilteredStaff) => ({
        name: staff.name,
        email: staff.email,
        phone_number: staff.phone_number,
        role: staff.role,
        id: staff.id,
    })) || [];

    const filteredRows: FilteredStaff[] = FilteredData
        .filter((row: FilteredStaff) =>
            Object.values(row)
                .join(' ')
                .toLowerCase()
                .includes(searchText.toLowerCase())
        )
        .sort((a: FilteredStaff, b: FilteredStaff) => {
            if (!sortOrder) return 0;
            if (a.name < b.name) return sortOrder === 'asc' ? -1 : 1;
            if (a.name > b.name) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);

    if (error) return <h1>{error.message}</h1>

    return (
        <div className='py-4 w-full'>

            {/* heading sec */}
            <div className='flex flex-row items-center justify-between'>
                <h1 className='font-semibold text-lg sm:text-xl'>Staff Management</h1>
                <button className='flex items-center gap-2 p-4 h-5 rounded-md text-sm justify-center bg-[#346751] text-white hover:bg-[#274e3d] hover:text-white'><IoMdAdd /><p className='hidden md:inline' >Add Staff</p></button>
            </div>

            {/* search, export, filter, sort */}
            <div className='flex flex-col md:flex-row justify-between py-2 w-full gap-2'>
                {/* search bar */}
                <div className='flex items-center gap-2 p-2 rounded-full w-1/2 text-sm border border-[#D0D0D0] '>
                    <span><IoSearch /></span>
                    <input type='text' placeholder='Search Staff'
                        className='focus:outline-none w-full' value={searchText} onChange={(e) => { setSearchText(e.target.value); setPage(1); }}></input>
                </div>
                {/* export,filter,sort group */}
                <div className='flex flex-row ,md:justify-end items-center gap-2'>

                    <button className='flex items-center gap-2 p-2 rounded-md text-sm justify-center bg-[#346751] border border-[#346751] text-white hover:bg-[#274e3d] hover:text-white hover:border-[[#274e3d]]'><PiExport /><p className='hidden md:inline'>Export</p></button>

                    <button className='flex items-center gap-2 p-2 rounded-md text-sm border border-black hover:border-[#346751] hover:bg-[#346751] hover:text-white'><TbFilterPlus /><p className='hidden md:inline'>Filter</p></button>

                    <button className='flex items-center gap-2 p-2 rounded-md text-sm border border-black hover:border-[#346751] hover:bg-[#346751] hover:text-white' onClick={toggleSort}><LuArrowUpDown /><p className='hidden md:inline'>Sort</p></button>
                </div>
            </div>

            {/* table content */}
            <div className='overflow-x-auto w-full'>
                <table className='w-full min-w-max'>
                    <thead >
                        <tr className='bg-[#AEC2B9]'>
                            {tableHeading.map((th) => <th className='text-sm font-semibold text-left sm:text-md p-3'>{th}</th>)}
                        </tr>
                    </thead>
                    <tbody >
                        {currentRows.map((row: FilteredStaff, index: number) => (
                            <tr key={index} className='odd:bg-white even:bg-[#EBF0EE] text-sm sm:text-md justify-center'>
                                <td className='p-3'>{row.name}</td>
                                <td className='p-3'>{row.email}</td>
                                <td className='p-3'>{row.phone_number}</td>
                                <td className='p-3'>{row.role}</td>
                                <td className='p-3'><div className='flex flex-row p-3'><CiTrash className='text-lg' /><CiEdit className='text-lg' onClick={() => handleEdit(row.id)} /></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between mt-4">
                <div>
                    <label className='text-[#565656] pr-2'>Show Result:</label>
                    <select id="rowsPerPage" value={rowsPerPage} onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setPage(1);
                    }}
                    className="p-2 border border-gray-300 rounded-md focus:outline-[#565656]">
                        {[5, 10, 15, 20].map((n) => (
                            <option key={n} value={n} className='outline-gray-300'>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>

                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="standard"
                />
            </div>
            {isOpen && staffId && (<EditStaff staffId={staffId} onClose={() => setisOpen(false)} />)}
        </div>
    )
}

export default StaffManagement