import { useForm } from '@inertiajs/react';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    first_name: '',
    last_name: '',
    company: '',
  });

  function submit(e) {
    e.preventDefault();
    post('/contacts');
  }

  return (
    <div>
      <h1>Create Contact</h1>

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="First Name"
          value={data.first_name}
          onChange={e => setData('first_name', e.target.value)}
        />
        {errors.first_name && <div>{errors.first_name}</div>}

        <input
          type="text"
          placeholder="Last Name"
          value={data.last_name}
          onChange={e => setData('last_name', e.target.value)}
        />
        {errors.last_name && <div>{errors.last_name}</div>}

        <input
          type="text"
          placeholder="Company"
          value={data.company}
          onChange={e => setData('company', e.target.value)}
        />

        <button type="submit" disabled={processing}>
          Save
        </button>
      </form>
    </div>
  );
}