import Select from "react-select";
import { useField } from "remix-validated-form";

function FormSelect({ name, label, selected, ...rest }) {
  const { getInputProps, error } = useField(name);

  return (
    <div className="select">
      <label htmlFor={name} className="post-title">
        {label}
      </label>
      <br />
      <Select
        defaultValue={selected}
        {...getInputProps({ id: name, ...rest })}
      />
      {error && <span className="error-class">{error}</span>}
    </div>
  );
}
export default FormSelect;
