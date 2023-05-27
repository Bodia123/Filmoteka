import { refs } from './refs';
import { genreApiRequest } from './APIrequest';

export const genres = [
  { id: 28, name: 'Бойовик' },
  { id: 12, name: 'Пригоди' },
  { id: 16, name: 'Анімація' },
  { id: 35, name: 'Комедія' },
  { id: 80, name: 'Кримінал' },
  { id: 99, name: 'Документаційний' },
  { id: 18, name: 'Драма' },
  { id: 10751, name: 'Сімейний' },
  { id: 14, name: 'Фантастика' },
  { id: 36, name: 'Історичний' },
  { id: 27, name: 'Жахи' },
  { id: 10402, name: 'Музичний' },
  { id: 9648, name: 'Містика' },
  { id: 10749, name: 'Романтичний' },
  { id: 878, name: 'Наукова фантастика' },
  { id: 10770, name: 'Телефільм ' },
  { id: 53, name: 'Триллер' },
  { id: 10752, name: 'Військовий' },
  { id: 37, name: 'Вестерн' },
];
export function getGenreNameByid(id) {
  return genres.filter(x => {
    if (x.id === id) {
      return x;
    } else 'incorrect id';
  })[0];
}

export function createGenreList() {
  return genreApiRequest().then(response => {
    response.data.genres.map(x => {
      refs.genreListEl.innerHTML += `<option name="${x.name}" value="${x.id}" id="${x.id}">${x.name}</option>`;
    });
  });
}

createGenreList();
