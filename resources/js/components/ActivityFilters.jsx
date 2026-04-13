/**
 * Activity Filters Component
 *
 * Filter buttons for activity type
 * All | Notes | Calls | Emails | Meetings
 */
import { ChartBar, FileText, Phone, EnvelopeOpen, CalendarBlank } from '@phosphor-icons/react';

const FILTER_OPTIONS = [
    { value: 'all', label: 'All', Icon: ChartBar },
    { value: 'note', label: 'Notes', Icon: FileText },
    { value: 'call', label: 'Calls', Icon: Phone },
    { value: 'email', label: 'Emails', Icon: EnvelopeOpen },
    { value: 'meeting', label: 'Meetings', Icon: CalendarBlank },
];

export default function ActivityFilters({ activeFilter, onFilterChange }) {
    return (
        <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => onFilterChange(filter.value)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 ${
                        activeFilter === filter.value
                            ? 'bg-blue-600 text-white shadow-md scale-105'
                            : 'border border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50 hover:scale-105'
                    }`}
                >
                    <filter.Icon size={18} weight="duotone" />
                    <span>{filter.label}</span>
                </button>
            ))}
        </div>
    );
}
