import * as yup from "yup";

export const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is Required"),
  name: yup
    .string("Full Name must be a string")
    .required("Full Name is Required"),
  specialRequest: yup.string("Special request must be a string"),
});
