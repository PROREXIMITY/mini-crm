/**
 * Activity Filters Component
 *
 * Filter buttons for activity type
 * All | Notes | Calls | Emails | Meetings
 */
const FILTER_OPTIONS = [
    { value: 'all', label: 'All', icon: '📊' },
    { value: 'note', label: 'Notes', icon: '📝' },
    { value: 'call', label: 'Calls', icon: '☎️' },
    { value: 'email', label: 'Emails', icon: '📧' },
    { value: 'meeting', label: 'Meetings', icon: '📅' },
];

export default function ActivityFilters({ activeFilter, onFilterChange }) {
    return (
        <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => onFilterChange(filter.value)}
                    className={`inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                        activeFilter === filter.value
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'border border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                >
                    <span>{filter.icon}</span>
                    <span>{filter.label}</span>
                </button>
            ))}
        </div>
    );
}
