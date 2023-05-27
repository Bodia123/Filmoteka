import Axios from 'axios';
import Notiflix from 'notiflix';

const pictureURL = 'https://image.tmdb.org/t/p/original';
const KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTFhY2Y1ZjU4OTg0MWE5ZTA5NWQ5NjJiZWQ0M2I2MCIsInN1YiI6IjY0NjcyNWU4ZDE4NTcyMDBlNWEzNGZkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P7VnYPBWXiL2bzpkeZOnFZSh1qQn0kK1ifnhSQfvLzM';

const OPTIONS_GET = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: KEY,
  },
};

export function genreApiRequest() {
  try {
    return Axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?language=uk',
      OPTIONS_GET
    );
  } catch (error) {
    console.log(error);
    Notiflix.Report.failure('Request Api error');
  }
}

export function popularMovieApiRequestByPage(page = 1) {
  try {
    return Axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=uk-UA&include_adult=false&page=${page}`,
      OPTIONS_GET
    );
  } catch (error) {
    console.log(error);
    Notiflix.Report.failure('Request Api error');
  }
}

export function filterMovieByGenre(genre, page = 1) {
  try {
    return Axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=uk-UA&include_adult=false&page=${page}&with_genres=${genre}`,
      OPTIONS_GET
    );
  } catch (error) {
    console.log(error);
    Notiflix.Report.failure('Request Api error');
  }
}
export function filterMovieByQuery(query = '', page = 1) {
  try {
    return Axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=uk-UA&page=${page}`,
      OPTIONS_GET
    );
  } catch (error) {
    console.log(error);
    Notiflix.Report.failure('Request Api error');
  }
}
export function filterMovieByid(id) {
  try {
    return Axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=uk-UA`,
      OPTIONS_GET
    );
  } catch (error) {
    console.log(error);
    Notiflix.Report.failure('Request Api error');
  }
}
