import { Toaster, toast as hotToast } from 'react-hot-toast';

/**
 * Toast Provider Component
 * Add this to your app.jsx to enable toast notifications globally
 */
export function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#fff',
                    color: '#000',
                    fontSize: '14px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #e5e7eb',
                },
                success: {
                    style: {
                        background: '#ecfdf5',
                        color: '#065f46',
                        border: '1px solid #86efac',
                    },
                    iconTheme: {
                        primary: '#10b981',
                        secondary: '#ecfdf5',
                    },
                },
                error: {
                    style: {
                        background: '#fef2f2',
                        color: '#991b1b',
                        border: '1px solid #fecaca',
                    },
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fef2f2',
                    },
                },
            }}
        />
    );
}

/**
 * Toast utility functions
 * Use these in your components
 */
export const toast = {
    success: (message) => hotToast.success(message),
    error: (message) => hotToast.error(message),
    loading: (message) => hotToast.loading(message),
    dismiss: hotToast.dismiss,
};
