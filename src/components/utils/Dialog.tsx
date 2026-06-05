import type { ReactNode } from "react";
import { DialogPanel, DialogTitle, Dialog as HeadlessDialog } from "@headlessui/react"

export interface DialogInputProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode
}

function Dialog({ isOpen, onClose, title, children }: DialogInputProps) {
    return (
        <HeadlessDialog open={isOpen} onClose={onClose} className="relative z-50">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

            {/* Dialog Container */}
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="w-96 rounded-lg bg-white shadow-lg">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 cursor-pointer hover:text-gray-700 font-bold text-xl"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 max-h-100 overflow-auto">{children}</div>
                </DialogPanel>
            </div>
        </HeadlessDialog>
    )
}

export default Dialog;
