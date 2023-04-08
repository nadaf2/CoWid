/**
 * This page is used to generate the data for cases based on suburbs in victoria
 */
const vicPostcode = POSTCODE.filter((element) => {
  if (element.state == "VIC") {
    return element;
  }
});

/**
 * Request the data from the databases
 * @param {*} view
 */
function filter(view) {
  let url =
    "https://discover.data.vic.gov.au/api/3/action/datastore_search?resource_id=e3c72a49-6752-4158-82e6-116bea8f55c8&sort=cases desc&limit=1000";
  $.getJSON(url, (data) => {
    let cases = data.result["records"];
    if (view) {
      viewTable(sortedData, true);
    } else {
      sort(cases);
    }
  });
}

/**
 * Sort the data bases  on the cases, remove data with no cases- not neccassarty to show.
 * As the data provided doesnt contain the geolocation, a check needs to be done to convert the postcode to geolocation using the list of postcode of australia
 * Calls the create marker functino for each location, then the create table function to generate the table for user to see
 * @param {*} cases
 */
function sort(cases) {
  currentData = cases.sort((a, b) => {
    return parseInt(b.cases) - parseInt(a.cases);
  });

  let allCases = currentData.filter((element) => {
    return parseInt(element.cases) > 0;
  });

  sortedData = [];
  for (let i = 0; i < allCases.length; i++) {
    const geo = vicPostcode.find(
      (postcode) => postcode.postcode == allCases[i].postcode
    );

    if (geo) {
      let details = {
        Postcode: allCases[i].postcode,
        "Active Case": allCases[i].active,
        "Cases Number": allCases[i].cases,
        Suburb: geo.locality,
      };
      if (details) {
        sortedData.push({
          distance: distance(currentLocation.location, {
            lat: geo.lat,
            lng: geo.long,
          }),
          location: new google.maps.LatLng(geo.lat, geo.long),
          markerStyling: {
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: "#00F",
              fillOpacity: 0.6,
              strokeColor: "#00A",
              strokeOpacity: 0.9,
              strokeWeight: 1,
              scale: 20,
            },
            label: { fontSize: "15px", text: allCases[i].cases },
          },
          details: details,
        });
      }
    }
  }
  clearMarkers();

  sortedData.forEach((element) => {
    if (element) {
      markers.push(createMarker(element));
    }
  });
  createMarkerCluster();
  createAllInfoWindow(sortedData);
  viewTable(sortedData, true);
}

/**
 * sort the data from ascending order;
 * @param {*} data
 * @returns
 */
function sortByDistance(data) {
  let distanceSortedData = data.sort((a, b) => {
    return a.distance - b.distance;
  });
  return distanceSortedData;
}
/**
 * sort cases descending order
 * @param {'*'} data
 * @returns
 */
function sortByCases(data) {
  let casesSortedData = data.sort((a, b) => {
    return (
      parseInt(b.details["Cases Number"]) - parseInt(a.details["Cases Number"])
    );
  });
  return casesSortedData;
}
/**
 * updates the data and find the nearest suburb with the new location
 * Create markers
 * @param {*} data
 * @param {*} max
 * @returns
 */
function findNearest(data, max) {
  let copyData = JSON.parse(JSON.stringify(data));
  let distanceData = sortByDistance(copyData);
  let maxIndex = distanceData.findIndex((element) => {
    return element.distance > max;
  });

  let nearest = copyData.slice(0, maxIndex);
  let sortBycasesData = sortByCases(nearest);
  createClosetMarker(sortBycasesData);
  return sortBycasesData;
}
/**
 * Clear the markers
 * only add the ones that are cloest
 * for viewMarkersbyINdex function to work
 * @param {]} data
 */
function createClosetMarker(data) {
  clearMarkers();

  console.log(data);
  data.forEach((element) => {
    markers.push(createMarker(element));
  });
  createMarkerCluster();
}
