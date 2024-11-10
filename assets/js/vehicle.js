$(document).ready(function () {
  // Vehicle code generation
  function generateVehicleCode() {
    const code = "V-" + Math.floor(1000 + Math.random() * 900);
    $("#vehicleCode").val(code);
  }
  generateVehicleCode();

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
});
