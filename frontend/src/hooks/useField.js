import { useState } from 'react'

const useField = (type, validate, asyncValidate) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [style, setStyle] = useState()

  const onChange = async event => {
    if (validate) {
      const error = validate(event.target.value)
      handleInvalidInput(error)
    } else if (asyncValidate) {
      asyncValidate(event.target.value)
        .then(error => {
          handleInvalidInput(error)
        })
        .catch(error => console.log(error))
    }

    setValue(event.target.value)
  }

  const handleInvalidInput = error => {
    if (error) {
      setError(error)
      setStyle({ borderColor: 'red' })
    } else {
      setError('')
      setStyle(null)
    }
  }

  const set = v => {
    setValue(v)
    setError('')
    setStyle(null)
  }

  return {
    error,
    set,
    type,
    value,
    onChange,
    style
  }
}

export default useField
