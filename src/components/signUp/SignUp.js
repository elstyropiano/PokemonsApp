import React from 'react'
import { Form, Formik } from 'formik'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
const SignUp = () => {
  const inputStats = [
    { label: 'Imie', type: 'text' },
    { label: 'Email', type: 'text' },
    { label: 'Password', type: 'password' },
    { label: 'Repeat password', type: 'password' },
  ]
  const TextFieldStyle = { margin: '20px', width: '500px' }
  return (
    <div>
      {inputStats.map(({ label, type }) => (
        <TextField
          id="outlined-password-input"
          label={label}
          sx={TextFieldStyle}
          type={type}
          autoComplete="current-password"
        />
      ))}
      <Button variant="contained">Zarejestruj się</Button>
    </div>
  )
}

export default SignUp
