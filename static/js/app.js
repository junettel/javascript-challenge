// Import data from data.js
var tableData = data;

// Check that data is importing
console.log(tableData.length);

// Create reference variables
var tbodyElement = d3.select("tbody");
var filterButton = d3.select("#filter-btn");
var clearButton = d3.select("#clear-filter-btn");
var inputDateField = d3.select("#datetime");
var inputCityField = d3.select("#city");
var inputStateField = d3.select("#state");
var inputCountryField = d3.select("#country");
var inputShapeField = d3.select("#shape");

// Create count variable and set starting value
// var ufoSightingsCount = 0;

// Use JS to loop and fill HTML table with row data
var addTableData = (dataInput) => {
  dataInput.forEach(ufoSighting => {

    // Create new table row for each UFO sighting
    var tableRow = tbodyElement.append("tr");

    // Add values to cells for each new row
    Object.entries(ufoSighting).forEach(([key, value]) => {
      tableRow.append("td").text(value);
    });

    // Update count and print with corresponding data for each iteration 
    // ufoSightingsCount += 1;
    // console.log(ufoSightingsCount, ufoSighting);
  });
};
addTableData(tableData);

// Create event handler for clear filter button
clearButton.on("click", function() {
  location.reload();
});

// Create event handler for filter
filterButton.on("click", filterResponse);

function filterResponse() {

  // Prevent page refresh
  d3.event.preventDefault();

  // Clear table body before adding filtered data
  tbodyElement.html("");

  // Get value property of the user input filter
  var inputDate = inputDateField.property("value").trim();
  var inputCity = inputCityField.property("value").toLowerCase().trim();
  var inputState = inputStateField.property("value").toLowerCase().trim();
  var inputCountry = inputCountryField.property("value").toLowerCase().trim();
  var inputShape = inputShapeField.property("value").toLowerCase().trim();

  // Console log filter input values
  var inputFilter = {
    datetime: inputDate,
    city: inputCity,
    state: inputState,
    country: inputCountry,
    shape: inputShape
  };
  console.log(inputFilter);

  // Filter tableData taking in multiple search criteria
  var filteredData = tableData.filter(td => (td.datetime === inputDate || inputDate === "") &&
                                            (td.city === inputCity || inputCity === "") &&
                                            (td.state === inputState || inputState === "") &&
                                            (td.country === inputCountry || inputCountry === "") &&
                                            (td.shape === inputShape || inputShape === "")
                                            );
  console.log(filteredData);

  // Update table with filtered response
  var response = {filteredData};

  // Add filtered results to table
  if (response.filteredData.length !== 0) {
    addTableData(filteredData);
  }
  // Print error message if user filter input does not match any UFO sightings
  else {
    tbodyElement.append("tr").text("Error, no matching results! Please try limiting search criteria.");
  }
};

