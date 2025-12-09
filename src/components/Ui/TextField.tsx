import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
    label: string;
    id?:string;
    type?: 'text' | 'email' | 'password';
    error?: string;
    placeholder?: string;
    bg?:string;
    registration:UseFormRegisterReturn;
}

const Textfield = ({ label,id, type, error, placeholder, registration,bg}: Props) => {
    return (<div className='flex flex-col space-y-2'>
        <label htmlFor={id} className='text-[#565656]'>
            {label}
        </label>
        <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`border border-[#C4C4C4] rounded-md px-3 py-2 ${bg ? `bg-[${bg}]` : ''}`}
        {...registration}/>
        {error && (
            <span className='text-red-500 text-sm'>{error}</span>
        )}
    </div>
    )
}

export default Textfield