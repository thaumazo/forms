import { useSelector } from "react-redux";

export default function useValues (/*fieldName*/) {
    return useSelector(s => s.form);
}
