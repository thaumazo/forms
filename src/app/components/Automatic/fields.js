import ToggleValidity from "./ToggleValidity";

const fields = {
  name: {
    label: "Name",
    fields: {
      first_name: {
        required: true,
        placeholder: "Jane",
        sm: 6, // grid spacing
      },
      last_name: {
        required: true,
        placeholder: "Doe",
        sm: 6, // grid spacing
      },
    },
  },
  credentials: {
    label: "Login credentials",
    fields: {
      email: {
        type: "email",
        placeholder: "name@example.com",
        required: true,
      },
      password: {
        required: true,
        md: 6,
        field: "password",
      },
      confirmPassword: {
        required: true,
        field: "password",
        md: 6,
        matches: "password",
      },
    },
  },
  stats: {
    label: "More info",
    fields: {
      radio: {
        label: "Pick one",
        required: true,
        field: "radio",
        row: "sm", // put radio buttons in a row at lg break point
        options: [
          [1, "Option one"],
          [2, "Option two"],
          [3, "Option three"],
        ],
      },
      select: {
        label: "Select one",
        required: true,
        field: "select",
        options: [
          [1, "Option one"],
          [2, "Option two"],
          [3, "Option three"],
          [4, "Option four"],
          [5, "Option five"],
          [6, "Option six"],
        ],
      },
      checkboxList: {
        label: "Which apply",
        field: "checkboxList",
        row: "sm",
        options: [
          [1, "Option one"],
          [2, "Option two"],
          [3, "Option three"],
        ],
      },
      privacy: {
        label: "I agree to the privacy policy",
        field: "checkbox",
        required: true,
      },
    },
  },
  toggleValidity: {
    field: ToggleValidity,
  },
};

export default fields;
