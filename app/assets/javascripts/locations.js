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
