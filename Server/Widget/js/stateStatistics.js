"use strict";
function confirm_query_state() {
  let dropdown = document.getElementById("state");
  let query = dropdown.value;
  if (query === "Empty") {
    alert("Please select a state");
  } else {
    sessionStorage.setItem("selectedState", query);
    window.location.href = "statesStatistics.html";
  }
}

function printStateStats() {
  let query = sessionStorage.getItem("selectedState");

  $.getJSON(
    "https://disease.sh/v3/covid-19/historical/Australia/" +
      query +
      "?lastdays=2",
    function (data) {
      let caseValues = Object.values(data.timeline.cases);
      let newCases = caseValues[1] - caseValues[0];
      let deathValues = Object.values(data.timeline.deaths);
      let newDeaths = deathValues[1] - deathValues[0];

      //header
      var documentId = document.getElementById("todayCases");
      documentId.innerHTML = newCases;

      //Total cases
      var documentId = document.getElementById("totalCases");
      documentId.innerHTML = caseValues[1];

      //New cases
      var documentId = document.getElementById("newCases");
      documentId.innerHTML = newCases;

      //Total deaths
      var documentId = document.getElementById("totalDeaths");
      documentId.innerHTML = deathValues[1];

      //New deaths
      var documentId = document.getElementById("newDeaths");
      documentId.innerHTML = newDeaths;

      let placeholderName = document.getElementById("Sname");
      let placeholderimg = document.getElementById("stateFlag");
      if(query === 'australian capital territory'){
        let modifiedQuery = 'ACT'
        placeholderName.innerHTML = modifiedQuery
      }
      else{
        placeholderName.innerHTML = capitalizeFirstLetterOfEachWord(query);
      }
      let flagName = data.province.split(" ").join("") + "-flag.jpg";
      placeholderimg.innerHTML =
        "<img style=width:200px;height:80px; src=images/flags/" +
        flagName +
        ">";
    }
  );
}
function sort(array) {
  let sortedArray = [];
  for (let n = 0; n < 8; n++) {
    let tempMax = array[0];
    let maxIndex = 0;
    for (let i = 1; i < array.length; i++) {
      if (array[i].data > tempMax.data) {
        tempMax = array[i];
        maxIndex = i;
      }
    }
    array.splice(maxIndex, 1);
    sortedArray.push(tempMax);
  }
  return sortedArray;
}

function print(array, prefix) {
  for (let i = 0; i < array.length; i++) {
    let id = prefix + (i + 1);
    let imgid = prefix + (i + 1) + "img";
    let valueid = prefix + (i + 1) + "value";

    let placeholder = document.getElementById(id);
    placeholder.innerHTML = capitalizeFirstLetterOfEachWord(array[i].state);

    let placeholderimg = document.getElementById(imgid);
    let imgName = array[i].state.split(" ").join("") + "-badge.jpg";
    placeholderimg.innerHTML =
      "<img style=width:25px;height:33px src=images/flags/" + imgName + ">";
    let placeholdervalue = document.getElementById(valueid);
    placeholdervalue.innerHTML = array[i].data;
  }
}

function printStateRankings() {
  let totalCases_arr = [];
  let totalDeaths_arr = [];
  let newCases_arr = [];
  let newDeaths_arr = [];
  let rankByTotalCases;
  let rankByTotalDeaths;
  let rankByNewCases;
  let rankByNewDeaths;

  //Ranking for total cases
  $.getJSON(
    "https://disease.sh/v3/covid-19/historical/?lastdays=2",
    function (data) {
      for (let i = 8; i < 16; i++) {
        let caseValues = Object.values(data[i].timeline.cases);
        let deathValues = Object.values(data[i].timeline.deaths);
        newCases_arr.push({
          state: data[i].province,
          data: caseValues[1] - caseValues[0],
        });
        newDeaths_arr.push({
          state: data[i].province,
          data: deathValues[1] - deathValues[0],
        });
        totalCases_arr.push({ state: data[i].province, data: caseValues[1] });
        totalDeaths_arr.push({ state: data[i].province, data: deathValues[1] });
      }
      setTimeout(function () {
        if (newDeaths_arr.length == 8) {
          rankByNewCases = sort(newCases_arr);
          rankByNewDeaths = sort(newDeaths_arr);
          rankByTotalCases = sort(totalCases_arr);
          rankByTotalDeaths = sort(totalDeaths_arr);

          //new cases ranking
          print(rankByNewCases, "NC");
          //new deaths ranking
          print(rankByNewDeaths, "ND");
          //total cases ranking
          print(rankByTotalCases, "TC");
          //total deaths ranking
          print(rankByTotalDeaths, "TD");
        }
      }, 1000);
    }
  );
}

function drawChart() {
  let query = sessionStorage.getItem("selectedState");

  //Collecting API Data
  $.getJSON(
    "https://disease.sh/v3/covid-19/historical/Australia/" +
      query +
      "?lastdays=30",
    function (data) {
      let data_length = Object.keys(data.timeline.cases).length;
      let x = [];
      x[0] = ["Date", "Number of Cases"];
      let keys = Object.keys(data.timeline.cases);
      let values = Object.values(data.timeline.cases);
      for (let i = 1; i <= data_length; i++) {
        x.push([keys[i - 1], values[i] - values[i - 1]]);
      }
      var data = google.visualization.arrayToDataTable(x);

      var options = {
        title: "Cases over the last 30 days",
        curveType: "function",
        legend: { position: "bottom" },
        titleTextStyle: {
          fontSize: 20,
        },
      };

      var chart = new google.visualization.LineChart(
        document.getElementById("curve_chart")
      );

      chart.draw(data, options);
    }
  );

  $.getJSON(
    "https://disease.sh/v3/covid-19/historical/Australia/" +
      query +
      "?lastdays=30",
    function (data) {
      let data_length = Object.keys(data.timeline.deaths).length;
      let x = [];
      x[0] = ["Date", "Number of Deaths"];
      let keys = Object.keys(data.timeline.deaths);
      let values = Object.values(data.timeline.deaths);
      for (let i = 1; i <= data_length; i++) {
        x.push([keys[i - 1], values[i] - values[i - 1]]);
      }
      var data = google.visualization.arrayToDataTable(x);

      var options = {
        title: "Deaths over the last 30 days",
        curveType: "function",
        legend: { position: "bottom" },
        titleTextStyle: {
          fontSize: 20,
        },
      };

      var chart = new google.visualization.LineChart(
        document.getElementById("curve_chart_deaths")
      );

      chart.draw(data, options);
    }
  );
}
function drawRegionsMap() {
  let query = sessionStorage.getItem("selectedState");

  if(query !== 'tasmania' || query !== 'australian capital territory'){
    $.getJSON(
      "https://disease.sh/v3/covid-19/historical/Australia/" +
        query +
        "?lastdays=2" +
        query,
      function (data_api) {
        let caseValues = Object.values(data_api.timeline.cases);
        let deathValues = Object.values(data_api.timeline.deaths);
        let newCases = caseValues[1] - caseValues[0];
        let newDeaths = deathValues[1] - deathValues[0];
        var data = google.visualization.arrayToDataTable([
          ["City", "New Cases", "New Deaths"],
          [query, newCases, newDeaths],
        ]);

        var options = {
          region: "AU",
          resolution: "provinces",
          colorAxis: { colors: ["#FF0000"] },
        };

        var chart = new google.visualization.GeoChart(
          document.getElementById("regions_div")
        );

        chart.draw(data, options);
      }
    );
  }
}

function capitalizeFirstLetterOfEachWord(words) {
  var separateWord = words.toLowerCase().split(" ");
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(" ");
}
