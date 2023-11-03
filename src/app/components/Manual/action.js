"use server";
export default async function action() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  /*
  return {
    error: "Big trouble in little china",
    fieldErrors: {required: "This field is required"}
  }
  */
  return { success: "Form was submitted successfully" };
}
