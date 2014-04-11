// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

//This function takes a locationNamesNode paramater and converts it to a string, wrapped in
//an HTML p elelment, wrapped in an anchor element.
function wrapLocationsInAnchorTags(locationNamesNode) {
  var location = locationNamesNode.childNodes[0].nodeValue;
  //Replace lowercase abbreviations with easier-to-read capitalized abbreviations.
  location = location.replace(/icww/gi, "ICWW");
  location = location.replace(/u\.s\./gi, "U.S.");
  location = location.replace(/d\.c\./gi, "D.C.");
  location = location.replace(/pga/gi, "PGA");
  location = location.replace(/a1a/gi, "A1A");

  var locationEncode = encodeURIComponent(location);

  //Relative path to the SelectDay file with PHP query on locationEncode
  var uri = "SelectDay.php?location=" + locationEncode;

  //These three lines could be replaced with more elegant (possibly more efficient?) jQuery.
  document.write("<a href=\"" + uri + "\" \/>");
  document.write("<p class=\"capitalize\">" + location + "</p>");
  document.write("</a>");
}

function writeLocationsToHTML() {
  //Find LOCATION elements in the XML document tree
  var locationNames = regionData.getElementsByTagName("LOCATION");

  var numColumns = 1;
  //if the number of LOCATION elements is less than or equal to 24...
  // if (locationNames.length <= 24) {
  //   numColumns = 1;
  // //otherwise, between 25 and 50...
  // } else if (locationNames.length <= 50) {
  //   numColumns = 2;
  // //otherwise, between 51 and 100...
  // } else if (locationNames.length <= 100) {
  //   numColumns = 3;
  // //otherwise, greater than 100 (largest known length is 210 locations).
  // } else {
  //   numColumns = 4;
  // }

  //jQuery CSS manipulation: changes percentage width of div.columns
  // $(document).ready( function() {
  //   $('.column').css("width", 100 / numColumns + "%");
  // });

  //Traverse the locationNames:
  //for each element i, the stored string of the location name will be written
  //inside an an anchor tag with the strAndAnch function
  //the location name is then placed in a div.column with
  //width of 25%, 33%, 50%, or 100% (1, 2, 3, or 4 columns)
  // for (i = 0; i < numColumns; i++) {
  //   document.write("<div class=\"column\">")
  //   for (j = locationNames.length / numColumns * i; j < locationNames.length / numColumns * (i + 1); j++) {
  //     wrapLocationsInAnchorTags(locationNames[j]);
  //   }
  //   document.write("</div>");
  // }
}

//The behavior of this JS is to load XML data for the user-specified
//location, set the current date for the user, and retrieve the High and Low
//tides for the day with their respective times.  When the user changes the
//date, the checkDate() function will run and retrieve new data.

//This function retrieves the user's selected date (day, month, year, date) and returns it in an array.
function checkDate() {
  var date = document.getElementsByTagName("select");
  var day = date[0].value;
  var month = date[1].value;
  var year = date[2].value;

  return [month, day, year];
}

function getTide() {
  //find the JSON object in the #annual_data div
  annualData = $('#annual_data').data('tides')

  //check for date and store it in variables
  var date = checkDate();
  var month = parseInt(date[0], 10);
  var day = parseInt(date[1], 10);
  var year = parseInt(date[2], 10);
  var dateString = month + "/" + day + "/" + year;

  //Insert the date into the SPAN element
  document.getElementById("tabledate").innerHTML = dateString;

  //Shift the month value so it corresponds to the MONTH elements
  //in the XML document tree
  month -= 1;

  //Disable date options that do not exist for a given month.
  //All months have 31 days, except...
  //April, June, September, and November have 30 days.
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    document.getElementById("31").disabled = true;
  //Februrary for non-leap years has 28 days
  } else if (month === 1 && year % 4 !== 0) {
    document.getElementById("29").disabled = true;
    document.getElementById("30").disabled = true;
    document.getElementById("31").disabled = true;
  //Februray for leap years has 29 days
  } else if (month === 1) {
    document.getElementById("30").disabled = true;
    document.getElementById("31").disabled = true;
  } else {
    document.getElementById("29").disabled = false;
    document.getElementById("30").disabled = false;
    document.getElementById("31").disabled = false;
  }

  //Find all items that match the date
  var tide_items = $('div').data('tides').datainfo.data.item
  var dates = $.map(tide_items, function(value, index) {
    return value.date
  });
  var tides_of_the_day = []

  //Pad dates with zeroes so that '2014/4/7' becomes '2014/04/07' (YYYY/MD/DD)
  month += 1;
  month = ('0' + month).slice(-2);
  day = ('0' + day).slice(-2);

  for (i = 0; i < dates.length; i++) {
    if (dates[i] ==  year + "/" + month + "/" + day) {
      tides_of_the_day.push(tide_items[i])
    }
  }

  var times = new Array(4);
  var tides = new Array(4);
  for (i = 0; i < tides_of_the_day.length; i++) {
    times[i] = tides_of_the_day[i].time
    tides[i] = tides_of_the_day[i].highlow
  }

  for (i = 0; i < tides.length; i++) {
    if (tides[i] === undefined) {
      tides[i] = ""
    }
    document.getElementById("tide" + (i + 1)).innerHTML = tides[i];
  }

  for (i = 0; i < times.length; i++) {
    if (times[i] === undefined) {
      times[i] = ""
    }
    document.getElementById("time" + (i + 1)).innerHTML = times[i];
  }
}

function setToday() {
  //Declare a Date() object and store the date, month, and year separately
  var currentDate = new Date();
  var todaysYear = currentDate.getFullYear();
  var todaysDate = currentDate.getDate();
  var todaysMonth = currentDate.getMonth();

  //Initialize an array for mapping the month integer to a three-letter abbreviation.
  var monthArray = new Array(12);
  monthArray[0] = "Jan";
  monthArray[1] = "Feb";
  monthArray[2] = "Mar";
  monthArray[3] = "Apr";
  monthArray[4] = "May";
  monthArray[5] = "Jun";
  monthArray[6] = "Jul";
  monthArray[7] = "Aug";
  monthArray[8] = "Sep";
  monthArray[9] = "Oct";
  monthArray[10] = "Nov";
  monthArray[11] = "Dec";

  //find the HTML SELECT elements and select the day, month, and year corresponding to the current date
  document.getElementById(todaysDate).selected = true;
  document.getElementById(monthArray[todaysMonth]).selected = true;
  //This line should set the date to the current year.
  //document.getElementById(todaysYear).selected = true;
  //However, the XML tidal data is outdated, so the year will be set to 2013 using this line.
  document.getElementById("2013").selected = true;
}

