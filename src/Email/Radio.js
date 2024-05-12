import {
  Tailwind,
  Row,
  Column,
} from "@react-email/components";

export default function Radio({ name, options = [], formData }) {
  const value = formData.get(name);

  if (!value) {
    return "-";
  }
  
  return (
    <Tailwind>
      {options.map(([key, label]) => {
        if (key !== value) {
          return false;
        }

        return (
          <Row key={key}>
            <Column className="text-[16px]">
              <span className="inline-block text-[24px] pr-[10px] align-middle">{'\u25C9'}</span>  
              {label}
            </Column>
          </Row>
        );
      }).filter(Boolean)}
      </Tailwind>
    )
}
