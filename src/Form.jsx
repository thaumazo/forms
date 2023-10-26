import React, { useCallback } from "react";
import useForm from "./useForm";
import useConfirm from "./useConfirm";

export default function Form({ children, confirm = false, ...props }) {
  const context = useForm();
  const { setInvalid, setSubmitted, formRef } = context;
  const { onSubmit } = props;
  useConfirm(confirm);

  const handleSubmit = useCallback(
    (evt) => {
      const myForm = evt.currentTarget;
      setSubmitted(true);
      if (!myForm.checkValidity()) {
        evt.preventDefault();
        // setInvalid(true)

        const input = formRef.current.querySelector(":invalid");
        if (input) {
          input.focus();
        }

        return;
      }
      setInvalid(false);

      if (onSubmit) {
        onSubmit(evt, context);
      }
    },
    [context, formRef, onSubmit, setInvalid, setSubmitted],
  );

  const handleChange = useCallback(
    (evt) => {
      const myForm = evt.currentTarget;
      setInvalid(!myForm.checkValidity());
    },
    [setInvalid],
  );

  // block native form validation UX
  const handleInvalid = useCallback(
    (evt) => {
      evt.preventDefault();
      setInvalid(true);
    },
    [setInvalid],
  );

  return (
    <form
      noValidate
      ref={formRef}
      {...props}
      onSubmit={handleSubmit}
      onChange={handleChange}
      onInvalid={handleInvalid}
    >
      {children}
    </form>
  );
}
