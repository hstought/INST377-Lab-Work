function mapInit() {
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaHN0b3VnaHQiLCJhIjoiY2t1cmdpeDJhMGFhaTMxcWp6ZzFtaGp3bCJ9.sCkx1d_mxbcCHjb6Na-q6A'
  }).addTo(mymap);
}

async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  mapInit();

  const request = await fetch(endpoint);

  const resturants = await request.json();

  function findMatches(wordToMatch, resturants) {
    return resturants.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, resturants);
    const html = matchArray
      .map((place) => {
        const regex = new RegExp(event.target.value, 'gi');
        // const cityName = place.city.replace(regex, `<span class="hl>"${this.value}</span>`);
        // const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
                          <li>
                              <span class="name"><b>${place.name}</b></span><br>
                              <span class="address"><i>${place.address_line_1}</i></span><br>
                          </li>
                      `;
      })
      .join('');
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('.click-go');
  const suggestions = document.querySelector('.suggestions');

  // searchInput.addEventListener('change', displayMatches);

  searchInput.addEventListener('click', (evt) => {
    displayMatches(evt);
  });
}

window.onload = windowActions;