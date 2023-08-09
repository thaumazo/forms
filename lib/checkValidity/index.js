export default function checkValidity(input) {
  const {validity} = input;
  if (validity.valid) {
    return null;
  }

  // required field
  if (validity.valueMissing) {
    return "This field is required"
  }

  if (validity.typeMismatch) {
    switch (input.type) {
      case "email":
        return "Please enter a valid email address"
      default:
        return "Invalid response"
    }
  }

  return null;
}
