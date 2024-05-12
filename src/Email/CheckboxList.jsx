import {
  Tailwind,
  Row,
  Column,
} from "@react-email/components";

export default function CheckboxList({ name, options = [], formData }) {
  const values = formData.getAll(name);

  if (values.length === 0) {
    return "-";
  }
  
  return (
    <Tailwind>
      {options.map(([key, label]) => {
        if (!values.includes(key)) {
          return false;
        }
        return (
          <Row key={key}>
            <Column className="text-[16px]">
              <span className="inline-block text-[24px] pr-[10px] align-middle">{'\u2611'}</span>  
              {label}
            </Column>
          </Row>
        );
      }).filter(Boolean)}
      </Tailwind>
    )
}
