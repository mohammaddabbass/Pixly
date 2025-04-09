import './styles.css';

const SelectGroup = ({ label, name, options, placeholder, onChange, value }) => {
  return (
    <div className="select-group flex column">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        className="input-component"
        onChange={onChange}
        value={value}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGroup;