import { useEffect, useState } from "react"

  
  export function FormField({ htmlFor, label, type = 'text', value, onChange = () => {}, error = "" }) {
    const [errorText, setErrorText] = useState(error)

    useEffect(() => {
        setErrorText(error)
    }, [error])
    return (
      <>
        <label htmlFor={htmlFor} >
          {label}
        </label>
        <input onChange={e => {
            onChange(e)
            setErrorText('')
        }} type={type} id={htmlFor} name={htmlFor} className="text-input" value={value} />
        <div className="error-message">
            {errorText || ''}
        </div>
      </>
    )
  }