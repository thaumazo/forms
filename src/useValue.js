import useForm from "./useForm"

export default function useValue(fieldName) {
  const { values } = useForm();

  if (values) {
    return values[fieldName];
  }
}
