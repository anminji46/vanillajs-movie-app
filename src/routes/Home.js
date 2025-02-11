import HeadLine from '../components/HeadLine';
import MovieList from '../components/MovieList';
import MovieListMore from '../components/MovieListMore';
import Search from '../components/Search';
import { Component } from '../core/coreMovie';

export default class Home extends Component {
  render() {
    const headLine = new HeadLine().el;
    const search = new Search().el;
    const movieList = new MovieList().el;
    const movieListMore = new MovieListMore().el;
    this.el.classList.add('container')
    this.el.append(
      headLine,
      search,
      movieList,
      movieListMore
    )
  }
};