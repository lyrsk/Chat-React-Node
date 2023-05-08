/* eslint-disable no-undef */
import ButtonForm from '../components/button-form/ButtonForm' // ButtonForm componente
import Form from '../components/form/Form' // Form componente
import InputForm from '../components/input-form/InputForm' // InputForm componente
import { FaUserAlt, FaLock } from 'react-icons/fa' // Iconos
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // Navegación
import { Formik } from 'formik'
import axios from 'axios'
import { loginRoutes } from '../utils/APIRoutes'

export default function Login () {
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (localStorage.getItem('Aetherk')) {
  //     navigate('/')
  //   }
  // }, [])

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validate={(values) => {
          const errors = {}
          if (!values.username) {
            errors.username = 'Debe ingresar un usuario'
          }
          if (!values.password) {
            errors.password = 'Debe ingresar una contraseña'
          }

          return errors
        }}
        onSubmit={async (values, { resetForm }) => {
          resetForm()
          console.log('Enviando formulario', loginRoutes)

          const { username, password } = values
          const { data } = await axios.post(loginRoutes, { username, password })
          if (data.status === false) {
            console.log(data.message)
          }
          if (data.status === true) {
            localStorage.setItem('Aetherk', JSON.stringify(data.user))
            navigate('/')
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur
        }) => (
          <Form
            linkAccount='/register'
            account={{ children: '¿No tienes cuenta? ¡Regístrate!' }}
            onSubmit={handleSubmit}
          >
            <InputForm
              id='username'
              type='text'
              placeholder='Usuario'
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <FaUserAlt className='icon-form' />
            </InputForm>
            {touched.username && errors.username && <div className='error'>{errors.username}</div>}

            <InputForm
              id='password'
              type='password'
              placeholder='Contraseña'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <FaLock className='icon-form' />
            </InputForm>
            {touched.password && errors.password && <div className='error'>{errors.password}</div>}

            <ButtonForm type='submit'>Iniciar sesión</ButtonForm>

            <div>
              <a href='/password' className='form-forget-password'>¿Olvidaste tu contraseña?</a>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
