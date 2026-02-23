export type RegistrationFormValues = {
  fullName: string;
  phone: string;
  email: string;
  adults: string;
  children: string;
};

export type RegistrationFormErrors = Partial<Record<keyof RegistrationFormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\-\s()]{8,20}$/;

export function validateRegistrationForm(values: RegistrationFormValues): RegistrationFormErrors {
  const errors: RegistrationFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!phonePattern.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.adults.trim()) {
    errors.adults = "Please specify adult guests.";
  } else if (Number(values.adults) < 1) {
    errors.adults = "At least one adult is required.";
  }

  if (!values.children.trim()) {
    errors.children = "Use 0 if no children.";
  } else if (Number(values.children) < 0) {
    errors.children = "Children cannot be negative.";
  }

  return errors;
}
