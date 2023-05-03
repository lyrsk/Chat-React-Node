import { ButtonForm } from '../components/ButtonForm/ButtonForm' // ButtonForm componente
import { Form } from '../components/Form/Form' // Form componente
import { InputForm } from '../components/InputForm/InputForm' // InputForm componente
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai' // Iconos
import { useNavigate } from 'react-router-dom' // Navegación
import { Formik } from 'formik'
import axios from 'axios'
import { registerRoutes } from '../utils/APIRoutes'
import { useEffect } from 'react'

export default function Register () {
  const navigate = useNavigate()

  useEffect(() => { // Mantiene la sesión iniciada
    if (localStorage.getItem('Aetherk')) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validate={(values) => {
          const errors = {}

          if (!values.username) {
            errors.username = 'Ingrese un usuario válido'
          } else if (!/^[a-zA-Z0-9._-]{4,32}(?<![-';%])$/i.test(values.username)) {
            errors.username = 'El usuario debe contener entre 4 y 32 caracteres y puede contener letras, números, guiones bajos y puntos.'
          }

          if (!values.email) {
            errors.email = 'Ingrese un correo válido'
          } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(values.email)
          ) {
            errors.email =
              'Correo eléctronico inválido'
          }

          if (!values.password) {
            errors.password = 'Ingresa una contraseña'
          } else if (
            !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,255}$/i.test(values.password)
          ) {
            errors.password =
              'La contraseña debe contener al menos 8 caracteres, una letra y un número.'
          }

          if (!values.confirmPassword) {
            errors.confirmPassword = 'Ingrese una contraseña'
          } else if (
            !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,255}$/i.test(values.confirmPassword)
          ) {
            errors.confirmPassword =
              'La contraseña debe contener al menos 8 caracteres, una letra y un número.'
          }

          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden'
          }

          return errors
        }}
        onSubmit={async (values, { resetForm }) => {
          resetForm()
          console.log('Enviando formulario', registerRoutes)
          const { username, email, password } = values
          const { data } = await axios.post(registerRoutes, { username, email, password })
          console.log(data)
          if (data.status === false) {
            console.log(data.message)
          }
          if (data.status === true) {
            console.log('test 1')
            localStorage.setItem('Aetherk', JSON.stringify(data.user))
            navigate('/')
            console.log('test 2')
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
            action=''
            onSubmit={handleSubmit}
            linkAccount='/login'
            account={{ children: 'o ¡Inicia sesión!' }}
          >
            <InputForm
              id='username'
              name='username'
              type='text'
              placeholder='Ingrese su usuario'
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <AiOutlineUser />
            </InputForm>
            {touched.username && errors.username && <div className='error'>{errors.username}</div>}

            <InputForm
              id='email'
              name='email'
              type='email'
              placeholder='Ingrese su correo'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <AiOutlineMail />
            </InputForm>
            {touched.email && errors.email && <div className='error'>{errors.email}</div>}

            <InputForm
              id='password'
              name='password'
              type='password'
              placeholder='Ingrese su contraseña'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <AiOutlineLock />
            </InputForm>
            {touched.password && errors.password && <div className='error'>{errors.password}</div>}

            <InputForm
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              placeholder='Confirme su contraseña'
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <AiOutlineLock />
            </InputForm>
            {touched.confirmPassword && errors.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}

            <ButtonForm type='submit'>Crear cuenta</ButtonForm>
          </Form>
        )}
      </Formik>
    </>
  )
}
