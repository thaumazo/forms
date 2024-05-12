import React from "react";
import sentenceCase from "../utils/sentenceCase";

import {
  Section,
  Row,
  Column
} from '@react-email/components';

import Field from "./Field";

export default function Auto({ fields, formData }) {
  return (
      <Section>
        {Object.entries(fields).map(([key, field]) => {
          const label = field.label || sentenceCase(key);

          if (field.fields) {
            return (
              <Section key={key} className="p-[8px] border border-solid border-[#eaeaea] rounded">
                <div className=" border-bottom border-solid border-[#eaeaea] text-black text-[22px] font-bold">
                  {label}
                </div>
                <Auto fields={field.fields} formData={formData}/>
              </Section>
            );
          }

          return (
            <React.Fragment key={key}>
              <Row className="pt-[10px]">
                <Column className="text-black text-[18px] font-bold">
                  {label}
                </Column>
              </Row>
              <Row>
                <Column>
                  <Field name={key} {...field} formData={formData}/>
                </Column>
              </Row>
            </React.Fragment>
          );
        })}
    </Section>
  );
}

