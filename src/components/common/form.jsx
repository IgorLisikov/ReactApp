import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  // validate all inputs; used on submitting of the form:
  validate = () => {
    // Joi validtion:
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    const errors = {};
    result.error.details.map((x) => (errors[x.path[0]] = x.message));
    return errors;

    // basic validation:
    // const errors = {};
    // const { username, password } = this.state.data;
    // if (username.trim() === "") errors.username = "Username is required.";
    // if (password.trim() === "") errors.password = "Password is required.";
    // return Object.keys(errors).length === 0 ? null : errors;
  };

  // validate single input; used on every value change, not waiting for submitting of the form:
  validateProperty = ({ name, value }) => {
    // Joi validation:
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] }; // 'schema' is a schema for a single property (subschema)
    // this.schema[name] - this allows to take validation rule from 'this.schema' by property name
    const result = Joi.validate(obj, schema);
    return result.error ? result.error.details[0].message : null;

    // basic validation:
    // if (name === "username")
    //   if (value.trim() === "") return "Username is required.";

    // if (name === "password")
    //   if (value.trim() === "") return "Password is required.";
  };

  handleSubmit = (e) => {
    e.preventDefault(); // prevents the default behaviour (which are submitting the form to the server and page reload)

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // const username = document.getElementById("username").value;   - how to get the value of DOM element in javascript

    // if refs are used: 3 - get the value of DOM element using refs;
    // const username = this.username.current.value;

    this.doSubmit();
  };

  // Method to rerender the element and display updated value on every change made by user in the element (on user input):
  handleChange = ({ currentTarget: input }) => {
    // 'currentTarget' is an element (<input>) that triggered the event: e.currentTarget;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value; // 'name' and 'value' are attributes of the element
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      ></Input>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      ></Select>
    );
  }
}
export default Form;
