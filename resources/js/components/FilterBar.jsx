/**
 * FilterBar Component
 *
 * Filter tabs for contacts list
 * All | Has Email | Has Phone | Company Exists
 */
import { ChartBar, EnvelopeOpen, Phone, Buildings } from '@phosphor-icons/react';

const FILTER_OPTIONS = [
    { value: 'all', label: 'All', Icon: ChartBar },
    { value: 'hasEmail', label: 'Has Email', Icon: EnvelopeOpen },
    { value: 'hasPhone', label: 'Has Phone', Icon: Phone },
    { value: 'hasCompany', label: 'Company', Icon: Buildings },
];

export default function FilterBar({ activeFilter, onFilterChange }) {
    return (
        <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => onFilterChange(filter.value)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 ${
                        activeFilter === filter.value
                            ? 'bg-indigo-600 text-white shadow-md scale-105'
                            : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:scale-105'
                    }`}
                >
                    <filter.Icon size={18} weight="duotone" />
                    <span>{filter.label}</span>
                </button>
            ))}
        </div>
    );
}
