/**
 * Activity Summary Component
 *
 * Displays count stats for each activity type
 * Shows: Notes | Calls | Emails | Meetings
 */
export default function ActivitySummary({ activities }) {
    // Flatten all activities from groups
    const allActivities = Object.values(activities).flat();

    // Count by type
    const counts = {
        note: allActivities.filter((a) => a.type === 'note').length,
        call: allActivities.filter((a) => a.type === 'call').length,
        email: allActivities.filter((a) => a.type === 'email').length,
        meeting: allActivities.filter((a) => a.type === 'meeting').length,
    };

    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

    return (
        <div className="rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Total */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">
                        Total:
                    </span>
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
                        {total}
                    </span>
                </div>

                {/* Breakdown */}
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">📝</span>
                        <span className="text-xs font-medium text-gray-600">
                            Notes:{' '}
                            <span className="font-bold text-gray-900">
                                {counts.note}
                            </span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-lg">☎️</span>
                        <span className="text-xs font-medium text-gray-600">
                            Calls:{' '}
                            <span className="font-bold text-gray-900">
                                {counts.call}
                            </span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-lg">📧</span>
                        <span className="text-xs font-medium text-gray-600">
                            Emails:{' '}
                            <span className="font-bold text-gray-900">
                                {counts.email}
                            </span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-lg">📅</span>
                        <span className="text-xs font-medium text-gray-600">
                            Meetings:{' '}
                            <span className="font-bold text-gray-900">
                                {counts.meeting}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
