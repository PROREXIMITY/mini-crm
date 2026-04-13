import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    DotsSixVertical,
    BookmarkSimple,
    Buildings,
    EnvelopeOpen,
    Phone,
    ClipboardText,
    PencilSimple,
    Trash,
} from '@phosphor-icons/react';
import ContactFormModal from '../../components/ContactFormModal';
import ActivityModal from '../../components/ActivityModal';
import ContactHub from '../../components/ContactHub';
import SearchBar from '../../components/SearchBar';
import FilterBar from '../../components/FilterBar';
import EmptyState from '../../components/EmptyState';
import QuickActionMenu from '../../components/QuickActionMenu';
import Highlight from '../../components/Highlight';
import { toast } from '../../components/ToastProvider';
import { useContactReorder } from '../../hooks/useContactReorder';

export default function ContactsPage({ contacts = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [activityModalOpen, setActivityModalOpen] = useState(false);
    const [selectedContactForActivity, setSelectedContactForActivity] =
        useState(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [hubOpen, setHubOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const { url, props } = usePage();

    // Initialize drag-and-drop reordering
    const {
        contacts: reorderedContacts,
        setContacts: setReorderedContacts,
        draggedItem,
        dragOverItem,
        handlers: dragHandlers,
    } = useContactReorder(contacts);

    useEffect(() => {
        setReorderedContacts(contacts);
    }, [contacts, setReorderedContacts]);

    useEffect(() => {
        if (url.includes('create=1')) {
            setCreateModalOpen(true);
        }
    }, [url]);

    useEffect(() => {
        if (props.openContact) {
            const contact = contacts.find((c) => c.id === props.openContact);
            if (contact) {
                handleOpenHub(contact);
            }
        }
    }, [props.openContact, contacts]);

    // Apply search and filters
    const filteredContacts = useMemo(() => {
        let base = reorderedContacts;

        // FILTER FIRST
        if (filter === 'hasEmail') {
            base = base.filter(
                (c) => Array.isArray(c.emails) && c.emails.length > 0,
            );
        } else if (filter === 'hasPhone') {
            base = base.filter(
                (c) => Array.isArray(c.phones) && c.phones.length > 0,
            );
        } else if (filter === 'hasCompany') {
            base = base.filter((c) => (c.company || '').trim() !== '');
        }

        // SEARCH SECOND
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();

            base = base.filter((c) => {
                const name = `${c.first_name} ${c.last_name}`.toLowerCase();
                const company = (c.company || '').toLowerCase();
                const emails = (c.emails || [])
                    .map((e) => e.email.toLowerCase())
                    .join(' ');
                const phones = (c.phones || []).map((p) => p.phone).join(' ');

                return (
                    name.includes(query) ||
                    company.includes(query) ||
                    emails.includes(query) ||
                    phones.includes(query)
                );
            });
        }

        return base;
    }, [reorderedContacts, filter, searchQuery]);

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

    const handleDelete = useCallback((contact) => {
        if (
            !window.confirm(
                `Delete ${contact.first_name} ${contact.last_name}?`,
            )
        ) {
            return;
        }

        router.delete(`/contacts/${contact.id}`, {
            onSuccess: () => {
                toast.success(`${contact.first_name} deleted successfully`);
            },
            onError: (errors) => {
                console.error('Delete failed:', errors);
                toast.error('Failed to delete contact. Please try again.');
            },
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    >
                        <ArrowLeft size={18} weight="bold" />
                        Back to Dashboard
                    </Link>
                </div>
            </div>

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
                                    <th className="w-8 px-3 py-3 text-left text-sm font-semibold text-gray-900">
                                        {/* Drag handle header */}
                                    </th>
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
                                {filteredContacts.map((contact, index) => (
                                    
                                    <tr
                                        key={contact.id}
                                        draggable={
                                            !searchQuery && filter === 'all'
                                        }
                                        onDragStart={(e) =>
                                            !searchQuery &&
                                            filter === 'all' &&
                                            dragHandlers.handleDragStart(
                                                e,
                                                index,
                                            )
                                        }
                                        onDragOver={dragHandlers.handleDragOver}
                                        onDragEnter={(e) =>
                                            !searchQuery &&
                                            filter === 'all' &&
                                            dragHandlers.handleDragEnter(
                                                e,
                                                index,
                                            )
                                        }
                                        onDragLeave={
                                            dragHandlers.handleDragLeave
                                        }
                                        onDrop={(e) =>
                                            !searchQuery &&
                                            filter === 'all' &&
                                            dragHandlers.handleDrop(e, index)
                                        }
                                        onDragEnd={dragHandlers.handleDragEnd}
                                        className={`cursor-move transition ${
                                            draggedItem === index
                                                ? 'bg-indigo-50 opacity-50'
                                                : dragOverItem === index
                                                  ? 'border-t-2 border-yellow-300 bg-yellow-50'
                                                  : 'hover:bg-gray-50'
                                        }`}
                                        onClick={() => handleOpenHub(contact)}
                                    >
                                        {/* Drag Handle */}
                                        <td className="px-3 py-4 text-center text-gray-400 hover:text-gray-600">
                                            <span
                                                className="cursor-grab transition-all active:cursor-grabbing"
                                                title="Drag to reorder"
                                            >
                                                <DotsSixVertical
                                                    size={18}
                                                    weight="bold"
                                                />
                                            </span>
                                        </td>

                                        {/* Name with highlighting */}
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex items-center gap-2 font-semibold text-gray-900">
                                                {contact.is_favorite && (
                                                    <span
                                                        className="transition-scale inline-block"
                                                        title="Favorite"
                                                    >
                                                        <BookmarkSimple
                                                            size={18}
                                                            weight="fill"
                                                            className="scale-110 text-indigo-600"
                                                        />
                                                    </span>
                                                )}
                                                <Highlight
                                                    text={`${contact.first_name} ${contact.last_name}`}
                                                    query={searchQuery}
                                                />
                                            </div>
                                        </td>

                                        {/* Company with highlighting */}
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {contact.company ? (
                                                <div className="flex items-center gap-2">
                                                    <Buildings
                                                        size={18}
                                                        weight="duotone"
                                                        className="text-gray-400"
                                                    />
                                                    <Highlight
                                                        text={contact.company}
                                                        query={searchQuery}
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">
                                                    —
                                                </span>
                                            )}
                                        </td>

                                        {/* Email with highlighting */}
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {contact.emails &&
                                            contact.emails.length > 0 ? (
                                                <div className="flex items-center gap-2">
                                                    <EnvelopeOpen
                                                        size={18}
                                                        weight="duotone"
                                                        className="text-gray-400"
                                                    />
                                                    <Highlight
                                                        text={
                                                            contact.emails[0]
                                                                .email
                                                        }
                                                        query={searchQuery}
                                                    />
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

                                        {/* Phone with highlighting */}
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {contact.phones &&
                                            contact.phones.length > 0 ? (
                                                <div className="flex items-center gap-2">
                                                    <Phone
                                                        size={18}
                                                        weight="duotone"
                                                        className="text-gray-400"
                                                    />
                                                    <Highlight
                                                        text={
                                                            contact.phones[0]
                                                                .phone
                                                        }
                                                        query={searchQuery}
                                                    />
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

                                        {/* Activity */}
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

                                        {/* Actions */}
                                        <td
                                            className="px-6 py-4 text-right"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="flex justify-end gap-2">
                                                {/* Favorite Button - Premium Toggle */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.patch(
                                                            `/contacts/${contact.id}/favorite`,
                                                        );
                                                    }}
                                                    className="group inline-flex items-center justify-center rounded-md p-2 transition-all duration-200 hover:scale-110"
                                                    title={
                                                        contact.is_favorite
                                                            ? 'Remove from favorites'
                                                            : 'Add to favorites'
                                                    }
                                                >
                                                    <BookmarkSimple
                                                        size={20}
                                                        weight={
                                                            contact.is_favorite
                                                                ? 'fill'
                                                                : 'regular'
                                                        }
                                                        className={`transition-all duration-200 ${
                                                            contact.is_favorite
                                                                ? 'scale-105 text-indigo-600'
                                                                : 'text-gray-400 group-hover:text-indigo-500'
                                                        }`}
                                                    />
                                                </button>

                                                {/* Activity Button */}
                                                <button
                                                    onClick={() => {
                                                        setSelectedContactForActivity(
                                                            contact,
                                                        );
                                                        setActivityModalOpen(
                                                            true,
                                                        );
                                                    }}
                                                    className="group inline-flex items-center justify-center rounded-md p-2 transition-all duration-200 hover:scale-110 hover:bg-green-50"
                                                    title="View activities"
                                                >
                                                    <ClipboardText
                                                        size={20}
                                                        weight="duotone"
                                                        className="text-gray-600 group-hover:text-green-600"
                                                    />
                                                </button>

                                                {/* Edit Button */}
                                                <button
                                                    onClick={() =>
                                                        handleOpenEditModal(
                                                            contact,
                                                        )
                                                    }
                                                    className="group inline-flex items-center justify-center rounded-md p-2 transition-all duration-200 hover:scale-110 hover:bg-blue-50"
                                                    title="Edit contact"
                                                >
                                                    <PencilSimple
                                                        size={20}
                                                        weight="duotone"
                                                        className="text-gray-600 group-hover:text-blue-600"
                                                    />
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() =>
                                                        handleDelete(contact)
                                                    }
                                                    className="group inline-flex items-center justify-center rounded-md p-2 transition-all duration-200 hover:scale-110 hover:bg-red-50"
                                                    title="Delete contact"
                                                >
                                                    <Trash
                                                        size={20}
                                                        weight="duotone"
                                                        className="text-gray-600 group-hover:text-red-600"
                                                    />
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
