import { useEffect, useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import Modal from './Modal';

/**
 * NotesModal Component
 *
 * Handles viewing, adding, and deleting notes for a specific contact
 */
export default function NotesModal({ isOpen, onClose, contact }) {
    const { data, setData, post, processing, reset } = useForm({
        type: '',
        content: '',
    });

    const [notes, setNotes] = useState(contact?.notes || []);

    // Update notes when contact changes
    useEffect(() => {
        setNotes(contact?.notes || []);
    }, [contact?.notes]);

    // Submit a new note
    const submitNote = (e) => {
        e.preventDefault();
        if (!data.content.trim()) return;
        post(`/contacts/${contact.id}/notes`, {
            preserveScroll: true,
            onSuccess: (page) => {
                reset(); // clear form
                router.reload({ only: ['contacts'] }); // reload contact to get latest notes
                
            },
        });
        console.log(contact);
    };

    // Delete a note
    const handleDelete = (noteId) => {
        if (!confirm('Are you sure?')) return;

        const previousNotes = notes;

        // instant remove
        setNotes((prev) => prev.filter((n) => n.id !== noteId));

        router.delete(`/notes/${noteId}`, {
            preserveScroll: true,
            onError: () => {
                // rollback if failed
                setNotes(previousNotes);
            },
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Notes for ${contact?.first_name} ${contact?.last_name}`}
            size="lg"
            closeOnOverlayClick={!processing}
        >
            {/* Add Note Form */}
            <form onSubmit={submitNote} className="mb-4 space-y-3">
                <select
                    value={data.type}
                    onChange={(e) => setData('type', e.target.value)}
                    className="block w-full rounded-md border p-2.5 text-gray-900 shadow-sm"
                >
                    <option value="">Select type (optional)</option>
                    <option value="Call">Call</option>
                    <option value="Email">Email</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Other">Other</option>
                </select>
                <textarea
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    placeholder="Write a note..."
                    className="block w-full rounded-md border p-2.5 text-gray-900 shadow-sm"
                    rows={3}
                    disabled={processing}
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                    {processing ? 'Saving...' : 'Add Note'}
                </button>
            </form>

            {/* Notes List */}
            <div className="max-h-96 space-y-3 overflow-y-auto">
                {notes.length === 0 ? (
                    <p className="text-sm text-gray-500">No notes yet.</p>
                ) : (
                    notes.map((note) => (
                        <div
                            key={note.id}
                            className="flex items-start justify-between rounded border p-3"
                        >
                            <div>
                                <span className="text-xs font-semibold text-gray-500">
                                    {note.type || 'Note'}
                                </span>
                                <p className="mt-1 text-gray-900">
                                    {note.content}
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                    {new Date(note.created_at).toLocaleString()}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(note.id)}
                                className="ml-3 text-sm text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </Modal>
    );
}
