import { useEffect } from "react"
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import useGetStaffById from "../../queries/staff/useGetStaffById";
import { useUpdateStaff } from "../../queries/staff/useUpdateStaff";

export interface EditStaffFormData {
    name: string;
    email: string;
    phone_number: string;
    role: string;

    temporary_address: {
        label: string;
        country: string;
        city: string;
        street: string;
    };

    permanent_address: {
        label: string;
        country: string;
        city: string;
        street: string;
    };
}


type ModalProps = {
    staffId: string;
    onClose: () => void;
}

const EditStaff = ({ staffId, onClose }: ModalProps) => {
    const { data: staffDetails, isLoading } = useGetStaffById(staffId);
    const updateStaffMutation = useUpdateStaff();

    const {
        register,
        reset,
        handleSubmit,
    } = useForm<EditStaffFormData>();

    useEffect(() => {
        if (staffDetails) {
            reset({
                name: staffDetails.name,
                email: staffDetails.email,
                phone_number: staffDetails.phone_number,
                role: staffDetails.role,

                temporary_address: {
                    label: "TEMPORARY",
                    country: staffDetails.addresses[1]?.country ?? "",
                    city: staffDetails.addresses[1]?.city ?? "",
                    street: staffDetails.addresses[1]?.street ?? "",
                },

                permanent_address: {
                    label: "PERMANENT",
                    country: staffDetails.addresses[0]?.country ?? "",
                    city: staffDetails.addresses[0]?.city ?? "",
                    street: staffDetails.addresses[0]?.street ?? "",
                },
            });
        }
    }, [staffDetails, reset]);

    const onSubmit = async (formData: EditStaffFormData) => {
        console.log(formData);
        updateStaffMutation.mutate({
            id: staffId,
            data: formData
        })
        onClose();
    }

    const handleCancel = () => {
        reset();
        onClose();
    }

    if (isLoading) return <div className="p-6">Loading...</div>

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="bg-[#EBF0EE] shadow-lg w-full max-w-3xl rounded-lg max-h-[90vh] overflow-y-auto">

            {/* header */}
            <div className="flex justify-between items-center bg-[#D6E1DC] w-full px-4 py-3 rounded-t-md">
                <h1 className="text-lg font-semibold">Edit Staff</h1>
                <IoClose
                    className="cursor-pointer text-xl" onClick={handleCancel} />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 px-6 py-4">

                {/* name, email, number, role */}
                <div className="rounded-lg bg-[#FEFDF9] p-4">
                    <h2 className="text-md font-semibold mb-2">Personal Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* name */}
                    <div className="flex flex-col">
                        <label className="font-sm">Full Name</label>
                        <input
                            {...register("name", { required: true })}
                            className="w-full p-2 border border-[#C4C4C4] rounded-lg  bg-[#FCF8EE]"
                        />
                    </div>
                    {/* phone number */}
                    <div>
                        <label className="font-sm">Phone Number</label>
                        <input
                            {...register("phone_number", { required: true })}
                            className="w-full p-2 border border-[#C4C4C4] rounded-lg bg-[#FCF8EE]"
                        />
                    </div>
                    {/* email */}
                    <div>
                        <label className="font-sm">Email</label>
                        <input
                            {...register("email", { required: true })}
                            className="w-full p-2 border border-[#C4C4C4] rounded-lg bg-[#C4C4C4]"
                            disabled
                        />
                    </div>
                    {/* role */}
                    <div>
                        <label className="font-sm">Role</label>
                        <select {...register("role")} className="w-full p-2 border border-[#C4C4C4] rounded-lg bg-[#FCF8EE]">
                            <option value="ADMIN">Admin</option>
                            <option value="STAFF">Staff</option>
                            <option value="MANAGER">Manager</option>
                        </select>
                    </div>
                    </div>
                </div>

                {/* temporary address */}
                <div className="rounded-lg bg-[#FEFDF9] p-4">
                    <h2 className="text-md font-semibold mb-2">Temporary Address</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="font-sm">Country</label>
                            <input
                                {...register("temporary_address.country")}
                                className="w-full p-2 border border-[#C4C4C4] rounded-lg bg-[#FCF8EE]"
                            />
                        </div>

                        <div>
                            <label className="font-sm">City</label>
                            <input
                                {...register("temporary_address.city")}
                                className="w-full p-2 border border-[#C4C4C4] rounded-lg bg-[#FCF8EE]"
                            />
                        </div>

                        <div>
                            <label className="font-sm">Street</label>
                            <input
                                {...register("temporary_address.street")}
                                className="w-full p-2 border border-[#C4C4C4] rounded-lg bg-[#FCF8EE]"
                            />
                        </div>
                    </div>
                </div>

                {/* permanent address */}
                <div className="rounded-lg bg-[#FEFDF9] p-4">
                    <h2 className="text-md font-semibold mb-2">Permanent Address</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="font-sm">Country</label>
                            <input
                                {...register("permanent_address.country")}
                                className="w-full p-2 border border-[#C4C4C4] rounded-lg bg-[#FCF8EE]"
                            />
                        </div>

                        <div>
                            <label className="font-sm">City</label>
                            <input
                                {...register("permanent_address.city")}
                                className="w-full p-2 border border-[#C4C4C4] rounded-lg bg-[#FCF8EE]"
                            />
                        </div>

                        <div>
                            <label className="font-sm">Street</label>
                            <input
                                {...register("permanent_address.street")}
                                className="w-full p-2 border border-[#C4C4C4] rounded-lg bg-[#FCF8EE]"
                            />
                        </div>
                    </div>
                </div>

                <hr className="w-full text-[#C4C4C4]"></hr>

                {/* buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="border border-gray-400 px-8 py-2 rounded-3xl text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-[linear-gradient(180deg,#284E3E_0%,#3D7A60_100%)] text-white px-8 py-2 rounded-3xl text-sm"
                    >
                        {updateStaffMutation.isPending ? "Saving.." : "Save"}
                    </button>

                </div>
            </form>
            </div>
        </div>
    )
}
export default EditStaff