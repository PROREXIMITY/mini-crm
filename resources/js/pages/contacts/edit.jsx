import { useForm } from '@inertiajs/react';

export default function Edit({ contact }) {
    const { data, setData, put, errors, processing } = useForm({
        first_name: contact.first_name || '',
        last_name: contact.last_name || '',
        company: contact.company || '',
        emails: (contact.emails || []).map((e) => ({
            id: e.id,
            email: e.email,
        })),
    });

    // Add new email input
    function addEmail() {
        setData('emails', [...data.emails, { email: '' }]);
    }

    // Remove an email input
    function removeEmail(index) {
        const newEmails = [...data.emails];
        newEmails.splice(index, 1);
        setData('emails', newEmails);
    }

    // Update email input
    function updateEmail(index, value) {
        const newEmails = [...data.emails];
        newEmails[index].email = value;
        setData('emails', newEmails);
    }

    function submit(e) {
        e.preventDefault();
        put(`/contacts/${contact.id}`);
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="mx-auto mt-10 w-full max-w-2xl rounded-lg bg-white p-8 shadow-md">
            <h1 className="mb-6 text-2xl font-bold text-gray-800">
                Edit Contact
            </h1>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        className="mt-1 block w-full text-gray-700 rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                    />
                    {errors.first_name && (
                        <div className="mt-1 text-sm text-red-500">
                            {errors.first_name}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        className="mt-1 block text-gray-700 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                    />
                    {errors.last_name && (
                        <div className="mt-1 text-sm text-red-500">
                            {errors.last_name}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Company
                    </label>
                    <input
                        className="mt-1 block text-gray-700 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.company}
                        onChange={(e) => setData('company', e.target.value)}
                    />
                </div>

                <div className="border-t border-gray-100 pt-4">
                    <h3 className="mb-3 text-lg font-semibold text-gray-700">
                        Emails
                    </h3>

                    <div className="space-y-3">
                        {data.emails.map((email, index) => (
                            <div key={email.id ?? index} className="flex gap-2">
                                <input
                                    className="flex-1 text-gray-700 rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={email.email}
                                    onChange={(e) =>
                                        updateEmail(index, e.target.value)
                                    }
                                    placeholder="Email"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeEmail(index)}
                                    className="rounded-md bg-red-50 px-3 py-2 text-red-600 transition-colors hover:bg-red-100"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addEmail}
                        className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                        + Add Email
                    </button>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Update Contact'}
                    </button>
                </div>
            </form>
        </div>
      </div>
    );
}
