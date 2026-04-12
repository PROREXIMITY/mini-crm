/**
 * FilterBar Component
 *
 * Filter tabs for contacts list
 * All | Has Email | Has Phone | Company Exists
 */
const FILTER_OPTIONS = [
    { value: 'all', label: 'All', icon: '📊' },
    { value: 'hasEmail', label: 'Has Email', icon: '📧' },
    { value: 'hasPhone', label: 'Has Phone', icon: '☎️' },
    { value: 'hasCompany', label: 'Company', icon: '🏢' },
];

export default function FilterBar({ activeFilter, onFilterChange }) {
    return (
        <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => onFilterChange(filter.value)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                        activeFilter === filter.value
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    <span>{filter.icon}</span>
                    <span>{filter.label}</span>
                </button>
            ))}
        </div>
    );
}
