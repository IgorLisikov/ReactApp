import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  // Joi validtion:
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  // if refs are used: 1 - create referense to DOM element:
  // username = React.createRef();

  doSubmit = () => {
    console.log("Submitted"); // call the server to update the data
    // redirect user to different page
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {/* <div className="form-group">                // this lines are commented because they extracted into 'Input' component
            <label htmlFor="username">Username</label>
            <input
              //   if refs are used: 2 - set 'ref' attribute to reference created earlier:
              //   ref={this.username}
              value={data.username}
              onChange={this.handleChange}
              id="username"
              name="username"
              type="text"
              className="form-control"
            />
          </div> */}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
