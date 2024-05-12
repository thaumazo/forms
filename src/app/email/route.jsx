import Email from "../../Email";
import { render } from '@react-email/render';
import { NextResponse } from 'next/server'

import fields from "../components/Automatic/fields";

const testData = new FormData();
testData.append("first_name",  "Testy");
testData.append("last_name",  "Mctestface");
testData.append("email", 'testy@tester.com');
testData.append("password", 'Secret');
testData.append("confirmPassword", 'Secret');

testData.append("radio", "2");
testData.append("select", "5");

testData.append("checkboxList", "2");
testData.append("checkboxList", "3");

testData.append("privacy", true);

export async function GET() {
  const html = render(<Email fields={fields} formData={testData}/>, {
    pretty: true,
  });

  return new NextResponse(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });


}
