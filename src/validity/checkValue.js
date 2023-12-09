import normalize from "./normalize";
import isEmail from "validator/es/lib/isEmail";

export default function checkValue(name, props, values) {
  const rules = normalize(props);
  const value = getValue(values, name);
  const valueStr = String(value || "");

  if (rules.required && valueStr.length === 0) {
    return rules.required.message;
  }

  if (rules.email && !isEmail(value)) {
    return rules.email.message;
  }

  if (rules.pattern) {
    let { pattern, message } = rules.pattern;
    let regex = new RegExp(`^${pattern}$`);

    if (!regex.test(value)) {
      return message;
    }
  }

  if (rules.matches) {
    const matchValue = getValue(values, rules.matches.field);
    if (value !== matchValue) {
      return rules.matches.message;
    }
  }
}

function getValue(data, name) {
  if (data instanceof FormData) {
    return data.get(name);
  } else {
    return data[name];
  }
}
