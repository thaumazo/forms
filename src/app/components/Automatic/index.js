import Layout from "Layout"

const fields = [
  {
    name: "first_name",
    required: true,
    xs: 6, // grid spacing
  },  
  {
    name: "last_name",
    required: true,
    xs: 6, // grid spacing
  }  
]


export default function AutomaticLayout() {
  return <Layout fields={ fields }/>;
}
