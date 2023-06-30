import React from "react";

const Input = ({ name, value, label, onChange, error, type }) => {
  // const Input = ({ name, label, error, ...rest }) => {   - using ...rest parameter
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        className="form-control"

        //     using ...spread operator:
        // {...rest}
        // name={name}
        // id={name}
        // className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
