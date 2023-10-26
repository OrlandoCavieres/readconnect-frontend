type InputField = {
  className?: string,
  defaultValue?: string,
  id?: string,
  isHidden?: boolean,
  inputRef?: any,
  onChange?: any,
  onKeyDown?: any,
  placeholder?: string,
  required?: boolean,
  style?: any,
  title?: string,
  titleRequired?: boolean,
  type?: string,
  value?: any
}


export default function InputField(props: InputField) {
  const titleRequired = props.titleRequired ?? true

  return (
    <div className='inputField_container' style={props.style || undefined}>
      {titleRequired &&
        <div style={{ paddingLeft: 5, display: 'flex', alignItems: 'center' }}>
          <div className='inputField_container__title'>
            {props.title || 'Campo de Texto'}
          </div>
          {props.required && <div className='RequiredText' style={{ marginLeft: titleRequired ? 10 : 0 }}>
            Requerido
          </div>}
        </div>
      }

      <input ref={props.inputRef}
             id={props.id || undefined}
             hidden={props.isHidden || undefined}
             className={props.className || 'inputField_container_input'}
             defaultValue={props.defaultValue || undefined}
             onChange={props.onChange || undefined}
             onKeyDown={props.onKeyDown || undefined}
             placeholder={props.placeholder || 'Texto Placeholder'}
             type={props.type || 'text'}
             value={props.value || undefined}/>
    </div>
  )
}
