import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

/**
 * Global Loading Overlay Component
 *
 * Displays a smooth loading indicator when navigating between pages.
 * Integrates with Inertia router events (start/finish).
 */
export default function LoadingOverlay() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = router.on('start', () => {
            setTimeout(() => setLoading(true), 150); // Delay to avoid flicker
        });

        const finish = router.on('finish', () => {
            setLoading(false);
        });

        return () => {
            start();   // unsubscribe
            finish();  // unsubscribe
        };
    }, []);

    if (!loading) { return null; }

    return (
        <div className="fixed inset-0 z-9999 pointer-events-none">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm animate-fade-in" />

            {/* Loading Content */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                <div className="animate-fade-in">
                    {/* Spinner */}
                    <div className="flex justify-center">
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 border-r-indigo-600 animate-spin"></div>
                        </div>
                    </div>

                    {/* Loading text */}
                    <p className="mt-4 text-sm font-medium text-gray-700 text-center">
                        Loading...
                    </p>
                </div>
            </div>
        </div>
    );
}
