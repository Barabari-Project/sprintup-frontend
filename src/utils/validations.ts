export const validateName = (value: string): string | null => {
  const namePattern = /^[A-Za-z\s]+$/;
  if (value.trim().length < 3) {
    return "Name must be at least 3 characters long.";
  }
  if (!namePattern.test(value)) {
    return "Name should only contain alphabets and spaces.";
  }
  if (value.trim().length > 50) {
    return "Name should not have more than 50 characters.";
  }
  return null;
};
export const validatePhoneNumber = (value: string): string | null => {
  const phoneNumberPattern = /^[0-9]{10}$/;
  if (!phoneNumberPattern.test(value)) {
    return "Please enter a valid 10-digit mobile number.";
  }
  return null;
};

export const validateMessage = (value: string): string | null => {
  if (value.trim().length > 200) {
    return "Message can not have more than 200 characters.";
  }
  return null;
};
