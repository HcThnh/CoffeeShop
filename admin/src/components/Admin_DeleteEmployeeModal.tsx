import { X, Check } from "lucide-react";

interface DeleteEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteEmployeeModal = ({ isOpen, onClose, onConfirm }: DeleteEmployeeModalProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-stone-100 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="p-6">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                        <h6 className="font-sans font-bold text-stone-800 text-lg">Xóa nhân viên</h6>
                        <button 
                            className="cursor-pointer rounded-xl p-1.5 hover:bg-stone-50 text-stone-400 hover:text-stone-600 transition-colors focus:outline-none"
                            onClick={() => onClose()}
                        >
                            <X className="w-5 h-5"/>
                        </button>
                    </div>

                    <p className="font-sans text-center py-6 text-stone-600 font-medium">
                        Bạn có chắc chắn muốn xóa nhân viên này không? Hành động này không thể hoàn tác.
                    </p>

                    <div className="w-full flex justify-end gap-3 pt-3 border-t border-stone-100">
                        <button 
                            className="flex items-center justify-center font-sans rounded-xl bg-stone-100 hover:bg-stone-200 px-4 py-2.5 text-stone-600 font-bold transition-all duration-200 focus:outline-none text-sm"
                            onClick={() => onClose()}
                        >
                            Hủy bỏ
                        </button>
                        <button 
                            className="flex items-center justify-center gap-1.5 font-sans rounded-xl bg-red-600 hover:bg-red-700 px-4 py-2.5 text-white font-bold shadow-md hover:shadow-lg hover:shadow-red-600/20 transition-all duration-200 focus:outline-none text-sm"
                            onClick={() => onConfirm()}
                        >
                            <Check className="w-4 h-4"/> Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteEmployeeModal;