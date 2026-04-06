import { useEffect, useRef } from 'react';
export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    closeOnOverlayClick = true,
}) {
    const modalRef = useRef(null);
    const previousActiveElement = useRef(null);

    // Focus trap: keep focus within modal when open
    useEffect(() => {
        if (isOpen) {
            previousActiveElement.current = document.activeElement;
            // Focus the modal container
            setTimeout(() => {
                modalRef.current?.focus();
            }, 0);

            // Prevent body scroll when modal is open
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';

            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    // Handle ESC key to close modal
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    // Restore focus when modal closes
    useEffect(() => {
        return () => {
            if (!isOpen && previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Size classes mapping
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
    };

    const handleOverlayClick = (e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            {/* Overlay/Shadow Background */}
            <div
                className="fixed inset-0 z-40 bg-black/20 transition-opacity duration-200"
                onClick={handleOverlayClick}
                aria-hidden="true"
            />

            {/* Modal Container */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                role="presentation"
            >
                <div
                    ref={modalRef}
                    tabIndex={-1}
                    className={`w-full ${sizeClasses[size]} rounded-lg bg-white shadow-2xl transition-all duration-200 focus:outline-none`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <h2
                            id="modal-title"
                            className="text-lg font-bold text-gray-900"
                        >
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 transition-colors hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                            aria-label="Close modal"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="overflow-y-auto px-6 py-4 max-h-[calc(100vh-200px)]">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
