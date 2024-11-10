$(document).ready(function () {
  // Vehicle code generation
  function generateVehicleCode() {
    const code = "V-" + Math.floor(1000 + Math.random() * 900);
    $("#vehicleCode").val(code);
  }
  generateVehicleCode();

  // save vehicle
  $("#vehicleForm").on("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(this);
    formData.append("vehicleCode", $("#vehicleCode").val());
    formData.append("licensePlateNumber", $("#licensePlate").val());
    formData.append("vehicleCategory", $("#vehicleCategory").val());
    formData.append("fuelType", $("#fuelType").val());
    formData.append("status", $("#status").val());
    formData.append("allocatedStaff", $("#allocatedStaff").val());
    formData.append("remarks", $("#remarks").val());

    $.ajax({
      url: "http://localhost:5050/cropmonitoring/api/v1/vehicles",
      type: "POST",
      data: JSON.stringify(Object.fromEntries(formData)),
      contentType: "application/json",
      processData: false,
      success: function (response) {
        alert("Vehicle saved successfully!");
        $("#vehicleForm")[0].reset();
        generateVehicleCode();
      },
      error: function (xhr, status, error) {
        alert(xhr.responseText);
      },
    });
  });

  // search vehicle
  function searchVehicle() {
    const vehicleCode = $("#searchField").val();
    if (!vehicleCode) return alert("Please enter Vehicle Code to search.");

    $.ajax({
      url: `http://localhost:5050/cropmonitoring/api/v1/vehicles`,
      type: "GET",
      data: { vehicleCode },
      success: function (vehicles) {
        if (vehicles.length > 0) {
          const vehicle = vehicles[0];
          $("#vehicleCode").val(vehicle.vehicleCode);
          $("#licensePlate").val(vehicle.licensePlateNumber);
          $("#vehicleCategory").val(vehicle.vehicleCategory);
          $("#fuelType").val(vehicle.fuelType);
          $("#status").val(vehicle.status);
          $("#allocatedStaff").val(vehicle.allocatedStaff);
          $("#remarks").val(vehicle.remarks);
        } else {
          alert("No vehicle found with that code.");
        }
      },
      error: function (xhr) {
        alert("Failed to search vehicle: " + xhr.responseText);
      },
    });
  }

  $("#searchIcon").click(searchVehicle);

  $("#searchField").on("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchVehicle();
    }
  });

  // Update vehicle
});
