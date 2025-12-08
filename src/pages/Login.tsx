
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../queries/useLogin';
import { toast } from 'react-toastify';

const Login = () => {

    const navigate=useNavigate();
    const {mutate, isPending}= useLogin();
    const {setAuthData} =useAuth();

    interface FormData {
        email: string;
        password: string;
        facility_code: string;
        rememberMe: boolean;
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit:
    SubmitHandler<FormData>= async(data)=>{
        try{
            console.log("SubmitHandler data:",data);
            mutate(data,{
                onError:(error)=>{
                    console.log("err-mssg",error.message);
                    console.log("errname",error.name);
                    toast.error('Login failed');
            },
                onSuccess:(res)=>{
                    setAuthData(res.data.access_token);
                    toast.success("Login Successful");
                    navigate("/dashboard");
                },
        })}
        catch(err){
            console.error('Login failed',err);
            toast.error('Login failed');
        }
    }

    return (
            <div className='[background:linear-gradient(136.57deg,#284E3E_-12.69%,#3D7A60_32.7%)] grid grid-cols-1 md:grid-cols-2 w-full md:w-screen h-screen md:overflow-y-hidden
'>

                {/* Left Container */}
                <div className='flex flex-col items-center justify-between p-4 md:p-10 h-auto w-full'>
                    <div></div>
                    <img src='src\assets\images\login.png' alt='login-image'
                        className='w-full max-w-md h-auto'/>
                    <p className='mt-4 font-[SF Pro Display, sans-serif] font-normal text-base leading-none tracking-normal text-center' >FoodVerse<sup className='text-xs align-super'>TM</sup></p>
                </div>


                {/* Right Container */}
                <div className='bg-[#FFFEFC] text-black flex items-center justify-center p-4 sm:p-8 rounded-2xl'>
                    <form className='w-full p-10 sm:p-12  flex flex-col space-y-6' onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='font-[SF Pro Display, sans-serif] font-semibold text-[32px] sm:text-[28px] xs:text-[24px] leading-[100%] tracking-[-1%]'>Facility Login</h1>
                        <h2 className='text-[#737373] text-sm sm:text-xs'>Login to access your facility details, track reservations, and keep growing every day.</h2>

                        <div className='flex flex-col space-y-2'>
                            <label htmlFor='email'
                            className='text-[#565656]'
                            >Email address</label>
                            <input
                                id='email'
                                type='email'
                                placeholder='Enter your email address'
                                {...register("email", { required: 'Email is required' })}
                                className='border border-[#C4C4C4] rounded-md px-3 py-2' />
                            {errors.email && (
                                <span className='text-red-500 text-sm'>{errors.email.message}</span>
                            )}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label htmlFor='facility_code'
                            className='text-[#565656]'
                            >Facility Code</label>
                            <input
                                id='facility_code'
                                type='text'
                                placeholder='Enter your facility code'
                                {...register("facility_code", { required: 'Facility Code is required' })}
                                className='border border-[#C4C4C4] rounded-md px-3 py-2' />
                            {errors.facility_code && (
                                <span className='text-red-500 text-sm'>{errors.facility_code.message}</span>
                            )}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label htmlFor='password'
                            className='text-[#565656]'
                            >Password</label>
                            <input
                                id='password'
                                type='password'
                                placeholder='Enter your password'
                                {...register("password", { required: 'Password is required' })}
                                className='border border-[#C4C4C4] rounded-md px-3 py-2' />
                            {errors.password && (
                                <span className='text-red-500 text-sm'>{errors.password.message}</span>
                            )}
                        </div>

                        <div className='flex items-center justify-between'>
                            <div className="flex items-center space-x-2">
                                <input type='checkbox'
                                    className='accent-white'
                                    id='rememberMe'
                                    {...register("rememberMe")}
                                /><label htmlFor='rememberme' className='select-none'> Remember me</label>
                            </div>


                            <p className='text-sm text-green-600 cursor-pointer'>Forgot Password?</p>
                        </div>

                        <button type='submit' className='bg-[#346751] text-white py-2 px-4 rounded hover:bg-[#2B5444] transition-colors duration-300' disabled={isPending}>{isPending?"Logging in..":"Login"}</button>

                        {/* {isError && <p>{error as any}?.response.data?.message</p>} */}
                    </form>
                </div>
            </div>
    )
}

export default Login