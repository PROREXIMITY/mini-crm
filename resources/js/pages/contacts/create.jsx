import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        company: '',
        emails: [{ email: '' }],
    });

    function addEmail() {
        setData('emails', [...data.emails, { email: '' }]);
    }

    function updateEmail(index, value) {
        const newEmails = [...data.emails];
        newEmails[index].email = value;
        setData('emails', newEmails);
    }

    function removeEmail(index) {
        const newEmails = data.emails.filter((_, i) => i !== index);
        setData('emails', newEmails);
    }

    function submit(e) {
        e.preventDefault();
        console.log("Submitting data:", data);
        post('/contacts');
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Create Contact
                </h1>

                <form onSubmit={submit} className="space-y-5">
                    {/* First Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={data.first_name}
                            onChange={(e) =>
                                setData('first_name', e.target.value)
                            }
                            className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="John"
                        />
                        {errors.first_name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.first_name}
                            </p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={data.last_name}
                            onChange={(e) =>
                                setData('last_name', e.target.value)
                            }
                            className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Doe"
                        />
                        {errors.last_name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.last_name}
                            </p>
                        )}
                    </div>

                    {/* Company */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            Company
                        </label>
                        <input
                            type="text"
                            value={data.company}
                            onChange={(e) => setData('company', e.target.value)}
                            className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Acme Inc."
                        />
                    </div>

                    {/* Emails */}
                    {data.emails.map((email, index) => (
                        <div key={index}>
                            <label className="mb-1 block text-sm font-medium text-gray-600">
                                Email {index + 1}
                            </label>
                            <input
                                value={email.email}
                                onChange={(e) =>
                                    updateEmail(index, e.target.value)
                                }
                                className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Email"
                            />

                            <button
                                type="button"
                                onClick={() => removeEmail(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={addEmail}>
                        Add Email
                    </button>

                    {/* Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Contact'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
