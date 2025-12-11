import { CiEdit, CiTrash } from 'react-icons/ci'
import { IoMdAdd } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { LuArrowUpDown } from 'react-icons/lu'
import { PiExport } from 'react-icons/pi'
import { TbFilterPlus } from 'react-icons/tb'
import { useGetStaff } from '../../queries/user/useGetStaff'
import { useCallback, useMemo, useState } from 'react'

import EditStaff from '../../components/Modals/EditStaff'

import {type ColumnDef} from '@tanstack/react-table'
import { DataTable } from '../../components/Table/DataTable'

interface FilteredStaff {
    name: string;
    email: string;
    phone_number: number;
    role: string;
    id: string;
}

const StaffManagement = () => {
    const [globalFilter, setGlobalFilter] = useState('');

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

    const [isOpen, setisOpen] = useState(false);
    const [staffId, setStaffId] = useState<string | null>(null);

    const handleEdit = useCallback((id: string) => {
        setStaffId(id);
        setisOpen(true);
    }, []);


    const toggleSort = () => {
        if (sortOrder === 'asc') setSortOrder('desc');
        else setSortOrder('asc');
    }

    const { data, error } = useGetStaff();

    const FilteredData: FilteredStaff[] = useMemo(
        () =>
            data?.map((s: FilteredStaff) => ({
                name: s.name,
                email: s.email,
                phone_number: s.phone_number,
                role: s.role,
                id: s.id
            })) || [],
        [data]
    )

    //column def for tanstack table
    const columns = useMemo<ColumnDef<FilteredStaff>[]>(() => [
        {
            accessorKey: "name",
            header: "Full Name",
            cell: (info) => info.getValue()
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: (info) => info.getValue()
        },
        {
            accessorKey: "phone_number",
            header: "Phone Number",
            cell: (info) => info.getValue()
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: (info) => info.getValue(),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex flex-row gap-2">
                    <CiTrash className="text-lg" />
                    <CiEdit className="text-lg" onClick={() => handleEdit(row.original.id)} />
                </div>
            )
        }
    ], [handleEdit]);

    if (error) return <h1>{error.message}</h1>

    return (
        <div className='py-4 w-full'>

            {/* heading sec */}
            <div className='flex flex-row items-center justify-between'>
                <h1 className='font-semibold text-lg sm:text-xl'>Staff Management</h1>
                <button className='flex items-center gap-2 p-2 rounded-md text-sm justify-center bg-[#346751] text-white hover:bg-[#274e3d] hover:text-white'><IoMdAdd /><p className='hidden md:inline' >Add Staff</p></button>
            </div>

            {/* search, export, filter, sort */}
            <div className='flex flex-col md:flex-row justify-between py-2 w-full gap-2 mt-4'>
                
                {/* search bar */}
                <div className='flex items-center gap-2 p-2 rounded-full w-full md:w-1/2 text-sm border border-[#D0D0D0]'>
                    <span><IoSearch /></span>
                    <input type='text' placeholder='Search Staff'
                        className='focus:outline-none w-full' value={globalFilter ?? ""} onChange={(e) => { setGlobalFilter(e.target.value);}}></input>
                </div>

                {/* export,filter,sort group */}
                <div className='flex flex-row ,md:justify-end items-center gap-2'>

                    <button className='flex items-center gap-2 p-2 rounded-md text-sm justify-center bg-[#346751] border border-[#346751] text-white hover:bg-[#274e3d] hover:text-white hover:border-[[#274e3d]]'><PiExport /><p>Export</p></button>

                    <button className='flex items-center gap-2 p-2 rounded-md text-sm border border-black hover:border-[#346751] hover:bg-[#346751] hover:text-white'><TbFilterPlus /><p>Filter</p></button>

                    <button className='flex items-center gap-2 p-2 rounded-md text-sm border border-black hover:border-[#346751] hover:bg-[#346751] hover:text-white' onClick={toggleSort}><LuArrowUpDown /><p>Sort</p></button>
                </div>
            </div>

            {/* table content */}
            <div className='mt-4'>
                        <DataTable data={FilteredData} columns={columns} globalFilter={globalFilter}/>
            </div>

            {/* edit staff modal */}
            {isOpen && staffId && (<EditStaff staffId={staffId} onClose={() => setisOpen(false)} />)}
        </div>
    )
}

export default StaffManagement