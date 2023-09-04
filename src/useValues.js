import useForm from "./useForm"

export default function useValues (/*fieldName*/) {
  const { values } = useForm();
  return values;
}
