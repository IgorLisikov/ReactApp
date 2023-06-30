import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import CounterPage from "./components/counter/counterPage";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// this is main component
function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar></NavBar>
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/customers" component={Customers} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          {/* PASSING PROPS TO COMPONENT:
          <Route path="/movies" render={(props)=> <Movies someProperty="value" {...props} />}> 
          {...props} is needed in order not to lose other props like 'history', 'location', 'match'*/}
          <Route path="/rentals" component={Rentals} />
          <Route path="/counter" component={CounterPage} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
