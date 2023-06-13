import { useField } from "remix-validated-form";

function FormSelect({ name, label, ...rest }) {
  const { getInputProps, error } = useField(name);

  return (
    <div className="select">
      <label htmlFor={name}>{label}</label>
      <br />
      <select {...getInputProps({ id: name, ...rest })} />
      {error && <span className="error-class">{error}</span>}
    </div>
  );
}
export default FormSelect;
