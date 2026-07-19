import { X, Check } from "lucide-react";

interface DeleteEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteEmployeeModal = ({ isOpen, onClose, onConfirm }: DeleteEmployeeModalProps) => {
    if (!isOpen) return null;
    return (
        <div className="h-screen w-full bg-gray-500/50 absolute top-0 left-0 right-0 z-50">
            <div className="bg-white border border-gray-200 rounded-lg max-w-md mx-auto my-16
            opacity-100">
                <div className="py-2 px-4">
                    <div className="flex items-center justify-between">
                        <h6 className="font-sans font-semibold">Xóa nhân viên</h6>
                        <span className="cursor-pointer rounded-full p-1 hover:text-red-500"
                        onClick={() => onClose()}>
                            <X/></span>
                    </div>

                    <p className="font-sans text-center py-4 font-normal text-black">
                        Bạn chắc chắn muốn xóa nhân viên</p>

                    <div className="w-full flex justify-center pb-2">
                        <button className="">
                            <span className="flex items-center gap-2 font-sans rounded-lg
                            bg-emerald-300 px-2 py-1 text-black font-semibold
                            hover:bg-emerald-500 hover:text-gray-300 transition-all
                            duration-200 cursor-pointer"
                            onClick={() => onConfirm()}>
                                <Check/> Xác nhận</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteEmployeeModal;