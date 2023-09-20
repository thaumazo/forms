import { useContext } from "react";
import FormContext from "./Form/Context";

export default function useForm() {
  return useContext(FormContext);
}
