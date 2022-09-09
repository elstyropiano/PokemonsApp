import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import { S } from './Register.styled'
import registerImg from '../../images/registerImg.png'
import Button from '@mui/material/Button'
import validationSchemas from '../../schemas/validationSchemas'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../../Context'
import axios from 'axios'

const Register = () => {
  const [exsist, setExsist] = useState(false)
  const { loggedUser, setLoggedUser, usersList, setUsersList } =
    useContext(Context)
  const navigate = useNavigate()

  const onSubmit = async (values, actions) => {
    const isThere = usersList.some(({ name, email }) =>
      name === values.name || email === values.email ? true : false
    )
    if (isThere) {
      usersList.map(({ name, email }) => {
        console.log(name, email, 'items w maie')
        if (name === values.name || email === values.email) setExsist(true)
      })
    } else {
      await new Promise(resolve => {
        setTimeout(resolve, 1000)
      })
      const newUsersList = [...usersList, values]

      const dataToLocalStorage = {
        name: values.name,
        email: values.email,
        password: values.password,
      }
      window.localStorage.setItem('logged', JSON.stringify(dataToLocalStorage))
      actions.resetForm()
      setExsist(false)
      setLoggedUser(dataToLocalStorage)
      setUsersList(newUsersList)
      navigate('/')

      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
      }
      postDataOnServer(data)
    }
  }

  const postDataOnServer = async data =>
    await axios
      .post(`http://localhost:3000/users`, { ...data })
      .then(response => console.log(response))
      .catch(error => console.log(error))

  const {
    values,
    errors,
    touched,
    handleChange,
    isSubmitting,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: validationSchemas,
    onSubmit,
  })

  const TextFieldStyle = { marginTop: '30px ', width: '100%' }

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('users'))
  //   setItems(items)
  // }, [])
  const data = {
    ...values,
    data: { stats: [], arenaMembers: [], favouritesPokemons: [] },
  }
  console.log(data, 'data')
  return (
    <S.MainWrapper>
      {/* {loggedUser && <Navigate to="/" />} */}
      <form onSubmit={handleSubmit} autoComplete="off">
        {/* <img
          style={{ position: 'absolute', right: '50px', top: '80px' }}
          src={registerImg}
          alt="registerImg"
        /> */}
        <S.FormWrapper>
          <h1 style={{ width: '100%', textAlign: 'center' }}>Rejestracja</h1>
          <TextField
            id="name"
            label="Imię"
            sx={TextFieldStyle}
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name ? 'input-error' : ''}
            error={errors.name && touched.name ? true : false}
          />
          {touched.name && errors.name !== '' && (
            <S.ValidationErrorMessage>{errors.name}</S.ValidationErrorMessage>
          )}
          <TextField
            id="email"
            label="Email"
            sx={TextFieldStyle}
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email ? true : false}
          />
          {touched.email && errors.email !== '' && (
            <S.ValidationErrorMessage>{errors.email}</S.ValidationErrorMessage>
          )}
          <TextField
            id="password"
            label="Hasło"
            sx={TextFieldStyle}
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password ? true : false}
          />
          {touched.password && errors.password !== '' && (
            <S.ValidationErrorMessage>
              {errors.password}
            </S.ValidationErrorMessage>
          )}
          <TextField
            id="confirmPassword"
            label="Potwierdź hasło"
            sx={TextFieldStyle}
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.confirmPassword && touched.confirmPassword ? true : false
            }
          />
          {touched.confirmPassword && errors.confirmPassword !== '' && (
            <S.ValidationErrorMessage>
              {errors.confirmPassword}
            </S.ValidationErrorMessage>
          )}
          {exsist && (
            <p style={{ color: '#d32f2f' }}>Imię lub email istnieje </p>
          )}
          <Button
            sx={{ marginTop: '30px ', height: '55px', width: '100%' }}
            disabled={isSubmitting}
            type="submit"
            variant="contained"
          >
            Zarejestruj się
          </Button>
        </S.FormWrapper>
      </form>
    </S.MainWrapper>
  )
}

export default Register
