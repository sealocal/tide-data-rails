// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/


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

  for (i = 0; i < Math.max(times.length, tides.length); i++) {
    if (tides[i] === undefined) {
      tides[i] = ""
    }
    document.getElementById("tide" + (i + 1)).innerHTML = tides[i];
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
  document.getElementById("2014").selected = true;
}

//use jQuery to pass in the nameOfLocations array
function customizeDisplayText(namesOfLocations) {
  //iterate through each location in the array and change it's name
  for (i = 0; i < namesOfLocations.length; i++) {
    nameOfLocation = namesOfLocations[i];
    nameOfLocation = nameOfLocation.replace(/Icww/gi, "ICWW");
    nameOfLocation = nameOfLocation.replace(/Pga/gi, "PGA");
    nameOfLocation = nameOfLocation.replace(/A1a/gi, "A1A");
    return nameOfLocation;
  }
}

