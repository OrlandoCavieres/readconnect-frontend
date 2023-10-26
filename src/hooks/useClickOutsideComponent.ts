import { RefObject, useEffect, useState } from "react"

function useClickOutsideComponent(ref: RefObject<HTMLDivElement>) {
  const [isClickOutside, setIsClickOutside] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as HTMLDivElement)) setIsClickOutside(true)
      else setIsClickOutside(false)
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [ref])

  return isClickOutside
}

export default useClickOutsideComponent
