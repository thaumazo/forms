import omit from "lodash/omit";
// import pick from "lodash/omit";

const validities = ["required", "pattern"];

export default function filterProps(props) {
  let retval = omit(props, ["message", "email", "unique", "matches"]);

  for (let check of validities) {
    const info = retval[check];
    if (!info || info === true) {
      continue;
    }

    if (check === "required") {
      retval[check] = true;
    }

    if (check === "required" && typeof info === "object") {
      retval[check] = info.pattern;
    }
  }

  return retval;
}
