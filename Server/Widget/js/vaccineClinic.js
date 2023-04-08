/**
 * This page is used to process the Clinic data 

 */
/**
 * FIlter out the data based on the state
 * then sort it by distance from current location
 * calls the function in maps to generates the markers
 */
function filter() {
  let filteredData = CLINICDATA.filter((element) => {
    if (element.state == currentLocation.state) {
      return element;
    }
  });
  currentData = filteredData.map((data) => {
    let location = {
      lat: parseFloat(data.lat),
      lng: parseFloat(data.lon),
    };
    let details = {
      "Clinic Name": data.orgName,
      "Vaccine Offerings": data.offerings,
      "Phone Number": data.contactPhone,
      Distance: distance(location, currentLocation.location).toFixed(2),
    };
    return {
      distance: distance(location, currentLocation.location),
      location: location,
      details: details,
    };
  });

  sortedData = currentData.sort((a, b) => {
    return a.distance - b.distance;
  });
  sortedData = sortedData.filter((item, pos, ary) => {
    return (
      !pos || item.details["Clinic Name"] != ary[pos - 1].details["Clinic Name"]
    );
  });

  sortedData.forEach((data) => {
    data.markerStyling = {
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "#f0a900",
        fillOpacity: 0.6,
        strokeColor: "#00A",
        strokeOpacity: 0.9,
        strokeWeight: 1,
        scale: 10,
      },
      label: { fontSize: "15px", text: "Clinic" },
    };

    markers.push(createMarker(data));
  });
  createMarkerCluster();
  createAllInfoWindow(sortedData);
  viewTable(sortedData, true);
}
