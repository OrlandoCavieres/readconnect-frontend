import React from 'react'
import Select from "react-select"


type SelectCustomProps = {
  defaultValue?: any,
  isMulti?: boolean,
  isOptionDisabled?: any,
  isRequired?: boolean,
  name?: string,
  onChange: any,
  options?: any,
  value?: any,
}


export const GlobalSelectStyles = {
  option: (styles: any, {isFocused, isSelected}: any) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#654b6b'
        : isFocused ? '#b6acba' : undefined
    }
  },
  control: (baseStyles: any, {isFocused}: any) => {
    return {
      ...baseStyles,
      outline: isFocused ? `2px solid #654b6b` : '0 solid transparent',
      border: isFocused ? 0 : undefined
    }
  }
}


export default function SelectCustom(props: SelectCustomProps) {
  return(
    <Select placeholder="Selecciona..."
            name={props.name}
            required={props.isRequired}
            options={props.options}
            value={props.value}
            isMulti={props.isMulti}
            styles={GlobalSelectStyles}
            onChange={e => props.onChange(e)}
            isOptionDisabled={props.isOptionDisabled}
            defaultValue={props.defaultValue || undefined}/>
  )
}
