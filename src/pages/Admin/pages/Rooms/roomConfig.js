import * as Yup from "yup";

export const fields = [
  { name: "roomNumber", label: "Room Number", type: "text" },
  { name: "cost", label: "Cost", type: "number" },
  { name: "hotelId", label: "Hotel Id", type: "number" },
];

export const initialValues = fields.reduce((values, field) => {
  values[field.name] = field.type === "number" ? 0 : "";
  return values;
}, {});

export const validationSchema = Yup.object(
  fields.reduce((schema, field) => {
    if (field.type === "text") {
      schema[field.name] = Yup.string().required(`${field.label} is required`);
    } else if (field.type === "number") {
      schema[field.name] = Yup.number().required(`${field.label} is required`);
    }
    return schema;
  }, {})
);
