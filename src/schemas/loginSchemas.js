import * as Yup from 'yup'

const passwordRules =
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/gm
const validationSchemas = Yup.object().shape({
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
})
export default validationSchemas
