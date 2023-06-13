import { useField } from "remix-validated-form";

function FormInput({ name, label, ...rest }) {
  const { error, getInputProps } = useField(name);
  return (
    <div className="post-title">
      <label htmlFor={name}>{label}</label>
      <br />
      <input {...getInputProps({ id: name, ...rest })} />
      {error && <span className="error-class">{error}</span>}
    </div>
  );
}

export default FormInput;
