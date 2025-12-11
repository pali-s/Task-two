import {
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    flexRender
} from '@tanstack/react-table'
import type {ColumnDef, FilterFn } from '@tanstack/react-table'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { GrPrevious, GrNext } from "react-icons/gr";

interface DataTableProps<T>{
    data:T[];
    columns:ColumnDef<T,unknown>[];
    globalFilter: string;
}

export const DataTable =<T,> ({data, columns,globalFilter=""}:DataTableProps<T>) => {

        const globalFilterFn: FilterFn<T> =(
        row,columnId,value
    )=>{
        const rowValue = row.getValue(columnId)?.toString() ?? "";
        const filterValue = (value ?? "").toString();

        return rowValue.toLowerCase().includes(filterValue.toLowerCase());
    }

    const table = useReactTable({
        data,
        columns,
        state:{
            globalFilter
        },
        globalFilterFn:globalFilterFn,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel:getFilteredRowModel(),
        getPaginationRowModel:getPaginationRowModel(),

    })

    return (
        <>
            <div className='overflow-x-auto w-full'>
                <table className='min-w-max w-full'>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className='bg-[#AEC2B9]'>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className='text-sm font-semibold text-left sm:text-md p-3'>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() === "asc" && <FaArrowUp />}
                                        {header.column.getIsSorted() === "desc" && <FaArrowDown />}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className='odd:bg-white even:bg-[#EBF0EE] text-sm sm:text-md justify-center'>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className='p-3'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex md:justify-between mt-4 flex-col items-center md:flex-row">

                {/* pagination */}
                <div>
                    <label className='text-[#565656] pr-2'>Show Result:</label>
                    <select value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}
                        className="p-1 border border-gray-300 rounded-md focus:outline-[#565656]">
                        {[5, 10, 15, 20].map((n) => (
                            <option key={n} value={n} className='outline-gray-300'>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex justify-center items-center'>
                    <button onClick={() => table.previousPage()
                    } disabled={!table.getCanPreviousPage()} className='flex justify-between items-center p-2 text-[#565656] font-sm '><GrPrevious className='text-md' />Previous</button>
                    <span>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className='flex justify-between items-center p-2 text-[#565656] font-sm '>Next<GrNext className='text-md' /></button>
                </div>


            </div>
        </>
    )
}