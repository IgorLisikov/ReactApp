import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      // content is a function that returns jsx expression
      content: (movie) => (
        <Like
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
        ></Like>
      ),
    },
    {
      key: "delete",
      // content is a function that returns jsx expression
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      ></Table>
    );
  }
}

export default MoviesTable;
