import * as Yup from 'yup'

const passwordRules =
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/gm
const validationSchemas = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Imię musi mieć conajmniej 3 znaki')
    .max(15, 'Imię nie może mieć więcej jak 15 znaków')
    .required('Wypełnij pole'),
  email: Yup.string()
    .email('Format email jest niepoprawny')
    .required('Wypełnij pole'),
  password: Yup.string()
    .min(
      8,
      'Hasło musi mieć  minimum 8 znaków,1 dużą litere, 1 cyfrę, 1 znak specjalny'
    )
    .matches(passwordRules, {
      message:
        'Hasło musi mieć  minimum 8 znaków,1 dużą literę, 1 cyfrę, 1 znak specjalny',
    })
    .required('Wypełnij pole'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Hasła muszą być identyczne')
    .required('Wypełnij pole'),
})
export default validationSchemas
