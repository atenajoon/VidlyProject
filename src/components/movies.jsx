import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { Link } from "react-router-dom";
import SearchBox from "./search";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import _, { filter } from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "",
    searchQuery: "",
    sortColumn: { sortBy: "title", order: "asc" },
  };

  componentDidMount() {
    let genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
    });
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: "", currentPage: 1 });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleLike = (movie) => {
    const cloneMovies = [...this.state.movies];
    const index = cloneMovies.indexOf(movie);

    cloneMovies[index] = { ...cloneMovies[index] };
    cloneMovies[index].liked = !cloneMovies[index].liked;

    this.setState({
      movies: cloneMovies,
    });
  };

  handleDelete = (movie) => {
    let newList = this.state.movies.filter((m) => m._id !== movie._id);

    this.setState({
      movies: newList,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSave = () => {
    console.log("saved");
  };

  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.sortBy], [sortColumn.order]);

    const listedMovies = paginate(sorted, pageSize, currentPage);

    return { filtered, listedMovies };
  };

  render() {
    const {
      movies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    if (movies.length === 0) return <p>There are no movies in the database!</p>;

    const { filtered, listedMovies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>

          <p>Showing {filtered.length} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          <MoviesTable
            movies={listedMovies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            totalItems={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
