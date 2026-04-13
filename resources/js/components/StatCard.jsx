/**
 * StatCard Component
 *
 * Clean SaaS-style stat card for dashboard
 * Accepts Phosphor icon components
 */
export default function StatCard({ icon: Icon, label, value, trend, color = 'indigo' }) {
    const colorClasses = {
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
        green: 'bg-green-50 text-green-600 border-green-200',
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200',
        orange: 'bg-orange-50 text-orange-600 border-orange-200',
    };

    return (
        <div
            className={`rounded-lg border ${colorClasses[color]} p-6 transition hover:shadow-md`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="mb-1 text-sm font-medium text-gray-600">
                        {label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    {trend && (
                        <p className="mt-2 text-xs text-gray-500">{trend}</p>
                    )}
                </div>
                {Icon && (
                    <div className="text-right">
                        <Icon size={32} weight="duotone" />
                    </div>
                )}
            </div>
        </div>
    );
}
