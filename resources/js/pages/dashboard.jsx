import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import StatCard from '@/components/StatCard';

export default function Dashboard({ auth }) {
    // Calculate stats from contacts (passed via middleware if needed)
    // For now, we'll show placeholder stats
    const stats = {
        totalContacts: 0,
        totalEmails: 0,
        totalCalls: 0,
        totalMeetings: 0,
    };

    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-8 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Welcome back, {auth.user.name}. Here's your CRM overview.
                    </p>
                </div>

                {/* Stats Cards Grid */}
                <div className="grid gap-4 md:grid-cols-4">
                    <StatCard
                        icon="👥"
                        label="Total Contacts"
                        value="—"
                        color="indigo"
                    />
                    <StatCard
                        icon="📧"
                        label="Total Emails"
                        value="—"
                        color="blue"
                    />
                    <StatCard
                        icon="☎️"
                        label="Total Calls"
                        value="—"
                        color="green"
                    />
                    <StatCard
                        icon="📅"
                        label="Total Meetings"
                        value="—"
                        color="orange"
                    />
                </div>

                {/* Quick Links */}
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                        Quick Actions
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="/contacts"
                            className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2.5 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100"
                        >
                            👥 Go to Contacts
                        </a>
                        <a
                            href="/contacts/create"
                            className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2.5 text-sm font-medium text-green-600 transition hover:bg-green-100"
                        >
                            ➕ Add Contact
                        </a>
                    </div>
                </div>

                {/* Info Section */}
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h3 className="font-semibold text-blue-900">💡 Tip</h3>
                    <p className="mt-1 text-sm text-blue-800">
                        Use the search and filter features on the Contacts page
                        to quickly find and manage your relationships.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
