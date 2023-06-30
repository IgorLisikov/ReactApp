import React, { Component } from "react";
import "../../App.css";
import Navbar from "./navbar";
import Counters from "./counters";

class CounterPage extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  // called in MOUNT phase first
  constructor(props) {
    super(props);
    console.log("App - Constructor"); // called twice because of <React.StrictMode> in index.js
    //this.state = this.props.something; // assign state here
  }

  // called in MOUNT phase after constructor()
  // called in UPDATE phase first
  render() {
    console.log("App - Rendered");
    return (
      <React.Fragment>
        <Navbar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        ></Navbar>
        <main className="container">
          <Counters
            counters={this.state.counters} // passing data to component  (can be accessed as 'this.props.counters')
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
            onReset={this.handleReset}
            onDecrement={this.handleDecrement}
          ></Counters>
          {/* <Counters>
            <h2>Hello</h2> // passing children (can be accessed as 'this.props.children')
          </Counters> */}
        </main>
      </React.Fragment>
    );
  }

  // called in MOUNT phase after render()
  componentDidMount() {
    console.log("App - Mounted");
    // Ajax call ...      // do Ajax calls here to get data
    // this.setState(...);
  }

  handleIncrement = (counter) => {
    let counters = [...this.state.counters]; // copy array
    let index = counters.indexOf(counter); // find index
    counters[index] = { ...counter }; // assign to a copy of element
    counters[index].value++; // modify copy
    this.setState({ counters });
  };

  handleDecrement = (counter) => {
    let counters = [...this.state.counters];
    let index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    this.setState({ counters });
  };

  handleDelete = (counterId) => {
    let counters = this.state.counters.filter(
      (counter) => counter.id != counterId
    );
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };
}

export default CounterPage;
