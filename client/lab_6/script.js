const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const resturants = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => resturants.push(...data));

function findMatches(wordToMatch, resturants) {
  return resturants.filter((place) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, resturants);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, 'gi');
      // const cityName = place.city.replace(regex, `<span class="hl>"${this.value}</span>`);
      // const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
      return `
                        <li>
                            <span class="name">${place.name}</span><br>
                            <span class="category">${place.category}</span><br>
                            <span class="address"><i>${place.address_line_1}</i></span><br>
                            <span class="city"><i>${place.city}</i></span><br>
                            <span class="zip"><i>${place.zip}</i></span>
                        </li>
                    `;
    })
    .join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

/*
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map((place) => {
    const regex = new RegExp(this.value, 'gi');
    //const cityName = place.city.replace(regex, `<span class="hl>"${this.value}</span>`);
    //const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
                      <li>
                          <span class="name">${place.city}, ${place.state}</span>
                          <span class="population">${numberWithCommas(place.population)}</span>
                      </li>
                  `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
*/
