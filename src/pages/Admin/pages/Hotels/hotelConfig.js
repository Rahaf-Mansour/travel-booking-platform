import * as Yup from "yup";

export const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "description", label: "Description", type: "text" },
  { name: "hotelType", label: "Hotel Type", type: "number" },
  { name: "starRating", label: "Star Rating", type: "number" },
  { name: "latitude", label: "Latitude", type: "number" },
  { name: "longitude", label: "Longitude", type: "number" },
  { name: "cityId", label: "City ID", type: "number" },
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
