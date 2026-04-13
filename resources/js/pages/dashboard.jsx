import { Head, Link, router } from '@inertiajs/react';
import {
    Users,
    EnvelopeOpen,
    Phone,
    CalendarBlank,
    ChartBar,
    Lightning,
    ClockCounterClockwise,
    BookmarkSimple,
    Buildings,
} from '@phosphor-icons/react';
import AppLayout from '@/layouts/app-layout';
import StatCard from '@/components/StatCard';

export default function Dashboard({
    auth,
    stats = {},
    todayStats = {},
    recentActivities = [],
    favoriteContacts = [],
}) {
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
            <div className="min-h-[calc(100vh-4rem)] w-full bg-white">
                <div className="min-h-screen space-y-8 bg-gray-50 px-5 py-8 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                Dashboard
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Welcome back,{' '}
                                <span className="font-semibold text-gray-900">
                                    {auth.user.name}
                                </span>
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <CalendarBlank size={24} weight="duotone" className="text-indigo-600" />
                            <div className="text-right">
                                <p className="text-xs tracking-wide text-gray-500 uppercase">
                                    Today
                                </p>
                                <p className="text-sm font-semibold text-gray-900">
                                    {todayDate}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                        <StatCard
                            icon={Users}
                            label="Total Contacts"
                            value={stats?.totalContacts ?? 0}
                            color="indigo"
                        />

                        <StatCard
                            icon={EnvelopeOpen}
                            label="Total Emails"
                            value={stats?.totalEmails ?? 0}
                            color="blue"
                        />

                        <StatCard
                            icon={Phone}
                            label="Total Calls"
                            value={stats?.totalCalls ?? 0}
                            color="green"
                        />

                        <StatCard
                            icon={CalendarBlank}
                            label="Total Meetings"
                            value={stats?.totalMeetings ?? 0}
                            color="orange"
                        />
                    </div>

                    {/* Today Overview Section */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
                        <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-gray-900">
                            <span className="text-xl">📊</span>
                            Today Overview
                        </h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Today Overview Items */}
                            <div className="group rounded-lg border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 transition-all duration-200 hover:border-indigo-200 hover:shadow-sm">
                                <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
                                    New Contacts
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {todayStats?.newContacts ?? 0}
                                </p>
                                <p className="mt-2 text-xs text-gray-400">
                                    Added today
                                </p>
                            </div>

                            <div className="group rounded-lg border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 transition-all duration-200 hover:border-blue-200 hover:shadow-sm">
                                <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
                                    Emails Sent
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {todayStats?.emailsSent ?? 0}
                                </p>
                                <p className="mt-2 text-xs text-gray-400">
                                    This session
                                </p>
                            </div>

                            <div className="group rounded-lg border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 transition-all duration-200 hover:border-green-200 hover:shadow-sm">
                                <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
                                    Calls Made
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {todayStats?.callsMade ?? 0}
                                </p>
                                <p className="mt-2 text-xs text-gray-400">
                                    Today
                                </p>
                            </div>

                            <div className="group rounded-lg border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 transition-all duration-200 hover:border-orange-200 hover:shadow-sm">
                                <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
                                    Meetings
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {todayStats?.meetings ?? 0}
                                </p>
                                <p className="mt-2 text-xs text-gray-400">
                                    Scheduled
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Section */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-gray-900">
                            <span className="text-xl">⚡</span>
                            Quick Actions
                        </h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* View Contacts Card */}
                            <Link
                                href="/contacts"
                                prefetch
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
                                    <span className="text-xl text-indigo-600 transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </div>
                            </Link>

                            {/* Add Contact Card */}
                            <Link
                                href="/contacts?create=1"
                                prefetch
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
                                    <span className="text-xl text-green-600 transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Favorite Contacts Section */}
                    {favoriteContacts.length > 0 && (
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                                <span className="text-xl">⭐</span>
                                Favorite Contacts
                            </h2>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {favoriteContacts.map((contact) => (
                                    <div
                                        key={contact.id}
                                        onClick={() =>
                                            router.visit('/contacts', {
                                                data: {
                                                    openContact: contact.id,
                                                },
                                                preserveState: true,
                                            })
                                        }
                                        className="group cursor-pointer rounded-lg border border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100/30 p-4 transition hover:border-yellow-300 hover:shadow-md"
                                    >
                                        <div className="mb-2 flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {contact.first_name}{' '}
                                                    {contact.last_name}
                                                </p>
                                                {contact.company && (
                                                    <p className="text-sm text-gray-600">
                                                        🏢 {contact.company}
                                                    </p>
                                                )}
                                            </div>
                                            <span>⭐</span>
                                        </div>

                                        {contact.emails &&
                                            contact.emails.length > 0 && (
                                                <p className="text-xs text-gray-600">
                                                    📧 {contact.emails[0].email}
                                                </p>
                                            )}
                                        {contact.phones &&
                                            contact.phones.length > 0 && (
                                                <p className="text-xs text-gray-600">
                                                    ☎️ {contact.phones[0].phone}
                                                </p>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent Activity Feed */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                            <span className="text-xl">🕒</span>
                            Recent Activity
                        </h2>

                        {recentActivities.length > 0 ? (
                            <div className="space-y-3">
                                {recentActivities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-start justify-between border-b border-gray-100 pb-3 last:border-none"
                                    >
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                {activity.contact ? (
                                                    <Link
                                                        href={`/contacts`}
                                                        className="transition hover:text-indigo-600"
                                                    >
                                                        {
                                                            activity.contact
                                                                .first_name
                                                        }{' '}
                                                        {
                                                            activity.contact
                                                                .last_name
                                                        }
                                                    </Link>
                                                ) : (
                                                    'Unknown Contact'
                                                )}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {activity.type && (
                                                    <>
                                                        <span className="mr-2 inline-block">
                                                            {activity.type ===
                                                                'call' && '☎️'}
                                                            {activity.type ===
                                                                'email' && '📧'}
                                                            {activity.type ===
                                                                'meeting' &&
                                                                '📅'}
                                                            {activity.type ===
                                                                'note' && '📝'}
                                                        </span>
                                                        {activity.type
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            activity.type.slice(
                                                                1,
                                                            )}
                                                    </>
                                                )}
                                                {activity.description && (
                                                    <>
                                                        —{' '}
                                                        <span className="text-gray-600">
                                                            {activity.description.substring(
                                                                0,
                                                                40,
                                                            )}
                                                            {activity
                                                                .description
                                                                .length > 40
                                                                ? '...'
                                                                : ''}
                                                        </span>
                                                    </>
                                                )}
                                            </p>
                                        </div>

                                        <span className="ml-4 text-xs whitespace-nowrap text-gray-400">
                                            {new Date(
                                                activity.created_at,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No recent activity yet. Start by adding contacts
                                or notes!
                            </p>
                        )}
                    </div>

                    {/* Pro Tip Section */}
                    <div className="flex gap-4 rounded-xl border border-blue-200 bg-blue-50 p-5">
                        <span className="flex-shrink-0 text-2xl">💡</span>
                        <div>
                            <h3 className="mb-1 font-semibold text-blue-950">
                                Pro Tip
                            </h3>
                            <p className="text-sm leading-relaxed text-blue-800">
                                Use <span className="font-medium">search</span>{' '}
                                and <span className="font-medium">filters</span>{' '}
                                on the Contacts page to quickly find and manage
                                your relationships. Try searching by name or
                                filtering by email/phone availability.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
