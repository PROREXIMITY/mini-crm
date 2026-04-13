import { useState } from 'react';
import {
    X,
    EnvelopeOpen,
    Phone,
    Plus,
    PencilSimple,
    Trash,
} from '@phosphor-icons/react';
import ActivityModal from './ActivityModal';

/**
 * ContactHub Component
 *
 * Right-side slide-over panel showing full contact details
 * Includes:
 * - Contact info (name, company, emails, phones)
 * - Activity timeline
 * - Quick actions
 * - Edit/delete options
 */
export default function ContactHub({
    isOpen,
    onClose,
    contact,
    onEdit,
    onDelete,
}) {
    const [activityModalOpen, setActivityModalOpen] = useState(false);

    if (!isOpen || !contact) return null;

    const handleDeleteContact = () => {
        if (
            confirm(
                `Delete ${contact.first_name} ${contact.last_name}? This action cannot be undone.`,
            )
        ) {
            onDelete(contact);
            onClose();
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/20 transition"
                onClick={onClose}
            />

            {/* Slide-over Panel */}
            <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md transform flex-col bg-white shadow-xl transition duration-300">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {contact.first_name} {contact.last_name}
                        </h2>
                        {contact.company && (
                            <p className="text-sm text-gray-600">
                                {contact.company}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 transition hover:bg-gray-100"
                    >
                        <X size={24} weight="bold" className="text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {/* Contact Details */}
                    <div className="space-y-6">
                        {/* Emails */}
                        <div>
                            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Emails
                            </h3>
                            {contact.emails && contact.emails.length > 0 ? (
                                <div className="space-y-2">
                                    {contact.emails.map((email) => (
                                        <a
                                            key={email.id}
                                            href={`mailto:${email.email}`}
                                            className="flex items-center gap-2 text-sm text-indigo-600 hover:underline transition"
                                        >
                                            <EnvelopeOpen size={18} weight="duotone" />
                                            {email.email}
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No emails
                                </p>
                            )}
                        </div>

                        {/* Phones */}
                        <div>
                            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Phones
                            </h3>
                            {contact.phones && contact.phones.length > 0 ? (
                                <div className="space-y-2">
                                    {contact.phones.map((phone) => (
                                        <a
                                            key={phone.id}
                                            href={`tel:${phone.phone}`}
                                            className="flex items-center gap-2 text-sm text-indigo-600 hover:underline transition"
                                        >
                                            <Phone size={18} weight="duotone" />
                                            {phone.phone}
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No phones
                                </p>
                            )}
                        </div>

                        {/* Created At */}
                        <div>
                            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Added
                            </h3>
                            <p className="text-sm text-gray-700">
                                {new Date(contact.created_at).toLocaleDateString(
                                    'en-US',
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    },
                                )}
                            </p>
                        </div>

                        {/* Quick Stats */}
                        {contact.activities && (
                            <div className="rounded-lg bg-gray-50 p-4">
                                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Activity
                                </h3>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-indigo-600">
                                        {contact.activities.length}
                                    </div>
                                    <p className="text-xs text-gray-600">
                                        {contact.activities.length === 1
                                            ? 'activity'
                                            : 'activities'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 space-y-2">
                    <button
                        onClick={() => setActivityModalOpen(true)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-700 hover:scale-105"
                    >
                        <Plus size={18} weight="bold" />
                        Add Activity
                    </button>

                    <button
                        onClick={() => {
                            onEdit(contact);
                            onClose();
                        }}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:scale-105"
                    >
                        <PencilSimple size={18} weight="duotone" />
                        Edit
                    </button>

                    <button
                        onClick={handleDeleteContact}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition-all hover:bg-red-100 hover:scale-105"
                    >
                        <Trash size={18} weight="duotone" />
                        Delete
                    </button>
                </div>
            </div>

            {/* Activity Modal */}
            <ActivityModal
                isOpen={activityModalOpen}
                onClose={() => setActivityModalOpen(false)}
                contact={contact}
            />
        </>
    );
}
