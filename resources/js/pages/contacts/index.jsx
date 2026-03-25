import React from 'react';
import { Link, router } from '@inertiajs/react';

export default function Index({ contacts }) {
const deleteContact = (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      router.delete(`/contacts/${id}`);
    }
  };


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
          <Link
            href="/contacts/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 shadow-sm"
          >
            + Add Contact
          </Link>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Company</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {contact.first_name} {contact.last_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {contact.company || <span className="text-gray-400 italic">No Company</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/contacts/${contact.id}/edit`} 
                        className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                      >
                        Edit
                      </Link>
                      <button onClick={() => deleteContact(contact.id)} className="text-red-500 hover:text-red-700 font-medium">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-gray-400">
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