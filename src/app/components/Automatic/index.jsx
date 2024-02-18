"use client";

// import Provider from "../../../Provider";
import AutoForm from "../../../AutoForm";

import fields from "./fields";
import action from "./action";

export default function AutomaticLayout() {
  return <AutoForm title="Automatic form" fields={fields} action={action} />;
}
