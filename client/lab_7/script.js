function mapInit() {
  const mymap = L.map('mapid').setView([38.9859, -76.930046], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaHN0b3VnaHQiLCJhIjoiY2t1cmdpeDJhMGFhaTMxcWp6ZzFtaGp3bCJ9.sCkx1d_mxbcCHjb6Na-q6A'
  }).addTo(mymap);
  return mymap;
}

async function dataHandler(mapObject) {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint);

  const locations = await request.json();

  function findMatches(wordToMatch, locations) {
    return locations.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex);
    });
  }

  // Remove pins on map
  function clearMap(mymap) {
    mymap.eachLayer((layer) => {
      mymap.removeLayer(layer);
    });
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiaHN0b3VnaHQiLCJhIjoiY2t1cmdpeDJhMGFhaTMxcWp6ZzFtaGp3bCJ9.sCkx1d_mxbcCHjb6Na-q6A'
    }).addTo(mymap);
    mymap.setView([38.9859, -76.930046], 13);
  }

  function applyMapMarkers(mymap, testArray) {
    mymap.eachLayer((layer) => {
      mymap.removeLayer(layer);
    });

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiaHN0b3VnaHQiLCJhIjoiY2t1cmdpeDJhMGFhaTMxcWp6ZzFtaGp3bCJ9.sCkx1d_mxbcCHjb6Na-q6A'
    }).addTo(mymap);
    mymap.setView([testArray[0].geocoded_column_1.coordinates[1],
      testArray[0].geocoded_column_1.coordinates[0]]);
    L.marker([testArray[0].geocoded_column_1.coordinates[1],
      testArray[0].geocoded_column_1.coordinates[0]]).addTo(mymap);
    L.marker([testArray[1].geocoded_column_1.coordinates[1],
      testArray[1].geocoded_column_1.coordinates[0]]).addTo(mymap);
    L.marker([testArray[2].geocoded_column_1.coordinates[1],
      testArray[2].geocoded_column_1.coordinates[0]]).addTo(mymap);
    L.marker([testArray[3].geocoded_column_1.coordinates[1],
      testArray[3].geocoded_column_1.coordinates[0]]).addTo(mymap);
    L.marker([testArray[4].geocoded_column_1.coordinates[1],
      testArray[4].geocoded_column_1.coordinates[0]]).addTo(mymap);
  }

  function displayMatches() {
    if (event.target.value === '' || event.target.value.length < 5) {
      suggestions.innerHTML = [];
      clearMap(mapObject);
    }
    if (event.target.value.length === 5) {
      const matchArray = findMatches(event.target.value, locations);
      let testArray = matchArray.filter((obj) => Object.keys(obj).includes('geocoded_column_1'));
      testArray = testArray.slice(0, 5);
      const html = testArray.map((place) => `          
                  <li>
                  <div class="box">                        
                        <span class="name"><strong>${place.name}</strong></span><br>
                        <span class="address"><i>${place.address_line_1}</i></span><br>
                        </div>
                  </li>
              `).join('');
      suggestions.innerHTML = html;
      applyMapMarkers(mapObject, testArray);
    }
    else {
      console.log('Valid Zip Code not entered');
    }
  }

  const suggestions = document.querySelector('.suggestions');
  const input = document.querySelector('input');

  input.addEventListener('input', (evnt) => { displayMatches(evnt); });
}

async function windowActions() {
  const mymap = mapInit();
  await dataHandler(mymap);
}

window.onload = windowActions;