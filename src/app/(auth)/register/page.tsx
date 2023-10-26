'use client'

import { useRef, useState } from 'react'
import InputField from '@/components/forms/InputField'
import Button from '@/components/Button'
import { useMutation } from 'react-relay'
import { useRouter } from 'next/navigation'
import store from '@/store'
import { loginAction } from '@/store/slices/UserInformation'
import { RegisterUser } from '@/schema/RegisterUser'


type RegisterError = {
  field: string,
  errors: string[]
}


export default function Register() {
  const [responseErrorMessage, setResponseErrorMessage] = useState('')
  const [errors, setErrors] = useState<RegisterError[]>([])
  const [commitRegister, loadingRegister] = useMutation(RegisterUser)
  const router = useRouter()

  const nameField = useRef<HTMLInputElement>(null)
  const emailField = useRef<HTMLInputElement>(null)
  const passwordField = useRef<HTMLInputElement>(null)

  const sendData = () => {
    const nameState = nameField?.current
    const emailState = emailField?.current
    const passwordState = passwordField?.current
    const name = nameState?.value
    const email = emailState?.value
    const password = passwordState?.value

    setErrors([])
    setResponseErrorMessage('')

    commitRegister({
      variables: { email, password, name },
      onCompleted(data: any) {
        if (data.register.__typename === 'AuthSuccess') {
          store.dispatch(loginAction(data.register))
          router.push('/app')
        }
        else {
          setResponseErrorMessage(data.register.message)
          setErrors(data.register.fields)
        }
      }
    })
  }

  return (
    <div className='login'>
      <div className='login_card'>
        <div className='h2_b_textAlternative'>
          Registro
        </div>

        <div className='login_card_inputContainer'>
          <InputField id='nameRegisterField'
                      inputRef={emailField}
                      title='Tu nombre'
                      titleRequired
                      placeholder='Nombre'
                      type='email' />

          <InputField id='emailRegisterField'
                      inputRef={emailField}
                      title='Tu correo electrónico'
                      titleRequired
                      required
                      placeholder='usuario@mail.com'
                      type='email' />

          <InputField id='passwordRegisterField'
                      inputRef={passwordField}
                      title='Tu contraseña'
                      titleRequired
                      required
                      placeholder={'⦁'.repeat(8)}
                      type='password' />
        </div>

        {responseErrorMessage &&
          <div className='login_card_messages'>
            {responseErrorMessage}
            { errors.map(error => {
              return (
                <div key={error.field}>
                  * {error.field} : {error.errors}
                </div>
              )
            }) }
          </div>
        }

        <div className='login_card_buttonContainer'>
          <Button text='Unirse y Entrar' onClick={() => sendData()} />
        </div>
      </div>
    </div>
  )
}
