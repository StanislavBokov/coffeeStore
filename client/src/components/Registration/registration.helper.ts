import * as yup from 'yup';

export const inputHelper = [
  
  { id: '1', name: "name", placeholder: "Name *" },
  { id: '2', name: "numberPhone", placeholder: "Number phone *" },
  { id: '3', name: "email", placeholder: "E-mail *" },
  { id: '4', name: "password", placeholder: "Password *" }
]

export const validateScheme = yup.object().shape({
  // passwordConfirmation:yup.string()
  //   .oneOf([yup.ref('password'), null], 'Passwords must match'),
  password:yup
    .string()
    .required("Password is required")
    .matches(/(?=.*[A-Z])/, "Password must be contain at lest one capital letter ")
    .matches(/(?=.*[0-9])/, "Password must be contain at least one number")
    .min(8, "Min length eight symbols"),
  email:yup
    .string()
    .required("Email is required")
    .email("Enter correct E-mail"),
  numberPhone:yup
    .string()
    .required("Number phone is required")
    .matches(/(^[7|8]{0,1}\d{10}$)|(^\+7{1}\d{10}$)/, "Enter correct number"),
  name:yup
    .string()
    .required("Name is required")
    .min(2, "Min length two symbols")
});