import { genres } from './genres';

export function createMovieListMarkUp(movie) {
  const genreItem = movie.genre_ids.map(ID => {
    let y = [];
    genres.map(x => {
      if (x.id === ID) {
        y.push(x.name);
      }
    });
    return y.join(' ');
  });
  const voteRange = movie.vote_average;

  return ` <li class='cards-collection-item' data-id=${movie.id}>
    <div class='card-poster'>
      <img
        src='https://image.tmdb.org/t/p/w500/${movie.poster_path}'
        alt='${movie.title}'
        loading='lazy'
        onerror="this.onerror=null;this.src='https://www.successforumedu.com/uploads/logo/default.png?tr=fo-auto,di-';" />
      <span class='card-vote-average'>${voteRange.toFixed(1)}</span>
    </div>
    <div class='card-info'>
      <p class='card-title'>${movie.title}</p>
      <p class='card-text'>${genreItem}  </p>
    </div>
  </li>`;
}

//  create modal window of movie
export function createModalMovie(movie) {
  return `<div class="film-modal" data-id="${movie.id}">
  <button class="film-modal-close" type="button">
    <svg class="modal-close-ico" width="30" height="30" viewBox="0 0 30 30">
      <path
        class="modal-close-ico"
        d="M8 8L22 22"
        stroke="black"
        stroke-width="2"
      ></path>
      <path
        class="modal-close-ico"
        d="M8 22L22 8"
        stroke="black"
        stroke-width="2"
      ></path>
    </svg>
  </button>
  <div class="film-poster-wrapper">
    <button class="modal-btn-trailer" type="button">
      <img
        class="youtube-icon"
        src="https://download.logo.wine/logo/YouTube/YouTube-Icon-Full-Color-Logo.wine.png"
        width="90"
        height="70"
      />
    </button>
    <img
      class="film-poster-img"
      src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
      alt="${movie.title}"
    />
  </div>
  <div class="film-info-wrapper">
    <h2 class="film-modal-header">${movie.title}</h2>
    <ul class="film-modal-info">
      <li class="film-modal-item">
        <p class="film-item-title">Оцінка / Голосів</p>
        <p class="film-item-desc">
          <span class="vote-mod color">${movie.vote_average}</span>
          /
          <span class="vote-mod">${movie.vote_count}</span>
        </p>
      </li>
      <li class="film-modal-item">
        <p class="film-item-title">Популярність: </p>
        <p class="film-item-desc">${movie.popularity}</p>
      </li>
      <li class="film-modal-item">
        <p class="film-item-title">Оригінальна Назва: </p>
        <p class="film-item-desc original-title">${movie.original_title}</p>
      </li>
     
    </ul>
    <h3 class="film-modal-about original-title">Опис: </h3>
    <p class="film-modal-overview">${movie.overview}</p>
    <button class="js-movie-modal__btn add-queue" type="button">Переглянути пізніше</button>
  </div>
</div>`;
}

// | ${movie.release_date}
