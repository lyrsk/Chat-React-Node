import { ButtonForm } from '../components/ButtonForm/ButtonForm' // ButtonForm componente
import { Form } from '../components/Form/Form' // Form componente
import { InputForm } from '../components/InputForm/InputForm' // InputForm componente
import { GrMail } from 'react-icons/gr'// Iconos

export default function Password () {
  return (
    <Form
      linkAccount='/login'
      account={{ children: 'o ¡Inicia sesión!' }}
    >
      <h1>Logo</h1>

      <InputForm id='email' type='email' placeholder='Ingrese su correo' autoComplete='off'>
        <GrMail />
      </InputForm>

      <ButtonForm>Cambiar contraseña</ButtonForm>
    </Form>
  )
}
