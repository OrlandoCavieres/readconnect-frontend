'use client'

import { useSelector } from 'react-redux'
import store, { RootState } from '@/store'
import { useRef, useState } from 'react'
import { MdCancel, MdCheckCircle, MdEdit } from 'react-icons/md'
import InputField from '@/components/forms/InputField'
import { useMutation } from 'react-relay'
import { EditProfile } from '@/schema/EditProfile'
import { editNameAction } from '@/store/slices/UserInformation'

function NameDisplay() {
  const [isEdit, setIsEdit] = useState(false)
  const userData = useSelector((state: RootState) => state.user.user)
  const [commitProfileEdit, loadingEdit] = useMutation(EditProfile)

  const nameInputRef = useRef<HTMLInputElement>(null)

  const confirmEdit = () => {
    const nameState = nameInputRef?.current
    const name = nameState?.value

    commitProfileEdit({
      variables: { name },
      onCompleted: (data: any) => {
        if (data.editProfile.__typename === 'Success') {
          store.dispatch(editNameAction({ name }))
          setIsEdit(false)
        }
      }
    })
  }

  return (
    <div className='profileCard'>
      <div className='profileCard_field'>
        <div className='profileCard_field_name'>
          Correo:
        </div>

        <div style={{ width: 250 }}>
          {userData.email}
        </div>
      </div>

      <div className='profileCard_field'>
        <div className='profileCard_field_name'>
          Nombre:
        </div>

        {!isEdit &&
          <>
            <div style={{ width: 250 }}>
              {userData.name ?
                userData.name :
                <span className='h5_l_danger'>--</span>}
            </div>
            <MdEdit className='profileCard_buttonIcon' onClick={() => setIsEdit(true)} />
          </>
        }

        {isEdit &&
          <>
            <InputField id='EditPofileName'
                        inputRef={nameInputRef}
                        titleRequired={false}
                        style={{ width: 250 }}
                        defaultValue={userData.name}
                        placeholder='Ingrese su nombre' />
            <MdCheckCircle className='profileCard_buttonIcon' onClick={() => confirmEdit()} />
            <MdCancel className='profileCard_buttonIcon' onClick={() => setIsEdit(false)} />
          </>
        }
      </div>
    </div>
  )
}


export default function Profile() {
  return (
    <main className='profileContainer'>
      <h3 className='h3_b_secondary'>Mis Datos</h3>
      <NameDisplay />
    </main>
  )
}
