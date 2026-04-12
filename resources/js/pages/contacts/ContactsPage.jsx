import { useState, useEffect, useMemo } from 'react';
import { router } from '@inertiajs/react';
import ContactFormModal from '../../components/ContactFormModal';
import ActivityModal from '../../components/ActivityModal';
import ContactHub from '../../components/ContactHub';
import SearchBar from '../../components/SearchBar';
import FilterBar from '../../components/FilterBar';
import EmptyState from '../../components/EmptyState';
import QuickActionMenu from '../../components/QuickActionMenu';

export default function ContactsPage({ contacts }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [activityModalOpen, setActivityModalOpen] = useState(false);
    const [selectedContactForActivity, setSelectedContactForActivity] =
        useState(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [hubOpen, setHubOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    // Apply search and filters
    const filteredContacts = useMemo(() => {
        let result = contacts;

        // Filter by type
        if (filter === 'hasEmail') {
            result = result.filter(
                (c) => c.emails && c.emails.length > 0
            );
        } else if (filter === 'hasPhone') {
            result = result.filter(
                (c) => c.phones && c.phones.length > 0
            );
        } else if (filter === 'hasCompany') {
            result = result.filter((c) => c.company && c.company.trim());
        }

        // Search filter (name, email, phone, company)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter((c) => {
                const name =
                    `${c.first_name} ${c.last_name}`.toLowerCase();
                const company = (c.company || '').toLowerCase();
                const emails = (c.emails || [])
                    .map((e) => e.email.toLowerCase())
                    .join(' ');
                const phones = (c.phones || [])
                    .map((p) => p.phone)
                    .join(' ');

                return (
                    name.includes(query) ||
                    company.includes(query) ||
                    emails.includes(query) ||
                    phones.includes(query)
                );
            });
        }

        return result;
    }, [contacts, filter, searchQuery]);

    const handleOpenCreateModal = () => {
        setSelectedContact(null);
        setCreateModalOpen(true);
    };

    const handleOpenEditModal = (contact) => {
        setSelectedContact(contact);
        setEditModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setSelectedContact(null);
    };

    const handleOpenHub = (contact) => {
        setSelectedContact(contact);
        setHubOpen(true);
    };

    const handleCloseHub = () => {
        setHubOpen(false);
        setSelectedContact(null);
    };

    const handleDelete = (contact) => {
        router.delete(`/contacts/${contact.id}`, {
            onSuccess: () => {
                window.location.reload();
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Contacts
                        </h1>
                        <button
                            onClick={handleOpenCreateModal}
                            className="rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
                        >
                            + Add Contact
                        </button>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="space-y-4">
                        <div className="max-w-xs">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                placeholder="Search by name, email, phone..."
                            />
                        </div>
                        <FilterBar
                            activeFilter={filter}
                            onFilterChange={setFilter}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                {filteredContacts.length > 0 ? (
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Company
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Phone
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Activity
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredContacts.map((contact) => (
                                    <tr
                                        key={contact.id}
                                        className="transition hover:bg-gray-50 cursor-pointer"
                                        onClick={() =>
                                            handleOpenHub(contact)
                                        }
                                    >
                                        <td className="px-6 py-4 text-sm">
                                            <div className="font-semibold text-gray-900">
                                                {contact.first_name}{' '}
                                                {contact.last_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {contact.company ? (
                                                <>
                                                    🏢 {contact.company}
                                                </>
                                            ) : (
                                                <span className="text-gray-400">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {contact.emails &&
                                            contact.emails.length > 0 ? (
                                                <div className="flex items-center gap-1">
                                                    <span>
                                                        📧{' '}
                                                        {contact.emails[0].email}
                                                    </span>
                                                    {contact.emails.length >
                                                        1 && (
                                                        <span className="text-xs text-gray-500">
                                                            +
                                                            {contact.emails
                                                                .length - 1}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {contact.phones &&
                                            contact.phones.length > 0 ? (
                                                <div className="flex items-center gap-1">
                                                    <span>
                                                        ☎️{' '}
                                                        {contact.phones[0]
                                                            .phone}
                                                    </span>
                                                    {contact.phones.length >
                                                        1 && (
                                                        <span className="text-xs text-gray-500">
                                                            +
                                                            {contact.phones
                                                                .length - 1}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1">
                                                <span className="text-xs font-medium text-blue-600">
                                                    {contact.activities
                                                        ? contact.activities
                                                              .length
                                                        : 0}
                                                </span>
                                            </div>
                                        </td>
                                        <td
                                            className="px-6 py-4 text-right"
                                            onClick={(e) =>
                                                e.stopPropagation()
                                            }
                                        >
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedContactForActivity(
                                                            contact,
                                                        );
                                                        setActivityModalOpen(
                                                            true,
                                                        );
                                                    }}
                                                    className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-600 transition hover:bg-green-100"
                                                    title="View activities"
                                                >
                                                    📋
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleOpenEditModal(
                                                            contact,
                                                        )
                                                    }
                                                    className="rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-600 transition hover:bg-blue-100"
                                                    title="Edit contact"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(contact)
                                                    }
                                                    className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 transition hover:bg-red-100"
                                                    title="Delete contact"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : searchQuery || filter !== 'all' ? (
                    <EmptyState
                        icon="🔍"
                        title="No results found"
                        subtitle={`No contacts match "${searchQuery || 'filter'}"${searchQuery ? ' or filters' : ''}`}
                        action={{
                            label: 'Clear filters',
                            onClick: () => {
                                setSearchQuery('');
                                setFilter('all');
                            },
                        }}
                    />
                ) : (
                    <EmptyState
                        icon="📭"
                        title="Your CRM is empty"
                        subtitle="Add your first contact to start building your network."
                        action={{
                            label: 'Create Contact',
                            onClick: handleOpenCreateModal,
                        }}
                        secondaryText="You can import or add manually."
                    />
                )}
            </div>

            {/* Create Modal */}
            <ContactFormModal
                isOpen={createModalOpen}
                onClose={handleCloseCreateModal}
                mode="create"
            />

            {/* Edit Modal */}
            <ContactFormModal
                isOpen={editModalOpen}
                onClose={handleCloseEditModal}
                contact={selectedContact}
                mode="edit"
            />

            {/* Activity Modal */}
            <ActivityModal
                isOpen={activityModalOpen}
                onClose={() => setActivityModalOpen(false)}
                contact={selectedContactForActivity}
            />

            {/* Contact Hub */}
            <ContactHub
                isOpen={hubOpen}
                onClose={handleCloseHub}
                contact={selectedContact}
                onEdit={handleOpenEditModal}
                onDelete={handleDelete}
            />

            {/* Quick Action Menu */}
            <QuickActionMenu
                actions={[
                    {
                        label: 'Add Contact',
                        icon: '✨',
                        onClick: handleOpenCreateModal,
                    },
                ]}
            />
        </div>
    );
}
