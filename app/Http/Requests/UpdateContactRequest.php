<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  // @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>

  public function rules(): array
  {
    return [
      'first_name' => ['required', 'string', 'max:255'],
      'last_name' => ['required', 'string', 'max:255'],
      'company' => ['nullable', 'string', 'max:255'],
      'emails' => ['array'],
      'emails.*.id' => ['nullable', 'integer'],
      'emails.*.email' => ['nullable', 'email', 'max:255'],
      'phones' => 'array',
      'phones.*.phone' => 'nullable|string',
    ];
  }

  public function messages(): array
  {
    return [
      'first_name.required' => 'The first name is required.',
      'first_name.string' => 'The first name must be a string.',
      'first_name.max' => 'The first name may not be greater than 255 characters.',
      'last_name.required' => 'The last name is required.',
      'last_name.string' => 'The last name must be a string.',
      'last_name.max' => 'The last name may not be greater than 255 characters.',
      'company.string' => 'The company must be a string.',
      'company.max' => 'The company may not be greater than 255 characters.',
      'emails.array' => 'Emails must be an array.',
      'emails.*.id' => 'Each email ID must be an integer.',
      'emails.*.email' => 'Each email must be a valid email address.',
      'phones.array' => 'Phones must be an array.',
      'phones.*.phone' => 'Each phone must be a string.',

    ];
  }
}
