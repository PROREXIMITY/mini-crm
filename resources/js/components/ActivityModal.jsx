import { useEffect, useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import Modal from './Modal';
import ActivityTimeline from './ActivityTimeline';

const ACTIVITY_TYPES = [
    { value: 'note', label: '📝 Note', icon: '📝' },
    { value: 'call', label: '☎️ Call', icon: '☎️' },
    { value: 'email', label: '📧 Email', icon: '📧' },
    { value: 'meeting', label: '📅 Meeting', icon: '📅' },
];

/**
 * ActivityModal Component
 *
 * Handles viewing, adding, and deleting activities for a specific contact
 * Displays timeline grouped by date with optimistic UI updates
 */
export default function ActivityModal({
    isOpen,
    onClose,
    contact,
    activities = {},
}) {
    const { data, setData, post, processing, reset, errors } = useForm({
        type: 'note',
        content: '',
    });

    const [localActivities, setLocalActivities] = useState(activities);
    const [isLoadingActivities, setIsLoadingActivities] = useState(false);

    // Update activities when modal opens or contact changes
    useEffect(() => {
        if (isOpen && contact?.id) {
            fetchActivities();
        }
    }, [isOpen, contact?.id]);

    // Fetch activities from API
    const fetchActivities = async () => {
        setIsLoadingActivities(true);
        try {
            const response = await fetch(`/contacts/${contact.id}/activities`);
            const data = await response.json();
            setLocalActivities(data.activities || {});
        } catch (error) {
            console.error('Failed to load activities:', error);
        } finally {
            setIsLoadingActivities(false);
        }
    };

    // Submit a new activity
    const submitActivity = (e) => {
        e.preventDefault();
        if (!data.content.trim()) return;

        // Optimistic UI update
        const optimisticActivity = {
            id: -Date.now(), // Temporary ID
            type: data.type,
            content: data.content,
            user: { name: 'You' },
            created_at: new Date().toISOString(),
        };

        // Add to local state immediately
        setLocalActivities((prev) => {
            const updated = { ...prev };
            const today = 'Today';
            if (!updated[today]) {
                updated[today] = [];
            }
            updated[today] = [optimisticActivity, ...(updated[today] || [])];
            return updated;
        });

        post(`/contacts/${contact.id}/activities`, {
            preserveScroll: true,
            onSuccess: (page) => {
                reset();
                // Refresh activities to get real ID from server
                fetchActivities();
            },
            onError: () => {
                // Remove optimistic activity on error
                setLocalActivities((prev) => {
                    const updated = { ...prev };
                    const today = 'Today';
                    if (updated[today]) {
                        updated[today] = updated[today].filter(
                            (a) => a.id !== optimisticActivity.id,
                        );
                        if (updated[today].length === 0) {
                            delete updated[today];
                        }
                    }
                    return updated;
                });
                alert('Failed to save activity. Please try again.');
            },
        });
    };

    const handleDeleteActivity = (activityId) => {
        setLocalActivities((prev) => {
            const updated = {};

            Object.entries(prev).forEach(([group, activities]) => {
                const filtered = activities.filter((a) => a.id !== activityId);

                if (filtered.length > 0) {
                    updated[group] = filtered;
                }
            });

            return updated;
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Activity Timeline: ${contact?.first_name} ${contact?.last_name}`}
            size="lg"
            closeOnOverlayClick={!processing}
        >
            <div className="space-y-6">
                {/* Add Activity Form */}
                <form
                    onSubmit={submitActivity}
                    className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
                >
                    <h3 className="font-semibold text-gray-900">
                        Add Activity
                    </h3>

                    {/* Activity Type Selector */}
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {ACTIVITY_TYPES.map((type) => (
                            <button
                                key={type.value}
                                type="button"
                                onClick={() => setData('type', type.value)}
                                className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition ${
                                    data.type === type.value
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <span className="mr-1">{type.icon}</span>
                                <span className="hidden sm:inline">
                                    {type.label.split(' ')[1]}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Content Textarea */}
                    <div>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            placeholder={`Write your ${data.type}...`}
                            className={`block w-full rounded-lg border px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                                errors.content
                                    ? 'border-red-300'
                                    : 'border-gray-300'
                            }`}
                            rows={3}
                            disabled={processing}
                        />
                        {errors.content && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.content}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing || !data.content.trim()}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Saving...
                            </span>
                        ) : (
                            'Add Activity'
                        )}
                    </button>
                </form>

                {/* Activities Timeline */}
                <div>
                    <h3 className="mb-4 font-semibold text-gray-900">
                        Timeline
                    </h3>
                    <div className="max-h-96 overflow-y-auto">
                        <ActivityTimeline
                            activities={localActivities}
                            isLoading={isLoadingActivities}
                            onDelete={handleDeleteActivity}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}
