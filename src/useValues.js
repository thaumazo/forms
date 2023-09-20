import useForm from "./useForm";

export default function useValues() {
  const { values } = useForm();
  return values;
}
