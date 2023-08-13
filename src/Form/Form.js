import React, {useCallback} from "react";
import useForm from "../useForm"
import useConfirm from "../useConfirm"

export default function Form({
  children,
  method = "post",
  confirm = false,
  ...props
}) {
  const {setInvalid, setSubmitted, formRef} = useForm()
  const {onSubmit} = props;
  useConfirm(confirm)

  const handleSubmit = useCallback((evt) => {
    const myForm = evt.currentTarget
    setSubmitted(true)
    evt.preventDefault();
    if (!myForm.checkValidity()) {
      // setInvalid(true)

      const input = formRef.current.querySelector(":invalid");
      if (input) {
        input.focus();
      }

      return;
    }
    setInvalid(false)

    if (onSubmit) {
      onSubmit();
    }
  }, [formRef, onSubmit, setInvalid, setSubmitted]);

  const handleChange = useCallback((evt) => {
    const myForm = evt.currentTarget
    setInvalid(!myForm.checkValidity())
  }, [setInvalid]);

  // block native form validation UX
  const handleInvalid = useCallback((evt) => {
    evt.preventDefault()
    setInvalid(true)
  }, [setInvalid]);

  return (
    <form
      noValidate
      ref={formRef}
      method={method}
      {...props}
      onSubmit={handleSubmit}
      onChange={handleChange}
      onInvalid={handleInvalid}
    >
      {children}
    </form>
  )
}
