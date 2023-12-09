import ToggleValidity from "./ToggleValidity";

const fields = {
  name: {
    label: "Name",
    fields: {
      first_name: {
        required: true,
        xs: 6, // grid spacing
      },
      last_name: {
        required: true,
        xs: 6, // grid spacing
      },
    },
  },
  credentials: {
    label: "Login credentials",
    fields: {
      email: {
        type: "email",
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
        row: true, // put radio buttons in a row
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
