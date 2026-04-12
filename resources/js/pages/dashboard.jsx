import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import StatCard from '@/components/StatCard';

export default function Dashboard({ auth, stats = {} }) {
    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ];

    const todayDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {/* Main content wrapper with light background override */}
            <div className="bg-white min-h-[calc(100vh-4rem)] w-full">
                <div className="bg-gray-50 min-h-screen space-y-8 py-8 px-5 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                Dashboard
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Welcome back, <span className="font-semibold text-gray-900">{auth.user.name}</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="inline-block text-2xl">📅</span>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Today</p>
                                <p className="text-sm font-semibold text-gray-900">
                                    {todayDate}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards Grid */}
                    <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            icon="👥"
                            label="Total Contacts"
                            value={stats?.totalContacts ?? 0}
                            color="indigo"
                        />

                        <StatCard
                            icon="📧"
                            label="Total Emails"
                            value={stats?.totalEmails ?? 0}
                            color="blue"
                        />

                        <StatCard
                            icon="☎️"
                            label="Total Calls"
                            value={stats?.totalCalls ?? 0}
                            color="green"
                        />

                        <StatCard
                            icon="📅"
                            label="Total Meetings"
                            value={stats?.totalMeetings ?? 0}
                            color="orange"
                        />
                    </div>

                    {/* Today Overview Section */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <span className="text-xl">📊</span>
                            Today Overview
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Today Overview Items */}
                            <div className="group rounded-lg border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 hover:border-indigo-200 hover:shadow-sm transition-all duration-200">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    New Contacts
                                </p>
                                <p className="text-3xl font-bold text-gray-900">0</p>
                                <p className="mt-2 text-xs text-gray-400">
                                    Added today
                                </p>
                            </div>

                            <div className="group rounded-lg border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 hover:border-blue-200 hover:shadow-sm transition-all duration-200">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Emails Sent
                                </p>
                                <p className="text-3xl font-bold text-gray-900">0</p>
                                <p className="mt-2 text-xs text-gray-400">
                                    This session
                                </p>
                            </div>

                            <div className="group rounded-lg border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 hover:border-green-200 hover:shadow-sm transition-all duration-200">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Calls Made
                                </p>
                                <p className="text-3xl font-bold text-gray-900">0</p>
                                <p className="mt-2 text-xs text-gray-400">
                                    Today
                                </p>
                            </div>

                            <div className="group rounded-lg border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 hover:border-orange-200 hover:shadow-sm transition-all duration-200">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Meetings
                                </p>
                                <p className="text-3xl font-bold text-gray-900">0</p>
                                <p className="mt-2 text-xs text-gray-400">
                                    Scheduled
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Section */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <span className="text-xl">⚡</span>
                            Quick Actions
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* View Contacts Card */}
                            <a
                                href="/contacts"
                                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-5 transition-all duration-200 hover:border-indigo-300 hover:shadow-md"
                            >
                                <div className="relative z-10 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">👥</span>
                                        <div>
                                            <p className="font-semibold text-indigo-900">
                                                View Contacts
                                            </p>
                                            <p className="text-sm text-indigo-700">
                                                Manage all contacts
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xl text-indigo-600 group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </div>
                            </a>

                            {/* Add Contact Card */}
                            <a
                                href="/contacts/create"
                                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 to-green-100/50 p-5 transition-all duration-200 hover:border-green-300 hover:shadow-md"
                            >
                                <div className="relative z-10 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">➕</span>
                                        <div>
                                            <p className="font-semibold text-green-900">
                                                Add Contact
                                            </p>
                                            <p className="text-sm text-green-700">
                                                Create new contact
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xl text-green-600 group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Pro Tip Section */}
                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 flex gap-4">
                        <span className="text-2xl flex-shrink-0">💡</span>
                        <div>
                            <h3 className="font-semibold text-blue-950 mb-1">Pro Tip</h3>
                            <p className="text-sm text-blue-800 leading-relaxed">
                                Use <span className="font-medium">search</span> and <span className="font-medium">filters</span> on the Contacts page to quickly find and manage your relationships. Try searching by name or filtering by email/phone availability.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
