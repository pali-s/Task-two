import { IoMdInformationCircleOutline } from 'react-icons/io'
import Progressbar from '../../components/Ui/Progressbar'

const Subscription = () => {
    return (
            <div className="grid gap-4 w-full
                grid-cols-1
                sm:grid-cols-4 sm:grid-rows-4
                px-3 py-5
                ">
                
                {/* subscription details */}
                <div className="col-span-1 row-span-1 sm:col-span-2 sm:row-span-2 shadow-sm shadow-[#ADADAD40] p-4 gap-4 rounded-b-md w-full h-full overflow-auto">
                    
                    <h1 className='font-semibold text-lg sm:text-xl'>Subscription Details</h1>

                    <div className='grid grid-cols-2  py-4 gap-y-4'>
                    
                        <p className="text-[#737373] text-sm sm:text-base">Subscription Type:</p>
                        <span className="text-sm sm:text-base">Premium</span>

                        <p className='text-[#737373] text-sm sm:text-base'>Start Date </p>
                        <span className='text-sm sm:text-base'>2025-02-20</span>

                        <p className='text-[#737373] text-sm sm:text-base'>End Date/Renewal Date </p>
                        <span className='text-sm sm:text-base'>2025-03-20</span>

                        <p className='text-[#737373] text-sm sm:text-base'>Payment Status </p>
                        <div className='flex flex-row'>
                        <div className='border border-[#FF9F29] rounded-md
                        text-sm text-[#FF9F29] sm:text-base px-2 py-1 '>Pending</div>
                        <IoMdInformationCircleOutline/>
                        </div>
                </div>
                <button className='flex items-center gap-2 p-2 h-10 rounded-md w-full justify-center bg-[#346751] text-white hover:bg-[#274e3d] hover:text-white'>Upgrade Plan</button>
                </div>

                {/* payment options */}
                <div className="col-span-1 row-span-1 sm:col-span-2 sm:col-start-3 shadow-sm shadow-[#ADADAD40] p-4 gap-4 rounded-b-md w-full h-full overflow-auto">
                    <h1 className='font-semibold text-lg sm:text-xl pb-2'>Payment Options</h1>
                    <hr className='text-[#E1E1E1]'></hr>
                    <div className='bg-[#EBF0EE]text-black p-2'>
                        E-sewa
                    </div>
                </div>

                {/* payment summary */}
                <div className="col-span-1 row-span-1 sm:col-span-2 sm:row-span-2 sm:col-start-3 sm:row-start-2 shadow-sm shadow-[#ADADAD40] p-4 gap-4 rounded-b-md w-full h-full overflow-auto">
                    <h1 className='font-semibold text-lg sm:text-xl pb-2'>Payment Summary</h1>
                    <hr className='text-[#E1E1E1]'></hr>
                    <div className='grid grid-cols-2  py-4 gap-y-4'>

                    <p className="text-[#737373] text-sm sm:text-base">Subtotal</p>
                        <span className="text-sm sm:text-base">Rs.4,000</span>

                    <p className="text-[#737373] text-sm sm:text-base">Discount for promo</p>
                        <span className="text-sm sm:text-base">Rs.0</span>

                    <p className="text-sm sm:text-base">Discount for promo</p>
                        <span className="text-sm sm:text-base">Rs.4,000</span>
                    </div>
                    <hr className='text-[#E1E1E1] border-t-2 border-dashed p-2 '></hr>
                    <div className='flex items-center gap-4 md:gap-10 flex-wrap'>
                    <button className='border border-black rounded-md h-10 px-4 '>Cancel Subscription</button>
                    <button className='px-4 h-10 rounded-md justify-center bg-[#346751] text-white hover:bg-[#274e3d] hover:text-white'>Renew Subscription</button>
                    </div>
                </div>

                {/* modules */}
                <div className="col-span-1 row-span-1 sm:col-span-2 sm:row-span-2 sm:row-start-3 shadow-sm shadow-[#ADADAD40] p-4 gap-4 rounded-b-md w-full h-full overflow-auto">
                    <h1 className='font-semibold text-lg sm:text-xl'>Modules</h1>

                    <div className='grid grid-cols-2  py-4 gap-y-4'>
                        <p className="text-[#737373] text-sm sm:text-base">Number of floor</p>
                        <Progressbar value={2} total={5} barColor='bg-[#346751]' bgColor='bg-[#D6E1DC]'/>
                    </div>

                    <div className='grid grid-cols-2  py-4 gap-y-4'>
                        <p className="text-[#737373] text-sm sm:text-base">Number of staff</p>
                        <Progressbar value={3} total={10} barColor='bg-[#FF9F29]' bgColor='bg-[#FFECD4]'/>
                    </div>

                    <div className='grid grid-cols-2  py-4 gap-y-4'>
                        <p className="text-[#737373] text-sm sm:text-base">Number of table</p>
                        <Progressbar value={7} total={15} barColor='bg-[#5E85FF]' bgColor='bg-[#D9E0F6]'/>
                    </div>

                    <div className='grid grid-cols-2  py-4 gap-y-4'>
                        <p className="text-[#737373] text-sm sm:text-base">Number of booking</p>
                        <Progressbar value={2} total={20} barColor='bg-[#FF2D55]' bgColor='bg-[#FAE5E9]'/>
                    </div>

                </div>
            </div>
    )
}

export default Subscription