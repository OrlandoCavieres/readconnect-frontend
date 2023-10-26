type ButtonProps = {
  className?: string,
  disabled?: boolean,
  onClick?: any,
  style?: any,
  text?: string
}

export default function Button(props: ButtonProps) {
  return (
    <button className={props.className || 'Button_primary_filled'}
            disabled={props.disabled || false}
            style={props.style}
            onClick={props.onClick || undefined}>
      {props.text || 'TEXTO'}
    </button>
  )
}
