import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from './Modal';

/**
 *
 *
 * Handles both Create and Edit operations in a single modal
 * - Resets form when opening for create
 * - Pre-fills form data when opening for edit
 * - Handles validation errors from Laravel backend
 * - Submits via Inertia POST/PUT
 */
export default function ContactFormModal({
    isOpen,
    onClose,
    contact = null,
    mode = 'create', // 'create' or 'edit'
    onSuccess,
}) {
    const isEditMode = mode === 'edit' && contact;
    const isCreateMode = mode === 'create';

    const { data, setData, post, put, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        company: '',
        emails: [{ email: '' }],
        phones: [{ phone: '' }],
    });

    // Initialize form data when modal opens or contact changes
    useEffect(() => {
        if (isOpen && isEditMode) {
            // Pre-fill form with contact data for edit
            setData({
                first_name: contact.first_name || '',
                last_name: contact.last_name || '',
                company: contact.company || '',
                emails: (contact.emails || []).map((e) => ({
                    id: e.id,
                    email: e.email,
                })),
                phones: (contact.phones || []).map((p) => ({
                    id: p.id,
                    phone: p.phone,
                })),
            });
        } else if (isOpen && isCreateMode) {
            // Reset form for create
            reset();
            setData({
                first_name: '',
                last_name: '',
                company: '',
                emails: [{ email: '' }],
                phones: [{ phone: '' }],
            });
        }
    }, [isOpen, contact, mode]);

    const addEmail = () => {
        setData('emails', [...data.emails, { email: '' }]);
    };

    const removeEmail = (index) => {
        const newEmails = data.emails.filter((_, i) => i !== index);
        setData('emails', newEmails);
    };

    const updateEmail = (index, value) => {
        const newEmails = [...data.emails];
        newEmails[index].email = value;
        setData('emails', newEmails);
    };

    function addPhone() {
        setData('phones', [...data.phones, { phone: '' }]);
    }

    function updatePhone(index, value) {
        const newPhones = [...data.phones];
        newPhones[index].phone = value;
        setData('phones', newPhones);
    }

    function removePhone(index) {
        const newPhones = data.phones.filter((_, i) => i !== index);
        setData('phones', newPhones);
    }

    const submit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            put(`/contacts/${contact.id}`, {
                onSuccess: () => {
                    onClose();
                    onSuccess?.();
                },
            });
        } else {
            post('/contacts', {
                onSuccess: () => {
                    onClose();
                    onSuccess?.();
                },
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? 'Edit Contact' : 'Create Contact'}
            size="lg"
            closeOnOverlayClick={!processing}
        >
            <form onSubmit={submit} className="space-y-5">
                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                        className={`mt-1 block w-full rounded-md border p-2.5 text-gray-900 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500 ${
                            errors.first_name
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-gray-300'
                        }`}
                        placeholder="John"
                        disabled={processing}
                        autoFocus
                    />
                    {errors.first_name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.first_name}
                        </p>
                    )}
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        className={`mt-1 block w-full rounded-md border p-2.5 text-gray-900 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500 ${
                            errors.last_name
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-gray-300'
                        }`}
                        placeholder="Doe"
                        disabled={processing}
                    />
                    {errors.last_name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.last_name}
                        </p>
                    )}
                </div>

                {/* Company */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Company
                    </label>
                    <input
                        type="text"
                        value={data.company}
                        onChange={(e) => setData('company', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2.5 text-gray-900 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Acme Inc."
                        disabled={processing}
                    />
                </div>

                {/* Emails Section */}
                <div className="border-t border-gray-200 pt-5">
                    <h3 className="mb-4 text-sm font-semibold text-gray-700">
                        Emails
                    </h3>

                    <div className="space-y-3">
                        {data.emails.map((email, index) => (
                            <div
                                key={email.id ?? index}
                                className="flex items-start gap-2"
                            >
                                <div className="flex-1">
                                    <input
                                        type="email"
                                        value={email.email}
                                        onChange={(e) =>
                                            updateEmail(index, e.target.value)
                                        }
                                        className={`block w-full rounded-md border p-2.5 text-gray-900 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500 ${
                                            errors[`emails.${index}.email`]
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        placeholder="email@example.com"
                                        disabled={processing}
                                    />
                                    {errors[`emails.${index}.email`] && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors[`emails.${index}.email`]}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeEmail(index)}
                                    disabled={processing}
                                    className="rounded-md bg-red-50 px-3 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add Email Button */}
                    <button
                        type="button"
                        onClick={addEmail}
                        disabled={processing}
                        className="mt-4 text-sm font-medium text-indigo-600 transition hover:text-indigo-700 disabled:opacity-50"
                    >
                        + Add Email
                    </button>

                    {errors.emails && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.emails}
                        </p>
                    )}
                </div>

                {/* Phones Section */}
                <div className="border-t border-gray-200 pt-5">
                    <h3 className="mb-4 text-sm font-semibold text-gray-700">
                        Phones
                    </h3>

                    <div className="space-y-3">
                        {data.phones.map((phone, index) => (
                            <div
                                key={phone.id ?? index}
                                className="flex items-start gap-2"
                            >
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={phone.phone}
                                        onChange={(e) =>
                                            updatePhone(index, e.target.value)
                                        }
                                        className={`block w-full rounded-md border p-2.5 text-gray-900 shadow-sm transition ${
                                            errors[`phones.${index}.phone`]
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        placeholder="09123456789"
                                        disabled={processing}
                                    />
                                    {errors[`phones.${index}.phone`] && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors[`phones.${index}.phone`]}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removePhone(index)}
                                    disabled={processing}
                                    className="rounded-md bg-red-50 px-3 py-2.5 text-sm text-red-600 hover:bg-red-100"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addPhone}
                        disabled={processing}
                        className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                        + Add Phone
                    </button>

                    {errors.phones && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.phones}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 border-t border-gray-200 pt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={processing}
                        className="flex-1 rounded-md border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex-1 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {processing
                            ? 'Saving...'
                            : isEditMode
                              ? 'Update Contact'
                              : 'Create Contact'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
