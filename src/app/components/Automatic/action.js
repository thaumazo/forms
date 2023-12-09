"use server";

import fields from "./fields";
import checkServerValidity from "../../../validity/checkServerValidity";

export default async function action(initial, formData) {
  const fieldErrors = checkServerValidity(fields, formData);
  if (fieldErrors) {
    return {
      error:
        "We couldn't process your request. See the errors marked in red below.",
      fieldErrors,
    };
  }

  return { success: "Your form has successfully been submitted" };
}
