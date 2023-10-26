'use client'

import { useRef, useState } from 'react'
import InputField from '@/components/forms/InputField'
import Button from '@/components/Button'
import { useMutation } from 'react-relay'
import { LoginUser } from '@/schema/LoginUser'
import { useRouter } from 'next/navigation'
import store from '@/store'
import { loginAction } from '@/store/slices/UserInformation'


export default function Login() {
  const [responseLoginMessage, setResponseLoginMessage] = useState('')
  const [commitLogin, loadingLogin] = useMutation(LoginUser)
  const router = useRouter()

  const emailField = useRef<HTMLInputElement>(null)
  const passwordField = useRef<HTMLInputElement>(null)

  const sendData = () => {
    const emailState = emailField?.current
    const passwordState = passwordField?.current
    const email = emailState?.value
    const password = passwordState?.value

    setResponseLoginMessage('')

    commitLogin({
      variables: { email, password },
      onCompleted(data: any) {
        if (data.login.__typename === 'AuthSuccess') {
          store.dispatch(loginAction(data.login))
          router.push('/app')
        }
        else {
          setResponseLoginMessage(data.login.message)
        }
      }
    })
  }

  return (
    <div className='login'>
      <div className='login_card'>
        <div className='h2_b_textAlternative'>
          Login
        </div>

        <div className='login_card_inputContainer'>
          <InputField id='emailLoginField'
                      inputRef={emailField}
                      title='Tu correo electrónico'
                      titleRequired
                      placeholder='usuario@mail.com'
                      type='email' />

          <InputField id='passwordLoginField'
                      inputRef={passwordField}
                      title='Tu contraseña'
                      titleRequired
                      placeholder={'⦁'.repeat(8)}
                      type='password' />
        </div>

        {responseLoginMessage &&
          <div className='login_card_messages'>
            {responseLoginMessage}
          </div>
        }

        <div className='login_card_buttonContainer'>
          <Button text='Ingresar' onClick={() => sendData()} />
        </div>
      </div>
    </div>
  )
}
