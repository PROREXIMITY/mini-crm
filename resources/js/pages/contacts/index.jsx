import React from 'react';
import { Link, router } from '@inertiajs/react';

export default function Index({ contacts }) {
    const deleteContact = (id) => {
        if (confirm('Are you sure you want to delete this contact?')) {
            router.delete(`/contacts/${id}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-6xl">
                {/* Header Section */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Contacts
                    </h1>
                    <Link
                        href="/contacts/create"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm transition duration-200 hover:bg-blue-700"
                    >
                        + Add Contact
                    </Link>
                </div>

                {/* Table Card */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <table className="w-full border-collapse text-left">
                        <thead className="border-b border-gray-200 bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Name
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Company
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Emails
                                </th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {contacts.length > 0 ? (
                                contacts.map((contact) => (
                                    <tr
                                        key={contact.id}
                                        className="transition-colors hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">
                                                {contact.first_name}{' '}
                                                {contact.last_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {contact.company || (
                                                <span className="text-gray-400 italic">
                                                    No Company
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className='font-medium text-gray-900'>
                                                {contact.emails?.map((e) => (
                                                    <div key={e.id}>
                                                        {e.email}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/contacts/${contact.id}/edit`}
                                                className="mr-4 font-medium text-blue-600 hover:text-blue-800"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    deleteContact(contact.id)
                                                }
                                                className="font-medium text-red-500 hover:text-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="px-6 py-10 text-center text-gray-400"
                                    >
                                        No contacts found. Start by adding one!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
