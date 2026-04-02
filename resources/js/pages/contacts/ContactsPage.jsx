import { useState } from 'react';
import { router } from '@inertiajs/react';
import ContactFormModal from '../../components/ContactFormModal';
export default function ContactsPage({ contacts: initialContacts }) {
    const [contacts, setContacts] = useState(initialContacts);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

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

    const handleSuccess = () => {
        window.location.reload();
    };

    const handleDelete = (contact) => {
        if (
            window.confirm(
                `Are you sure you want to delete ${contact.first_name} ${contact.last_name}?`,
            )
        ) {
            router.delete(`/contacts/${contact.id}`, {
                onSuccess: () => {
                    window.location.reload();
                },
                onError: (errors) => {
                    console.error(errors);
                },
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Contacts
                    </h1>
                    <button
                        onClick={handleOpenCreateModal}
                        className="rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
                    >
                        + Add Contact
                    </button>
                </div>

                {/* Contacts Table */}
                {contacts.length > 0 ? (
                    <div className="overflow-hidden rounded-lg bg-white shadow">
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
                                        Notes
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {contacts.map((contact) => (
                                    <tr
                                        key={contact.id}
                                        className="transition hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="font-semibold">
                                                {contact.first_name}{' '}
                                                {contact.last_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {contact.company || '—'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {/* {contact.emails?.[0]?.email || '—'} */}
                                            {contact.emails &&
                                            contact.emails.length > 0
                                                ? contact.emails.map(
                                                      (email) => (
                                                          <div key={email.id}>
                                                              {email.email}
                                                          </div>
                                                      ),
                                                  )
                                                : '—'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {contact.phones &&
                                            contact.phones.length > 0
                                                ? contact.phones.map(
                                                      (phone) => (
                                                          <div key={phone.id}>
                                                              {phone.phone}
                                                          </div>
                                                      ),
                                                  )
                                                : '—'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {contact.notes?.map((note) => (
                                                <div
                                                    key={note.id}
                                                    className="mb-2 rounded border p-3"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-500">
                                                            {note.type ||
                                                                'Note'}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    note.id,
                                                                )
                                                            }
                                                            className="text-sm text-red-500"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                    <p className="mt-1">
                                                        {note.content}
                                                    </p>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleOpenEditModal(
                                                            contact,
                                                        )
                                                    }
                                                    className="rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-600 transition hover:bg-blue-100"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(contact)
                                                    }
                                                    className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 transition hover:bg-red-100"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="rounded-lg bg-white p-12 text-center shadow">
                        <p className="mb-4 text-gray-600">
                            No contacts yet. Create your first contact!
                        </p>
                        <button
                            onClick={handleOpenCreateModal}
                            className="rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
                        >
                            Create Contact
                        </button>
                    </div>
                )}

                {/* Create Modal */}
                <ContactFormModal
                    isOpen={createModalOpen}
                    onClose={handleCloseCreateModal}
                    mode="create"
                    onSuccess={handleSuccess}
                />

                {/* Edit Modal */}
                <ContactFormModal
                    isOpen={editModalOpen}
                    onClose={handleCloseEditModal}
                    contact={selectedContact}
                    mode="edit"
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    );
}
