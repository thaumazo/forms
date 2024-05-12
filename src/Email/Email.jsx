import { Html } from '@react-email/html';

import { 
  Tailwind,
  Body,
  Container,
  // Heading,
  // Text,
} from '@react-email/components';

import Auto from "./Auto";

export default  function Email({ fields, formData }) {
  return (
    <Html lang="en">
      <Tailwind>

        <Body className="font-sans bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Auto fields={fields} formData={formData}/> 
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );

}
