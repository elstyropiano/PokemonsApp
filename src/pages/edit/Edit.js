import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'

import registerImg from '../../images/registerImg.png'
import Button from '@mui/material/Button'
import loginSchemas from '../../schemas/loginSchemas'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../../Context'
import useFetch from '../../hooks/useFetch'
import EditPokemonListElement from '../../components/editPokemonListElement/EditPokemonListElement'
import { S } from './Edit.styled'
const Edit = () => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`
  const { data, loading, error } = useFetch(url)
  useEffect(() => {
    console.log(data, 'data w edit')
  }, [data])
  return (
    <>
      {data?.results.map(({ url }, index) => {
        return (
          <S.Wrapper>
            <EditPokemonListElement url={url} index={index + 1} />
          </S.Wrapper>
        )
      })}
    </>
  )
  //   const [loginError, setLoginError] = useState(false)
  //   const { setLoggedUser, usersList } = useContext(Context)
  //   const navigate = useNavigate()
  //   const onSubmit = async (values, actions) => {
  //     const isOk = usersList.some(
  //       ({ email, password }) =>
  //         email === values.email && password === values.password
  //     )
  //     if (isOk) {
  //       usersList.map(({ name, email, password }) => {
  //         if (email === values.email && password === values.password) {
  //           const data = {
  //             name,
  //             email,
  //             password,
  //           }
  //           window.localStorage.setItem('logged', JSON.stringify(data))
  //           setLoggedUser(data)
  //           navigate('/')
  //         }
  //       })
  //       await new Promise(resolve => {
  //         setTimeout(resolve, 1000)
  //       })
  //     } else setLoginError(true)
  //   }
  //   const {
  //     values,
  //     errors,
  //     touched,
  //     handleChange,
  //     isSubmitting,
  //     handleSubmit,
  //     handleBlur,
  //   } = useFormik({
  //     initialValues: { email: '', password: '' },
  //     validationSchema: loginSchemas,
  //     onSubmit,
  //   })
  //   const TextFieldStyle = { marginTop: '30px ', width: '100%' }
  //   return (
  //     <S.MainWrapper>
  //       <form onSubmit={handleSubmit} autoComplete="off">
  //         {/* <img
  //           style={{ position: 'absolute', right: '50px', top: '80px' }}
  //           src={registerImg}
  //           alt="registerImg"
  //         /> */}
  //         <S.FormWrapper>
  //           <h1 style={{ width: '100%', textAlign: 'center' }}>Logowanie</h1>
  //           <TextField
  //             id="email"
  //             label="Email"
  //             sx={TextFieldStyle}
  //             type="text"
  //             value={values.email}
  //             onChange={handleChange}
  //             onBlur={handleBlur}
  //             className={errors.name ? 'input-error' : ''}
  //             error={errors.email && touched.email ? true : false}
  //           />
  //           {touched.email && errors.email !== '' && (
  //             <S.ValidationErrorMessage>{errors.email}</S.ValidationErrorMessage>
  //           )}
  //           <TextField
  //             id="password"
  //             label="Hasło"
  //             sx={TextFieldStyle}
  //             type="password"
  //             value={values.password}
  //             onChange={handleChange}
  //             onBlur={handleBlur}
  //             error={errors.password && touched.password ? true : false}
  //           />
  //           {touched.password && errors.password !== '' && (
  //             <S.ValidationErrorMessage>
  //               {errors.password}
  //             </S.ValidationErrorMessage>
  //           )}
  //           {loginError && (
  //             <p style={{ color: '#d32f2f' }}>
  //               Wprowadź poprawne dane użytkownika
  //             </p>
  //           )}
  //           <Button
  //             sx={{ marginTop: '30px ', height: '55px', width: '100%' }}
  //             disabled={isSubmitting}
  //             type="submit"
  //             variant="contained"
  //           >
  //             Zaloguj się
  //           </Button>
  //         </S.FormWrapper>
  //         d
  //       </form>
  //     </S.MainWrapper>
  //   )
}

export default Edit
