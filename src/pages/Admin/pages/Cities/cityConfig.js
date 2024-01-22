import * as Yup from "yup";

export const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "description", label: "Description", type: "text" },
];

export const initialValues = fields.reduce((values, field) => {
  values[field.name] = "";
  return values;
}, {});

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});
