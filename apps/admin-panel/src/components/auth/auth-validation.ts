export function validateEmail(email: string | undefined | null): boolean {
  if (!email) return false;

  const validUsernameRegex = /^[a-zA-Z0-9_.]{3,15}$/;
  const validEmailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  return validUsernameRegex.test(email.trim()) || validEmailRegex.test(email);
}

export function validatePassword(password: string | undefined | null): boolean {
  if (!password) return false;

  const re = /^(?=.*\d)(?=.*[a-z]).{8,}$/;
  return re.test(password);
}
