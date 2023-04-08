const GOOGLE_API_KEY = "AIzaSyBO0rdk0YwNoskmeO1d73dTv2HD_jcmBqc";
let map;
let allInfowindow = [];
let autocomplete;
let currentData;
let sortedData;
let markers = [];
let circle;
let markerCluster;
let geocoder;
let nearest;
let marker;
let currentMarkers;

let currentLocation = {
  location: { lat: -37.840935, lng: 144.946457 },
  state: "VIC",
  suburb: "Melbourne",
  postcode: "",
};
const countryRestrict = { country: "aus" };
/**
 * This function initialised all the google map library as well as running the filter function to process the data
 *
 */
function initMap() {
  // initialised the libaries

  infowindow = new google.maps.InfoWindow();
  geocoder = new google.maps.Geocoder();
  //setting up autocomplete
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      fields: [
        "address_components",
        "formatted_address",
        "geometry",
        "name",
        "place_id",
      ],
      componentRestrictions: countryRestrict,
    }
  );
  autocomplete.addListener("place_changed", getInputLocation);

  //Default location to vic

  map = new google.maps.Map(document.getElementById("map"), {
    center: currentLocation.location,
    zoom: 6,
  });
  if (!getCurrentPosition()) {
    filter();
  }

  map.addListener("tilesloaded", () => {
    currentMarkers = markers.filter((marker) => {
      marker.setVisible(false);
      if (map.getBounds().contains(marker.getPosition())) {
        marker.setVisible(true);
        return marker;
      }
    });
  });
  updateCurrentLocation();
}

/**
 * This function gets the current position of the user
 * @returns boolean if users used this to prvenet duplcation
 */
function getCurrentPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      currentLocation.location.lat = pos.coords.latitude;
      currentLocation.location.lng = pos.coords.longitude;

      map.panTo(currentLocation.location);
      map.setZoom(15);
      clearMarkers();
      filter();
      return true;
    });
  }
  return false;
}
/**
 * Updates the current location in html
 * @returns
 */
function updateCurrentLocation() {
  let locationRef = document.getElementById("currentLocation");
  let output = ` Current State: ${currentLocation.state}<br> `;
  output += `Current Suburb: ${currentLocation.suburb}`;
  locationRef.innerHTML = output;
  try {
    let descriptionRef = document.getElementById("tableDescription");
    let description = `Top 10 suburbs around ${currentLocation.suburb} with the highest cases `;
    descriptionRef.innerHTML = description;
  } catch (error) {
    return;
  }
}
/**
 * Use autofill function from the google map library and the pan to that location as well as update the data;
 */
function getInputLocation() {
  // document.getElementById("myRange").hidden = false;
  // document.getElementById("sliderText").hidden = false;
  const place = autocomplete.getPlace();
  const address = place.address_components;

  (currentLocation.location.lat = place.geometry.location.lat()),
    (currentLocation.location.lng = place.geometry.location.lng()),
    address.forEach((element) => {
      if (element.types[0] == "locality" || element.types[1] == "locality") {
        currentLocation.suburb = element.short_name;
      }
      if (element.types[0] == "postal_code") {
        currentLocation.postcode = element.short_name;
      }
      if (element.types[0] == "administrative_area_level_1")
        currentLocation.state = element.short_name;
    });

  map.panTo(place.geometry.location);
  map.setZoom(20);
  clearMarkers();
  filter();
  updateCurrentLocation();
  slider();
}

/**
 * Function for the slider, controls the circle as well as make sure it only shows the data inside the circle
 * @param {*} cases
 */
function slider(cases) {
  let sliderRef = document.getElementById("myRange");
  let max = sliderRef.value;
  document.getElementById("sliderText").hidden = false;
  if (cases) {
    let sliderData = findNearest(sortedData, max);
    viewTable(sliderData, true);
  }

  if (circle) {
    circle.setMap(null);
  }
  circle = createCircle(max);
}

/**
 * Use google library to create maker cluster, helps with lag
 */
function createMarkerCluster() {
  markerCluster = new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
}
/**
 * creates info window for the markers using the details in each data
 * @param {.} data
 */
function createAllInfoWindow(data) {
  allInfowindow = [];
  for (let i = 0; i < data.length; i++) {
    let output = "";
    if (data[i].details) {
      for (const detail in data[i].details) {
        output += `${detail} : ${data[i].details[detail]}\n`;
      }

      let infowindow = new google.maps.InfoWindow({
        content: output,
      });
      markers[i].addListener("click", () => {
        infowindow.open({
          anchor: markers[i],
          map,
        });
      });
      allInfowindow.push(infowindow);
    }
  }
}
/**
 * map tp the indexed markers
 * uses the markers array,
 * @param {} index
 */

function displaySelectedInfoWindow(index) {
  allInfowindow[index].open({
    anchor: markers[index],
    map,
  });
  map.panTo(markers[index].getPosition());
  map.setZoom(18);
}

/**
 * creates marker using the style and label provided and returns the marker to be stored in the markers array
 * @param {} place
 * @returns
 */
function createMarker(place) {
  let coords;
  coords = place.location;
  if (place.markerStyling) {
  }

  marker = new google.maps.Marker({
    map,
    position: coords,
    icon: place.markerStyling.icon,
    label: place.markerStyling.label,
  });

  return marker;
}

function clearMarkers() {
  markers = [];
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }

  if (markerCluster) {
    markerCluster.clearMarkers();
  }
  if (circle) {
    circle.setMap(null);
  }
  allInfowindow = [];
}

/**
 * Uses radius provide from the slider to generate a circle, also remove other markers outside of the circle
 * @param {} radius
 * @returns
 */
function createCircle(radius) {
  const circle = new google.maps.Circle({
    map,
    center: currentLocation.location,
    radius: radius * 1000,
    fillOpacity: 0.0,
  });
  map.fitBounds(circle.getBounds(), 0);
  currentMarkers = markers.filter((marker) => {
    marker.setVisible(false);
    if (map.getBounds(circle.getBounds()).contains(marker.getPosition())) {
      marker.setVisible(true);
      return marker;
    }
  });

  return circle;
}
/**
 * generates the table on the site with all the details that user can click
 * @param {} data
 * @param {*} clickable
 */
function viewTable(data, clickable) {
  let limit = 10;
  let listRef = document.getElementById("list");
  let html = "";
  data.slice(0, limit).forEach((element, i) => {
    if (element && clickable) {
      html += `<div>
        <ul class= "table"id="myLink" href="#" onclick="viewMarkerbyIndex(${i});return false;">`;
      for (val in element.details) {
        if (element.details[val]) {
          html += ` ${val}: ${element.details[val]} <br>`;
        }
      }
      html += "</ul></div>";
    } else {
      html += `<div>
        <ul class= "table"id="myLink">`;
      for (val in element.details) {
        html += ` ${val}: ${element.details[val]} <br>`;
      }
      html += "</ul></div>";
    }
  });
  listRef.innerHTML = html;
}
/**
 * Zoom to the selected markers
 * @param {*} index
 */

function viewMarkerbyIndex(index) {
  map.panTo(markers[index].getPosition());
  map.setZoom(18);
}

function distance(point1, point2) {
  // Uses the Haversine formula to find the distance between two points
  const R = 6371; // km
  const lat1 = (point1.lat * Math.PI) / 180; // φ, λ in radians
  const lat2 = (point2.lat * Math.PI) / 180;
  const dLat = lat2 - lat1;

  const lon1 = (point1.lng * Math.PI) / 180; // φ, λ in radians
  const lon2 = (point2.lng * Math.PI) / 180;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let d = R * c; // in km

  return d;
}
