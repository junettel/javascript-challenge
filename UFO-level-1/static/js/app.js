// Import data from data.js
var tableData = data;

// Check that data is importing
console.log(tableData.length);

// Create reference variables
var tbodyElement = d3.select("tbody");
var filterButton = d3.select("#filter-btn");
var inputDateField = d3.select("#datetime");

// Create count variable and set starting value
var ufoSightingsCount = 0;

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
    ufoSightingsCount += 1;
    console.log(ufoSightingsCount, ufoSighting);
  });
};

addTableData(tableData);

// Create event handler
filterButton.on("click", dateFilter);

// Create event handler function to filter based on date input
function dateFilter() {

  // Prevent page refresh
  d3.event.preventDefault();

  // Get value property of the user input date filter
  var inputDate = inputDateField.property("value").trim();
  console.log(inputDate);

  // Filter data by user input
  var filteredByDate = tableData.filter(tableDatum => tableDatum.datetime === inputDate);
  console.log(filteredByDate);

  // Clear table body before adding filtered data
  tbodyElement.html("");

  // Update table with filtered response
  var response = {filteredByDate};

  // Add filtered results to table
  if (response.filteredByDate.length !== 0) {
    addTableData(filteredByDate);
  } 
  // Print error message if user filter input does not match any UFO sightings
  else {
    tbodyElement.append("tr").text("No sightings on this date, try searching for a different date");
  }
};


