/**
 * EmptyState Component
 *
 * Reusable SaaS-style empty state with icon, message, CTA
 * Usage: <EmptyState icon="📭" title="No results found" subtitle="Try adjusting your filters" action={{label: "Clear Filters", onClick: ...}} />
 */
export default function EmptyState({
    icon,
    title,
    subtitle,
    action,
    secondaryText,
}) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-16 px-6 text-center">
            {/* Icon */}
            {icon && <div className="mb-4 text-5xl">{icon}</div>}

            {/* Title */}
            <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>

            {/* Subtitle */}
            {subtitle && (
                <p className="mb-6 text-sm text-gray-600">{subtitle}</p>
            )}

            {/* Primary Action */}
            {action && (
                <button
                    onClick={action.onClick}
                    className="mb-4 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
                >
                    {action.label}
                </button>
            )}

            {/* Secondary Text */}
            {secondaryText && (
                <p className="text-xs text-gray-500">{secondaryText}</p>
            )}
        </div>
    );
}
