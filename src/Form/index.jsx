import Provider from "./Provider";
import Form from "./Form"

export default function FormRoot({ values, ...rest}) {
  return (
    <Provider values={ values }>
      <Form {...rest} />
    </Provider>
  )
}
