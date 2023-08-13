import get from "lodash/get"
import { useSelector } from "react-redux";

export default function useValue(fieldName) {
  return useSelector(s => get(s, ['form', fieldName]))
}
