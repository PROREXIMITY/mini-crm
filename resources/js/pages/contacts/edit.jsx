import { useForm } from '@inertiajs/react';

export default function Edit({ contact }) {
  const { data, setData, put, processing, errors } = useForm({
    first_name: contact.first_name || '',
    last_name: contact.last_name || '',
    company: contact.company || '',
  });

  function submit(e) {
    e.preventDefault();
    put(`/contacts/${contact.id}`);
  }

  return (
    <div>
      <h1>Edit Contact</h1>

      <form onSubmit={submit}>
        <input
          value={data.first_name}
          onChange={e => setData('first_name', e.target.value)}
        />
        {errors.first_name && <div>{errors.first_name}</div>}

        <input
          value={data.last_name}
          onChange={e => setData('last_name', e.target.value)}
        />
        {errors.last_name && <div>{errors.last_name}</div>}

        <input
          value={data.company}
          onChange={e => setData('company', e.target.value)}
        />

        <button type="submit" disabled={processing}>
          Update
        </button>
      </form>
    </div>
  );
}