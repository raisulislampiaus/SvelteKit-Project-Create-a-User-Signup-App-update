import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { firstName, surname, emailOrMobile, password, dateOfBirth, gender } = await request.json();

  let errors = {};
  if (!emailOrMobile || !emailOrMobile.includes('@') && !/^\d{10}$/.test(emailOrMobile)) {
    errors.emailOrMobile = 'Enter Mobile number or email address';
  }
  if (password.length < 4) {
    errors.password = 'Password must be at least 4 chars long';
  }

  if (Object.keys(errors).length > 0) {
    return json({ message: 'Invalid input.', errors }, { status: 400 });
  }

  // Simulate saving user data
  return json({ message: 'Signup successful.' });
}
