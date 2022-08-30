import * as yup from 'yup';

export const validateScheme = yup.object().shape({
  passwordConfirmation:yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  password:yup
    .string()
    .required("Пароль обязателен для заполнения")
    .matches(/(?=.*[A-Z])/, "Пароль должен содержать хотя бы одну заглавную букву")
    .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одно число")
    .min(8, "Пароль должен содержать минимум 8 символов"),
  email:yup.
    string()
    .required("Электронная почта обязательная для заполнения")
    .email("Email введен не корректно"),
  name:yup
    .string()
    .required("Имя обязательно для заполнения")
    .min(2, "Имя должно состоять минимум из двух символов")
});