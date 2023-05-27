import Notiflix from 'notiflix';
import { refs } from './refs';
import { renderPagination, IN_MAIN_POPULAR } from './pagination.js';
import { createGenreList } from './genres';
import {
  filterMovieByGenre,
  popularMovieApiRequestByPage,
  filterMovieByQuery,
  filterMovieByid,
} from './APIrequest';
import { createMovieListMarkUp, createModalMovie } from './markUp';
import { startLoader, stopLoader } from './loader';
import { watchFilmTrailer } from './movieTrailer';
const basicLightbox = require('basiclightbox');
import * as basicLightbox from 'basiclightbox';

// функция для генерации списка по запросу в колбек
function generateMovieList(moviesApiList) {
  try {
    stopLoader();
    return moviesApiList.map(element => {
      refs.movieMainList.insertAdjacentHTML(
        'beforeend',
        createMovieListMarkUp(element)
      );
    });
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(error.message);
  }
}
createGenreList();

// секція для роботи з жанрами та секцією по жанрам
refs.genreListEl.addEventListener('change', getMoviesByGenre);
async function getMoviesByGenre(event) {
  startLoader();

  refs.movieMainList.innerHTML = '';
  const movieListByGenre = await filterMovieByGenre(event.target.value);
  const result = movieListByGenre.data.results;

  generateMovieList(result);
}
// головна функція для малювання головної сторінки
async function createLoadList(page = 1) {
  startLoader();

  refs.movieMainList.innerHTML = '';
  const movieListByGenre = await popularMovieApiRequestByPage(page);
  const result = movieListByGenre.data.results;
  generateMovieList(result);
}

createLoadList();

// функція для фільтрації по запиту
refs.hederFormEl.addEventListener('submit', getMovieByQuery);
async function getMovieByQuery(event) {
  try {
    event.preventDefault();
    startLoader();
    refs.movieMainList.innerHTML = '';
    const movieListByGenre = await filterMovieByQuery(event.target[0].value);
    const result = movieListByGenre.data.results;
    if (result.length === 0) {
      Notiflix.Notify.failure(`
request without result`);
      stopLoader();
      return;
    }

    generateMovieList(result);
    event.target[0].value = '';
  } catch (error) {
    console.log(error);
  }
}

//  модалка
refs.movieMainList.addEventListener('click', handleCardClick);

async function handleCardClick(event) {
  let filmId = event.target.closest('li').dataset.id;
  let instance;
  startLoader();
  await renderMarkup(filmId)
    .then(markup => {
      return (instance = basicLightbox.create(markup, {
        onShow: () => {
          document.body.classList.toggle('no-scroll');
          stopLoader();
          //   window.addEventListener('keydown', onEscPress);
        },
        onClose: () => {
          document.body.classList.toggle('no-scroll');
          //   window.removeEventListener('keydown', onEscPress);
        },
      }));
    })
    .then(() => {
      instance.show(() => {});

      addListenerForTrailer(
        document.querySelector('.modal-btn-trailer'),
        filmId
      );
      console.log(filmId);
    });
  const queueEl = document.querySelector('.add-queue');
  queueEl.addEventListener('click', () =>
    localStorage.setItem('id-film', `${filmId}`)
  );

  stopLoader();
}

async function renderMarkup(filmId) {
  try {
    let markup;
    const resultData = await filterMovieByid(filmId);
    const movieItem = document.querySelector('.colletion-item');

    markup = createModalMovie(resultData.data);

    return markup;
  } catch (error) {
    console.log(error);
  }
}

function addListenerForTrailer(trailerBtn, filmId) {
  trailerBtn.addEventListener('click', () => {
    watchFilmTrailer(filmId);
  });
}

//  переглянути пізінше

function queueClick(event) {}
