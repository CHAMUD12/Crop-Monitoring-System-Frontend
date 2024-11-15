$(document).ready(function () {
  generateStaffID();
  loadVehicles();

  // Generate Staff ID
  function generateStaffID() {
    const id = "S-" + Math.floor(1000 + Math.random() * 9000);
    $("#staffId").val(id);
  }

  // Load vehicles for the dropdown
  function loadVehicles() {
    $.ajax({
      url: "http://localhost:5050/cropmonitoring/api/v1/vehicles/allVehicles",
      method: "GET",
      success: function (vehicles) {
        $("#vehicleList")
          .empty()
          .append("<option disabled selected>Select Vehicle</option>");
        vehicles.forEach((vehicle) => {
          $("#vehicleList").append(
            new Option(
              `${vehicle.vehicleCode} - ${vehicle.vehicleCategory}`,
              vehicle.vehicleCode
            )
          );
        });
      },
      error: function (xhr) {
        console.error("Failed to load vehicles:", xhr.responseText);
      },
    });
  }

  // Save Staff
  $("#staffForm").on("submit", function (e) {
    e.preventDefault();

    const staffData = {
      id: $("#staffId").val(),
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      designation: $("#designation").val(),
      gender: $("#gender").val(),
      joinedDate: $("#joinedDate").val(),
      dob: $("#dob").val(),
      contactNo: $("#contactNo").val(),
      email: $("#email").val(),
      role: $("#role").val(),
      addressLine01: $("#address1").val(),
      addressLine02: $("#address2").val(),
      addressLine03: $("#address3").val(),
      addressLine04: $("#address4").val(),
      addressLine05: $("#address5").val(),
      vehicleCode: $("#vehicleList").val(),
    };

    $.ajax({
      url: "http://localhost:5050/cropmonitoring/api/v1/staff",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(staffData),
      success: function () {
        alert("Staff saved successfully!");
        $("#staffForm")[0].reset();
        generateStaffID();
      },
      error: function (xhr) {
        alert("Error saving staff: " + xhr.responseText);
      },
    });
  });
});
