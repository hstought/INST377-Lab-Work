async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint);

  const resturants = await request.json();

  function findMatches(wordToMatch, resturants) {
    return resturants.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex);
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
  searchInput.addEventListener('keyup', (evt) => {
    displayMatches(evt);
  });
}

window.onload = windowActions;