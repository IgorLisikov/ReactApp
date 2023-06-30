import React, { Component } from "react";

class Counter extends Component {
  render() {
    console.log("Counter - Rendered");
    return (
      <div className="row">
        <div className="col-1">
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        </div>
        <div className="col">
          <button
            onClick={() => {
              this.props.onIncrement(this.props.counter);
            }}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            onClick={() => {
              this.props.onDecrement(this.props.counter);
            }}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.props.counter.value === 0}
          >
            -
          </button>
          <button
            onClick={() => {
              this.props.onDelete(this.props.counter.id);
            }}
            className="btn btn-danger btn-sm"
          >
            x
          </button>
        </div>
      </div>
    );
  }

  // called in UPDATE phase after render()
  componentDidUpdate(prevProps, prevState) {
    console.log("Counter - Updated");
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);

    if (prevProps.someValue !== this.props.someValue) {
      // Ajax call ...      // use conditions based on state or props to do Ajax calls here to get new data
      // this.setState(...);
    }
  }

  // called in UNMOUNT phase before element is removed from the DOM
  componentWillUnmount() {
    console.log("Counter - Unmount");
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
