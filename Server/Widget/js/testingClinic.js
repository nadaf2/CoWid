/**
 * This page is used to proccess all the testing site data in victoria then calls the method in map to generate the markers
 *
 */
const testingSiteData = VICTESTINGSITEDATA.sites;
/**
 * Gets the testing data and sort in based on the distance in ascending order
 * calls create marker method to generate the markers
 */
function filter() {
  currentData = testingSiteData.map((data) => {
    let location = {
      lat: parseFloat(data.Latitude),
      lng: parseFloat(data.Longitude),
    };

    let details = {
      "Testing Site Name": data.Site_Name,
      Service: data.ServiceFormat,
      "Phone Number": data.Phone,
      Website: data.Website,
      Distance: distance(location, currentLocation.location).toFixed(2) + "km",
    };
    return {
      distance: distance(location, currentLocation.location),
      location: location,
      details: details,
      markerStyling: {
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#f07800",
          fillOpacity: 0.6,
          strokeColor: "#00A",
          strokeOpacity: 0.9,
          strokeWeight: 1,
          scale: 15,
        },
        label: { fontSize: "15px", text: "Testing" },
      },
    };
  });

  sortedData = currentData.sort((a, b) => {
    return a.distance - b.distance;
  });

  sortedData.forEach((data) => {
    markers.push(createMarker(data));
  });

  createMarkerCluster();
  createAllInfoWindow(sortedData);
  viewTable(sortedData, true);
}
