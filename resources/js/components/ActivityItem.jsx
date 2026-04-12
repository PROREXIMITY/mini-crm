import { useState } from 'react';
import { router } from '@inertiajs/react';
import { formatDistanceToNow, format } from 'date-fns';

const ACTIVITY_ICONS = {
    note: '📝',
    call: '☎️',
    email: '📧',
    meeting: '📅',
};

const ACTIVITY_LABELS = {
    note: 'Note',
    call: 'Call',
    email: 'Email',
    meeting: 'Meeting',
};

const ACTIVITY_COLORS = {
    note: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        icon: 'bg-blue-100 text-blue-600',
        hover: 'hover:bg-blue-100',
    },
    call: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700',
        icon: 'bg-green-100 text-green-600',
        hover: 'hover:bg-green-100',
    },
    email: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-700',
        icon: 'bg-purple-100 text-purple-600',
        hover: 'hover:bg-purple-100',
    },
    meeting: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-700',
        icon: 'bg-orange-100 text-orange-600',
        hover: 'hover:bg-orange-100',
    },
};

export default function ActivityItem({ activity, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this activity?')) return;

        setIsDeleting(true);
        router.delete(`/activities/${activity.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                onDelete(activity.id);
                setIsDeleting(false);
            },
            onError: () => {
                setIsDeleting(false);
                alert('Failed to delete activity');
            },
        });
    };

    const type = activity.type || 'note';
    const colors = ACTIVITY_COLORS[type] || ACTIVITY_COLORS.note;
    const icon = ACTIVITY_ICONS[type] || ACTIVITY_ICONS.note;
    const label = ACTIVITY_LABELS[type] || ACTIVITY_LABELS.note;

    // Relative time
    const relativeTime = formatDistanceToNow(new Date(activity.created_at), {
        addSuffix: true,
    });

    // Exact time for tooltip
    const exactTime = format(
        new Date(activity.created_at),
        'MMM d, yyyy h:mm a'
    );

    return (
        <div
            className={`group flex gap-4 rounded-lg border ${colors.bg} ${colors.border} transition animate-fade-in hover:shadow-md`}
        >
            {/* Circular Icon with Background */}
            <div className={`flex flex-none items-center justify-center rounded-full p-3 text-xl ${colors.icon} m-2`}>
                {icon}
            </div>

            {/* Content */}
            <div className="flex-1 py-4 pr-3">
                <div className="mb-2 flex items-center gap-2">
                    <span className={`inline-block rounded-full ${colors.icon} px-2 py-0.5 text-xs font-semibold`}>
                        {label}
                    </span>
                    <span
                        className={`text-xs font-medium ${colors.text} opacity-80`}
                        title={exactTime}
                    >
                        {relativeTime}
                    </span>
                </div>

                <p className="text-sm leading-relaxed text-gray-800">
                    {activity.content}
                </p>

                {activity.user && (
                    <p className="mt-2 text-xs text-gray-500">
                        by <span className="font-medium">{activity.user.name}</span>
                    </p>
                )}
            </div>

            {/* Delete Button */}
            <div className="flex flex-none items-center px-3">
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                    title="Delete activity"
                >
                    {isDeleting ? (
                        <svg
                            className="h-5 w-5 animate-spin text-gray-400"
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
                    ) : (
                        <svg
                            className="h-5 w-5 text-gray-400 transition hover:text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
