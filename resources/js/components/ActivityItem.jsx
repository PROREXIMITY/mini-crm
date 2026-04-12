import { useState } from 'react';
import { router } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';

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
    note: 'bg-blue-50 border-blue-200 text-blue-700',
    call: 'bg-green-50 border-green-200 text-green-700',
    email: 'bg-purple-50 border-purple-200 text-purple-700',
    meeting: 'bg-orange-50 border-orange-200 text-orange-700',
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
    const colorClass = ACTIVITY_COLORS[type] || ACTIVITY_COLORS.note;
    const icon = ACTIVITY_ICONS[type] || ACTIVITY_ICONS.note;
    const label = ACTIVITY_LABELS[type] || ACTIVITY_LABELS.note;

    const timeString = new Date(activity.created_at).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className={`flex gap-4 rounded-lg border-l-4 ${colorClass} border-l-current animate-fade-in`}>
            {/* Icon */}
            <div className="flex items-start px-4 py-3 text-2xl">
                {icon}
            </div>

            {/* Content */}
            <div className="flex-1 py-3">
                <div className="mb-1 flex items-center gap-2">
                    <span className="inline-block rounded-full bg-white/60 px-2 py-1 text-xs font-medium">
                        {label}
                    </span>
                    <span className="text-xs font-medium opacity-70">
                        {timeString}
                    </span>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {activity.content}
                </p>
                {activity.user && (
                    <p className="mt-2 text-xs opacity-60">
                        by {activity.user.name}
                    </p>
                )}
            </div>

            {/* Delete Button */}
            <div className="px-4 py-3">
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                    title="Delete activity"
                >
                    {isDeleting ? (
                        <svg className="h-4 w-4 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg className="h-4 w-4 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
