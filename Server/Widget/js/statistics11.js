"use strict";
function confirm_query() {
  let dropdown = document.getElementById("country");
  let query = dropdown.value;
  if (query === "Empty") {
    alert("Please select a country");
  } else {
    sessionStorage.setItem("selectedCountry", query);
    window.location.href = "statistics.html";
  }
}

function map_page() {
  let dropdown = document.getElementById("testing_clinics");
  let query = dropdown.value;
  if (query === "Empty") {
    alert("Please select a state");
  } else {
    window.location.href = "map.html";
  }
}

function printCountryStats() {
  let query = sessionStorage.getItem("selectedCountry");
  const id = [
    "todayCases",
    "todayDeaths",
    "active",
    "critical",
    "todayRecovered",
    "cases",
    "deaths",
    "recovered",
    "tests",
  ];
  console.log(query)
  $.getJSON(
    "https://disease.sh/v3/covid-19/countries/"+query+"?strict=true",
    function (data) {
      for (let i in id) {
        var criteria = id[i];
        var documentId = document.getElementById(criteria);
        documentId.innerHTML = data[criteria].toLocaleString();
      }
      let placeholderName = document.getElementById("Cname");
      let placeholderimg = document.getElementById("image");
      let countryName = getFullName(query);
      placeholderName.innerHTML = countryName;
      placeholderimg.innerHTML =
        "<img style=width:200px;height:80px; src=" +
        data.countryInfo.flag +
        ">";
    }
  );
}

//HERE
function printCountryRankings() {
  //Ranking for total cases
  $.getJSON(
    "https://disease.sh/v3/covid-19/countries",
    function (data) {
      let i, n;
      let rankByTotalCases = [];
      let rankLength = 10;
      let maxTotalCases, maxIndex;
      for (n = 0; n < rankLength; n++) {
        maxTotalCases = data[0];
        for (i = 0; i < data.length; i++) {
          if (data[i].cases > maxTotalCases.cases) {
            maxTotalCases = data[i];
            maxIndex = i;
          }
        }
        data.splice(maxIndex, 1);
        rankByTotalCases[n] = maxTotalCases;
      }
      for (i = 0; i < rankByTotalCases.length; i++) {
        let id = "TC" + (i + 1);
        let imgid = "TC" + (i + 1) + "img";
        let valueid = "TC" + (i + 1) + "value";
        let placeholder = document.getElementById(id);
        placeholder.innerHTML = rankByTotalCases[i].country;
        let placeholderimg = document.getElementById(imgid);
        placeholderimg.innerHTML =
          "<img style=width:50px; src=" +
          rankByTotalCases[i].countryInfo.flag +
          ">";
        let placeholdervalue = document.getElementById(valueid);
        placeholdervalue.innerHTML = rankByTotalCases[i].cases.toLocaleString();
      }
    }
  );

  //Ranking for new cases
  $.getJSON(
    "https://disease.sh/v3/covid-19/countries",
    function (data) {
      let i, n;
      let rankByCases = [];
      let rankLength = 10;
      let maxCases, maxIndex;
      for (n = 0; n < rankLength; n++) {
        maxCases = data[0];
        for (i = 0; i < data.length; i++) {
          if (data[i].todayCases > maxCases.todayCases) {
            maxCases = data[i];
            maxIndex = i;
          }
        }
        data.splice(maxIndex, 1);
        rankByCases[n] = maxCases;
      }
      for (i = 0; i < rankByCases.length; i++) {
        let id = "NC" + (i + 1);
        let imgid = "NC" + (i + 1) + "img";
        let valueid = "NC" + (i + 1) + "value";
        let placeholder = document.getElementById(id);
        placeholder.innerHTML = rankByCases[i].country;
        let placeholderimg = document.getElementById(imgid);
        placeholderimg.innerHTML =
          "<img style=width:50px; src=" + rankByCases[i].countryInfo.flag + ">";
        let placeholdervalue = document.getElementById(valueid);
        placeholdervalue.innerHTML = rankByCases[i].todayCases;
      }
    }
  );

  //Ranking for total deaths
  $.getJSON(
    "https://disease.sh/v3/covid-19/countries",
    function (data) {
      let i, n;
      let rankByTotalDeaths = [];
      let rankLength = 10;
      let maxTotalDeaths, maxIndex;
      for (n = 0; n < rankLength; n++) {
        maxTotalDeaths = data[0];
        for (i = 0; i < data.length; i++) {
          if (data[i].deaths > maxTotalDeaths.deaths) {
            maxTotalDeaths = data[i];
            maxIndex = i;
          }
        }
        data.splice(maxIndex, 1);
        rankByTotalDeaths[n] = maxTotalDeaths;
      }
      for (i = 0; i < rankByTotalDeaths.length; i++) {
        let id = "TD" + (i + 1);
        let imgid = "TD" + (i + 1) + "img";
        let valueid = "TD" + (i + 1) + "value";
        let placeholder = document.getElementById(id);
        placeholder.innerHTML = rankByTotalDeaths[i].country;
        let placeholderimg = document.getElementById(imgid);
        placeholderimg.innerHTML =
          "<img style=width:50px; src=" +
          rankByTotalDeaths[i].countryInfo.flag +
          ">";
        let placeholdervalue = document.getElementById(valueid);
        placeholdervalue.innerHTML = rankByTotalDeaths[i].deaths;
      }
    }
  );

  //Ranking for new deaths
  $.getJSON(
    "https://disease.sh/v3/covid-19/countries",
    function (data) {
      let i, n;
      let rankByDeaths = [];
      let rankLength = 10;
      let maxDeaths, maxIndex;
      for (n = 0; n < rankLength; n++) {
        maxDeaths = data[0];
        for (i = 0; i < data.length; i++) {
          if (data[i].todayDeaths > maxDeaths.todayDeaths) {
            maxDeaths = data[i];
            maxIndex = i;
          }
        }
        data.splice(maxIndex, 1);
        rankByDeaths[n] = maxDeaths;
      }
      for (i = 0; i < rankByDeaths.length; i++) {
        let id = "ND" + (i + 1);
        let imgid = "ND" + (i + 1) + "img";
        let valueid = "ND" + (i + 1) + "value";
        let placeholder = document.getElementById(id);
        placeholder.innerHTML = rankByDeaths[i].country;
        let placeholderimg = document.getElementById(imgid);
        placeholderimg.innerHTML =
          "<img style=width:50px; src=" +
          rankByDeaths[i].countryInfo.flag +
          ">";
        let placeholdervalue = document.getElementById(valueid);
        placeholdervalue.innerHTML = rankByDeaths[i].todayDeaths;
      }
    }
  );
}


function drawChart() {
  let query = sessionStorage.getItem("selectedCountry");
  //Collecting API Data
  $.getJSON(
    "https://disease.sh/v3/covid-19/historical/"+query+"?lastdays=30",
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
    "https://disease.sh/v3/covid-19/historical/"+query+"?lastdays=30",
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
  let query = sessionStorage.getItem("selectedCountry");
  $.getJSON(
    "https://disease.sh/v3/covid-19/countries/"+query+"?strict=true",
    function (data_api) {
      let countryName = getFullName(query);
      var data = google.visualization.arrayToDataTable([
        ["Country", "Active Cases", "Total Deaths"],
        [countryName, data_api.active, data_api.deaths],
      ]);

      var options = {
        colorAxis: { colors: ["#FF0000"] },
      };

      var chart = new google.visualization.GeoChart(
        document.getElementById("regions_div")
      );

      chart.draw(data, options);
    }
  );
}



// All countries
// length 252
var countries = [
  {"name":"Afghanistan","code":"AF","alpha_3":"AFG"},
  {"name":"Aland Islands","code":"AX","alpha_3":"ALA"},
  {"name":"Albania","code":"AL","alpha_3":"ALB"},
  {"name":"Algeria","code":"DZ","alpha_3":"DZA"},
  {"name":"American Samoa","code":"AS","alpha_3":"ASM"},
  {"name":"Andorra","code":"AD","alpha_3":"AND"},
  {"name":"Angola","code":"AO","alpha_3":"AGO"},
  {"name":"Anguilla","code":"AI","alpha_3":"AIA"},
  {"name":"Antarctica","code":"AQ","alpha_3":"ATA"},
  {"name":"Antigua and Barbuda","code":"AG","alpha_3":"ATG"},
  {"name":"Argentina","code":"AR","alpha_3":"ARG"},
  {"name":"Armenia","code":"AM","alpha_3":"ARM"},
  {"name":"Aruba","code":"AW","alpha_3":"ABW"},
  {"name":"Australia","code":"AU","alpha_3":"AUS"},
  {"name":"Austria","code":"AT","alpha_3":"AUT"},
  {"name":"Azerbaijan","code":"AZ","alpha_3":"AZE"},
  {"name":"Bahamas","code":"BS","alpha_3":"BHS"},
  {"name":"Bahrain","code":"BH","alpha_3":"BHR"},
  {"name":"Bangladesh","code":"BD","alpha_3":"BGD"},
  {"name":"Barbados","code":"BB","alpha_3":"BRB"},
  {"name":"Belarus","code":"BY","alpha_3":"BLR"},
  {"name":"Belgium","code":"BE","alpha_3":"BEL"},
  {"name":"Belize","code":"BZ","alpha_3":"BLZ"},
  {"name":"Benin","code":"BJ","alpha_3":"BEN"},
  {"name":"Bermuda","code":"BM","alpha_3":"BMU"},
  {"name":"Bhutan","code":"BT","alpha_3":"BTN"},
  {"name":"Bolivia","code":"BO","alpha_3":"BOL"},
  {"name":"Bonaire, Sint Eustatius and Saba","code":"BQ","alpha_3":"BES"},
  {"name":"Bosnia and Herzegovina","code":"BA","alpha_3":"BIH"},
  {"name":"Botswana","code":"BW","alpha_3":"BWA"},
  {"name":"Bouvet Island","code":"BV","alpha_3":"BVT"},
  {"name":"Brazil","code":"BR","alpha_3":"BRA"},
  {"name":"British Indian Ocean Territory","code":"IO","alpha_3":"IOT"},
  {"name":"Brunei Darussalam","code":"BN","alpha_3":"BRN"},
  {"name":"Bulgaria","code":"BG","alpha_3":"BGR"},
  {"name":"Burkina Faso","code":"BF","alpha_3":"BFA"},
  {"name":"Burundi","code":"BI","alpha_3":"BDI"},
  {"name":"Cambodia","code":"KH","alpha_3":"KHM"},
  {"name":"Cameroon","code":"CM","alpha_3":"CMR"},
  {"name":"Canada","code":"CA","alpha_3":"CAN"},
  {"name":"Cape Verde","code":"CV","alpha_3":"CPV"},
  {"name":"Cayman Islands","code":"KY","alpha_3":"CYM"},
  {"name":"Central African Republic","code":"CF","alpha_3":"CAF"},
  {"name":"Chad","code":"TD","alpha_3":"TCD"},
  {"name":"Chile","code":"CL","alpha_3":"CHL"},
  {"name":"China","code":"CN","alpha_3":"CHN"},
  {"name":"Christmas Island","code":"CX","alpha_3":"CXR"},
  {"name":"Cocos (Keeling) Islands","code":"CC","alpha_3":"CCK"},
  {"name":"Colombia","code":"CO","alpha_3":"COL"},
  {"name":"Comoros","code":"KM","alpha_3":"COM"},
  {"name":"Congo","code":"CG","alpha_3":"COG"},
  {"name":"Congo, Democratic Republic of the Congo","code":"CD","alpha_3":"COD"},
  {"name":"Cook Islands","code":"CK","alpha_3":"COK"},
  {"name":"Costa Rica","code":"CR","alpha_3":"CRI"},
  {"name":"Cote D'Ivoire","code":"CI","alpha_3":"CIV"},
  {"name":"Croatia","code":"HR","alpha_3":"HRV"},
  {"name":"Cuba","code":"CU","alpha_3":"CUB"},
  {"name":"Curacao","code":"CW","alpha_3":"CUW"},
  {"name":"Cyprus","code":"CY","alpha_3":"CYP"},
  {"name":"Czech Republic","code":"CZ","alpha_3":"CZE"},
  {"name":"Denmark","code":"DK","alpha_3":"DNK"},
  {"name":"Djibouti","code":"DJ","alpha_3":"DJI"},
  {"name":"Dominica","code":"DM","alpha_3":"DMA"},
  {"name":"Dominican Republic","code":"DO","alpha_3":"DOM"},
  {"name":"Ecuador","code":"EC","alpha_3":"ECU"},
  {"name":"Egypt","code":"EG","alpha_3":"EGY"},
  {"name":"El Salvador","code":"SV","alpha_3":"SLV"},
  {"name":"Equatorial Guinea","code":"GQ","alpha_3":"GNQ"},
  {"name":"Eritrea","code":"ER","alpha_3":"ERI"},
  {"name":"Estonia","code":"EE","alpha_3":"EST"},
  {"name":"Ethiopia","code":"ET","alpha_3":"ETH"},
  {"name":"Falkland Islands (Malvinas)","code":"FK","alpha_3":"FLK"},
  {"name":"Faeroe Islands","code":"FO","alpha_3":"FRO"},
  {"name":"Fiji","code":"FJ","alpha_3":"FJI"},
  {"name":"Finland","code":"FI","alpha_3":"FIN"},
  {"name":"France","code":"FR","alpha_3":"FRA"},
  {"name":"French Guiana","code":"GF","alpha_3":"GUF"},
  {"name":"French Polynesia","code":"PF","alpha_3":"PYF"},
  {"name":"French Southern Territories","code":"TF","alpha_3":"ATF"},
  {"name":"Gabon","code":"GA","alpha_3":"GAB"},
  {"name":"Gambia","code":"GM","alpha_3":"GMB"},
  {"name":"Georgia","code":"GE","alpha_3":"GEO"},
  {"name":"Germany","code":"DE","alpha_3":"DEU"},
  {"name":"Ghana","code":"GH","alpha_3":"GHA"},
  {"name":"Gibraltar","code":"GI","alpha_3":"GIB"},
  {"name":"Greece","code":"GR","alpha_3":"GRC"},
  {"name":"Greenland","code":"GL","alpha_3":"GRL"},
  {"name":"Grenada","code":"GD","alpha_3":"GRD"},
  {"name":"Guadeloupe","code":"GP","alpha_3":"GLP"},
  {"name":"Guam","code":"GU","alpha_3":"GUM"},
  {"name":"Guatemala","code":"GT","alpha_3":"GTM"},
  {"name":"Guernsey","code":"GG","alpha_3":"GGY"},
  {"name":"Guinea","code":"GN","alpha_3":"GIN"},
  {"name":"Guinea-Bissau","code":"GW","alpha_3":"GNB"},
  {"name":"Guyana","code":"GY","alpha_3":"GUY"},
  {"name":"Haiti","code":"HT","alpha_3":"HTI"},
  {"name":"Heard Island and Mcdonald Islands","code":"HM","alpha_3":"HMD"},
  {"name":"Holy See (Vatican City State)","code":"VA","alpha_3":"VAT"},
  {"name":"Honduras","code":"HN","alpha_3":"HND"},
  {"name":"Hong Kong","code":"HK","alpha_3":"HKG"},
  {"name":"Hungary","code":"HU","alpha_3":"HUN"},
  {"name":"Iceland","code":"IS","alpha_3":"ISL"},
  {"name":"India","code":"IN","alpha_3":"IND"},
  {"name":"Indonesia","code":"ID","alpha_3":"IDN"},
  {"name":"Iran, Islamic Republic of","code":"IR","alpha_3":"IRN"},
  {"name":"Iraq","code":"IQ","alpha_3":"IRQ"},
  {"name":"Ireland","code":"IE","alpha_3":"IRL"},
  {"name":"Israel","code":"IL","alpha_3":"ISR"},
  {"name":"Italy","code":"IT","alpha_3":"ITA"},
  {"name":"Jamaica","code":"JM","alpha_3":"JAM"},
  {"name":"Japan","code":"JP","alpha_3":"JPN"},
  {"name":"Jersey","code":"JE","alpha_3":"JEY"},
  {"name":"Jordan","code":"JO","alpha_3":"JOR"},
  {"name":"Kazakhstan","code":"KZ","alpha_3":"KAZ"},
  {"name":"Kenya","code":"KE","alpha_3":"KEN"},
  {"name":"Kiribati","code":"KI","alpha_3":"KIR"},
  {"name":"Korea, Democratic People's Republic of","code":"KP","alpha_3":"PRK"},
  {"name":"South Korea","code":"KR","alpha_3":"KOR"},
  {"name":"S. Korea","code":"KR"},
  {"name":"Kosovo","code":"XK","alpha_3":"XKX"},
  {"name":"Kuwait","code":"KW","alpha_3":"KWT"},
  {"name":"Kyrgyzstan","code":"KG","alpha_3":"KGZ"},
  {"name":"Lao People's Democratic Republic","code":"LA","alpha_3":"LAO"},
  {"name":"Latvia","code":"LV","alpha_3":"LVA"},
  {"name":"Lebanon","code":"LB","alpha_3":"LBN"},
  {"name":"Lesotho","code":"LS","alpha_3":"LSO"},
  {"name":"Liberia","code":"LR","alpha_3":"LBR"},
  {"name":"Libyan Arab Jamahiriya","code":"LY","alpha_3":"LBY"},
  {"name":"Liechtenstein","code":"LI","alpha_3":"LIE"},
  {"name":"Lithuania","code":"LT","alpha_3":"LTU"},
  {"name":"Luxembourg","code":"LU","alpha_3":"LUX"},
  {"name":"Macao","code":"MO","alpha_3":"MAC"},
  {"name":"Macedonia, the Former Yugoslav Republic of","code":"MK","alpha_3":"MKD"},
  {"name":"Madagascar","code":"MG","alpha_3":"MDG"},
  {"name":"Malawi","code":"MW","alpha_3":"MWI"},
  {"name":"Malaysia","code":"MY","alpha_3":"MYS"},
  {"name":"Maldives","code":"MV","alpha_3":"MDV"},
  {"name":"Mali","code":"ML","alpha_3":"MLI"},
  {"name":"Malta","code":"MT","alpha_3":"MLT"},
  {"name":"Marshall Islands","code":"MH","alpha_3":"MHL"},
  {"name":"Martinique","code":"MQ","alpha_3":"MTQ"},
  {"name":"Mauritania","code":"MR","alpha_3":"MRT"},
  {"name":"Mauritius","code":"MU","alpha_3":"MUS"},
  {"name":"Mayotte","code":"YT","alpha_3":"MYT"},
  {"name":"Mexico","code":"MX","alpha_3":"MEX"},
  {"name":"Micronesia, Federated States of","code":"FM","alpha_3":"FSM"},
  {"name":"Moldova, Republic of","code":"MD","alpha_3":"MDA"},
  {"name":"Monaco","code":"MC","alpha_3":"MCO"},
  {"name":"Mongolia","code":"MN","alpha_3":"MNG"},
  {"name":"Montenegro","code":"ME","alpha_3":"MNE"},
  {"name":"Montserrat","code":"MS","alpha_3":"MSR"},
  {"name":"Morocco","code":"MA","alpha_3":"MAR"},
  {"name":"Mozambique","code":"MZ","alpha_3":"MOZ"},
  {"name":"Myanmar","code":"MM","alpha_3":"MMR"},
  {"name":"Namibia","code":"NA","alpha_3":"NAM"},
  {"name":"Nauru","code":"NR","alpha_3":"NRU"},
  {"name":"Nepal","code":"NP","alpha_3":"NPL"},
  {"name":"Netherlands","code":"NL","alpha_3":"NLD"},
  {"name":"Netherlands Antilles","code":"AN","alpha_3":"ANT"},
  {"name":"New Caledonia","code":"NC","alpha_3":"NCL"},
  {"name":"New Zealand","code":"NZ","alpha_3":"NZL"},
  {"name":"Nicaragua","code":"NI","alpha_3":"NIC"},
  {"name":"Niger","code":"NE","alpha_3":"NER"},
  {"name":"Nigeria","code":"NG","alpha_3":"NGA"},
  {"name":"Niue","code":"NU","alpha_3":"NIU"},
  {"name":"Norfolk Island","code":"NF","alpha_3":"NFK"},
  {"name":"Northern Mariana Islands","code":"MP","alpha_3":"MNP"},
  {"name":"Norway","code":"NO","alpha_3":"NOR"},
  {"name":"Oman","code":"OM","alpha_3":"OMN"},
  {"name":"Pakistan","code":"PK","alpha_3":"PAK"},
  {"name":"Palau","code":"PW","alpha_3":"PLW"},
  {"name":"Palestinian Territory, Occupied","code":"PS","alpha_3":"PSE"},
  {"name":"Panama","code":"PA","alpha_3":"PAN"},
  {"name":"Papua New Guinea","code":"PG","alpha_3":"PNG"},
  {"name":"Paraguay","code":"PY","alpha_3":"PRY"},
  {"name":"Peru","code":"PE","alpha_3":"PER"},
  {"name":"Philippines","code":"PH","alpha_3":"PHL"},
  {"name":"Pitcairn","code":"PN","alpha_3":"PCN"},
  {"name":"Poland","code":"PL","alpha_3":"POL"},
  {"name":"Portugal","code":"PT","alpha_3":"PRT"},
  {"name":"Puerto Rico","code":"PR","alpha_3":"PRI"},
  {"name":"Qatar","code":"QA","alpha_3":"QAT"},
  {"name":"Reunion","code":"RE","alpha_3":"REU"},
  {"name":"Romania","code":"RO","alpha_3":"ROM"},
  {"name":"Russian Federation","code":"RU","alpha_3":"RUS"},
  {"name":"Rwanda","code":"RW","alpha_3":"RWA"},
  {"name":"Saint Barthelemy","code":"BL","alpha_3":"BLM"},
  {"name":"Saint Helena","code":"SH","alpha_3":"SHN"},
  {"name":"Saint Kitts and Nevis","code":"KN","alpha_3":"KNA"},
  {"name":"Saint Lucia","code":"LC","alpha_3":"LCA"},
  {"name":"Saint Martin","code":"MF","alpha_3":"MAF"},
  {"name":"Saint Pierre and Miquelon","code":"PM","alpha_3":"SPM"},
  {"name":"Saint Vincent and the Grenadines","code":"VC","alpha_3":"VCT"},
  {"name":"Samoa","code":"WS","alpha_3":"WSM"},
  {"name":"San Marino","code":"SM","alpha_3":"SMR"},
  {"name":"Sao Tome and Principe","code":"ST","alpha_3":"STP"},
  {"name":"Saudi Arabia","code":"SA","alpha_3":"SAU"},
  {"name":"Senegal","code":"SN","alpha_3":"SEN"},
  {"name":"Serbia","code":"RS","alpha_3":"SRB"},
  {"name":"Serbia and Montenegro","code":"CS","alpha_3":"SCG"},
  {"name":"Seychelles","code":"SC","alpha_3":"SYC"},
  {"name":"Sierra Leone","code":"SL","alpha_3":"SLE"},
  {"name":"Singapore","code":"SG","alpha_3":"SGP"},
  {"name":"Sint Maarten","code":"SX","alpha_3":"SXM"},
  {"name":"Slovakia","code":"SK","alpha_3":"SVK"},
  {"name":"Slovenia","code":"SI","alpha_3":"SVN"},
  {"name":"Solomon Islands","code":"SB","alpha_3":"SLB"},
  {"name":"Somalia","code":"SO","alpha_3":"SOM"},
  {"name":"South Africa","code":"ZA","alpha_3":"ZAF"},
  {"name":"South Georgia and the South Sandwich Islands","code":"GS","alpha_3":"SGS"},
  {"name":"South Sudan","code":"SS","alpha_3":"SSD"},
  {"name":"Spain","code":"ES","alpha_3":"ESP"},
  {"name":"Sri Lanka","code":"LK","alpha_3":"LKA"},
  {"name":"Sudan","code":"SD","alpha_3":"SDN"},
  {"name":"Suriname","code":"SR","alpha_3":"SUR"},
  {"name":"Svalbard and Jan Mayen","code":"SJ","alpha_3":"SJM"},
  {"name":"Swaziland","code":"SZ","alpha_3":"SWZ"},
  {"name":"Sweden","code":"SE","alpha_3":"SWE"},
  {"name":"Switzerland","code":"CH","alpha_3":"CHE"},
  {"name":"Syrian Arab Republic","code":"SY","alpha_3":"SYR"},
  {"name":"Taiwan, Province of China","code":"TW","alpha_3":"TWN"},
  {"name":"Tajikistan","code":"TJ","alpha_3":"TJK"},
  {"name":"Tanzania, United Republic of","code":"TZ","alpha_3":"TZA"},
  {"name":"Thailand","code":"TH","alpha_3":"THA"},
  {"name":"Timor-Leste","code":"TL","alpha_3":"TLS"},
  {"name":"Togo","code":"TG","alpha_3":"TGO"},
  {"name":"Tokelau","code":"TK","alpha_3":"TKL"},
  {"name":"Tonga","code":"TO","alpha_3":"TON"},
  {"name":"Trinidad and Tobago","code":"TT","alpha_3":"TTO"},
  {"name":"Tunisia","code":"TN","alpha_3":"TUN"},
  {"name":"Turkey","code":"TR","alpha_3":"TUR"},
  {"name":"Turkmenistan","code":"TM","alpha_3":"TKM"},
  {"name":"Turks and Caicos Islands","code":"TC","alpha_3":"TCA"},
  {"name":"Tuvalu","code":"TV","alpha_3":"TUV"},
  {"name":"Uganda","code":"UG","alpha_3":"UGA"},
  {"name":"Ukraine","code":"UA","alpha_3":"UKR"},
  {"name":"United Arab Emirates","code":"AE","alpha_3":"ARE"},
  {"name":"United Kingdom","code":"UK","alpha_3":"GBR"},
  {"name":"United States","code":"US","alpha_3":"USA"},
  {"name":"United States Minor Outlying Islands","code":"UM","alpha_3":"UMI"},
  {"name":"Uruguay","code":"UY","alpha_3":"URY"},
  {"name":"Uzbekistan","code":"UZ","alpha_3":"UZB"},
  {"name":"Vanuatu","code":"VU","alpha_3":"VUT"},
  {"name":"Venezuela","code":"VE","alpha_3":"VEN"},
  {"name":"Viet Nam","code":"VN","alpha_3":"VNM"},
  {"name":"Virgin Islands, British","code":"VG","alpha_3":"VGB"},
  {"name":"Virgin Islands, U.s.","code":"VI","alpha_3":"VIR"},
  {"name":"Wallis and Futuna","code":"WF","alpha_3":"WLF"},
  {"name":"Western Sahara","code":"EH","alpha_3":"ESH"},
  {"name":"Yemen","code":"YE","alpha_3":"YEM"},
  {"name":"Zambia","code":"ZM","alpha_3":"ZMB"},
  {"name":"Zimbabwe","code":"ZW","alpha_3":"ZWE"}
];

function getDualCode(countryName){
  for(let key in countries){
    if(countryName.length === 2){
      return countryName;
    }
    else if(countryName.length == 3){
      if(countryName === countries[key]["alpha_3"]){
        return countries[key]["code"];
      }
    }
    else{
      if(countryName === countries[key]["name"]){
        return countries[key]["code"];
      }
    }
  }
}

function getTripleCode(countryName){
  
  for(let key in countries){
    if(countryName.length === 3){
      return countryName;
    }
    else if(countryName.length == 2){
      if(countryName === countries[key]["code"]){
        return countries[key]["alpha_3"];
      }
    }
    else{
      if(countryName === countries[key]["name"]){
        return countries[key]["alpha_3"];
      }
    }
  }
}

function getFullName(code){
  console.log(code)
  for(let key in countries){
    if(code.length == 2){
      if (code === countries[key]["code"]){
        return countries[key]["name"];
      }
    }
    else if(code.length == 3){
      if (code === countries[key]["alpha_3"]){
        return countries[key]["name"];
      }
    }
    else{
      return code
    } 
  }
}
