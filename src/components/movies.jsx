import React, { Component } from "react";
import { toast } from "react-toastify";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import { Link } from "react-router-dom";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [], // must be initialized to empty array
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }, // 'path' is a path to a property (like 'movie.title'),
  };

  constructor() {
    super();
    // BINDING 'THIS' FOR EVENTS:
    // this.handleDelete = this.handleDelete.bind(this);
    // binding is needed, because in onClick 'handleDelete' will be called as a standalone function, so otherwise 'this' in it will be undefined.
    // If handleDelete is defined via arrow function '()=>{}', then no explicit binding is required
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  getMovieClasses(count) {
    // RENDERING CLASSES DYNAMICALLY:
    let classes = "badge m-2 badge-";
    classes += count > 5 ? "warning" : "primary";
    return classes;
  }

  // use arrow functions when need to access 'this'
  handleDelete = (movie) => {
    // UPDATING THE STATE:
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies }); // same as: this.setState({ movies: movies });
    // if new property is passed to setState() that 'state' object currently does not have - it will be added to state object
    // toast.success("Deleted");
    toast.info("Deleted");
    // toast("Deleted");
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  // renderTags() {
  //   // RENDERING LISTS:
  //   return (
  //     <ul>
  //       {this.state.tags.map((tag) => (
  //         <li key={tag}>{tag}</li>
  //       ))}
  //     </ul>
  //   ); // 'key={tag}' is required so that each item will have a unique key
  // }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: moviesCount } = this.state.movies; // destructuring, same as: const moviesCount =  this.state.movies.length;
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    if (moviesCount === 0) {
      return <p>There are no movies in the database.</p>;
    }

    const { totalCount, data: movies } = this.getPagedData();

    // the returned value of render() is JSX Expression - javascript XML (not 'string' or HTML)
    return (
      // <React.Fragment> is the root element; simple <div> can be used instead
      // && is used as 'if()' condition; if condition evaluates to true, then the message is returned; else - 'false' is returned and is ignored
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            // valueProperty="_id"     // don't need to pass this arguments, since they are the same as in the defaultProps of the ListGroup component
            // textProperty="name"
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          ></ListGroup>
        </div>
        <div className="col">
          <span className={this.getMovieClasses(totalCount)}>
            {
              //  CONDITIONAL RENDERING:
              /* {totalCount > 5 &&
              "Color will change to blue when there are 5 or less movies left"}
            {totalCount < 6 && "Color changed!"} */
            }
          </span>
          <Link
            to={"/movies/new"}
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
          ></SearchBox>
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          ></MoviesTable>
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default Movies;
