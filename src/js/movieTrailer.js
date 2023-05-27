import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { startLoader, stopLoader } from './loader';
import { filterMovieByid } from './APIrequest';
import Axios from 'axios';

const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTFhY2Y1ZjU4OTg0MWE5ZTA5NWQ5NjJiZWQ0M2I2MCIsInN1YiI6IjY0NjcyNWU4ZDE4NTcyMDBlNWEzNGZkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P7VnYPBWXiL2bzpkeZOnFZSh1qQn0kK1ifnhSQfvLzM';
const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';

async function getMoviesTrailer(movieTitle) {
  const url = `${BASE_URL}/search?part=snippet&maxResults=1&q=${movieTitle}&key=AIzaSyCVJtDEpn2VDC8Gaxpc6gAfbCDhDbwjKfA&type=video`;
  const response = await Axios.get(url);
  return response.data;
}
export async function watchFilmTrailer(filmId) {
  try {
    const resultData = await filterMovieByid(filmId);
    getMovieTitle(resultData.data);
  } catch (error) {
    console.log(error);
  }
}

function getMovieTitle(result) {
  const trailerTitle = result.title.replaceAll(' ', '+').concat('+trailer');
  onTrailerClick(trailerTitle);
}

async function onTrailerClick(movieTitle) {
  try {
    const youTubeQuery = await getMoviesTrailer(movieTitle);
    startLoader();
    const youTubeData = youTubeQuery.items;
    const videoData = youTubeData[0].id.videoId;
    renderTrailer(videoData);
  } catch (eror) {
    console.log(eror);
  }
}

let instance;

function renderTrailer(videoId) {
  const markup = `<iframe class="trailer-container" width="420" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
  instance = basicLightbox.create(markup);
  stopLoader();
  instance.show();
}
