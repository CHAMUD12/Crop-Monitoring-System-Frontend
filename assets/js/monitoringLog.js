// Generate Monitoring Log Code
function generateLogCode() {
  const code = "L-" + Math.floor(1000 + Math.random() * 900);
  $("#logCode").val(code);
}

$(document).ready(function () {
  generateLogCode();
  loadFields();
  loadCrops();
  loadStaff();

  // Load fields into dropdown
  function loadFields() {
    $.ajax({
      url: "http://localhost:5050/cropmonitoring/api/v1/fields/allFields",
      method: "GET",
      success: function (fields) {
        $("#fieldSelect")
          .empty()
          .append("<option disabled selected>Select Field</option>");
        fields.forEach((field) => {
          $("#fieldSelect").append(
            new Option(
              `${field.fieldCode} - ${field.fieldName}`,
              field.fieldCode
            )
          );
        });
      },
      error: function () {
        alert("Failed to load fields.");
      },
    });
  }

  // Load crops into dropdown
  function loadCrops() {
    $.ajax({
      url: "http://localhost:5050/cropmonitoring/api/v1/crops/allcrops",
      method: "GET",
      success: function (crops) {
        $("#cropSelect")
          .empty()
          .append("<option disabled selected>Select Crop</option>");
        crops.forEach((crop) => {
          $("#cropSelect").append(
            new Option(
              `${crop.cropCode} - ${crop.cropCommonName}`,
              crop.cropCode
            )
          );
        });
      },
      error: function () {
        alert("Failed to load crops.");
      },
    });
  }

  // Load staff into dropdown
  function loadStaff() {
    $.ajax({
      url: "http://localhost:5050/cropmonitoring/api/v1/staff/allstaff",
      method: "GET",
      success: function (staffList) {
        $("#staffSelect")
          .empty()
          .append("<option disabled selected>Select Staff</option>");
        staffList.forEach((staff) => {
          $("#staffSelect").append(
            new Option(`${staff.id} - ${staff.firstName}`, staff.id)
          );
        });
      },
      error: function () {
        alert("Failed to load staff.");
      },
    });
  }

  // Save Monitoring Log
  $("#monitoringLogForm").on("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    formData.append("logCode", $("#logCode").val());
    formData.append("logDate", $("#logDate").val());
    formData.append("observation", $("#logDetails").val());
    formData.append("logImage", $("#observedImage")[0].files[0]);
    formData.append("fieldCode", $("#fieldSelect").val());
    formData.append("cropCode", $("#cropSelect").val());
    formData.append("staffId", $("#staffSelect").val());

    $.ajax({
      url: "http://localhost:5050/cropmonitoring/api/v1/monitoringLog",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function () {
        alert("Monitoring log saved successfully!");
        $("#monitoringLogForm")[0].reset();
        generateLogCode();
      },
      error: function () {
        alert("Error saving monitoring log.");
      },
    });
  });
});
