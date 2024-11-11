// generate crop code
function generateCropCode() {
  const code = "C-" + Math.floor(1000 + Math.random() * 900);
  $("#cropCode").val(code);
}

$(document).ready(function () {
  generateCropCode();
  loadFields();

  // Load field to crop dropdown
  function loadFields() {
    $.ajax({
      url: "http://localhost:5050/cropmonitoring/api/v1/fields/allFields", // Endpoint to fetch fields
      method: "GET",
      success: function (fields) {
        $("#field")
          .empty()
          .append("<option disabled selected>Select Field</option>");

        fields.forEach((field) => {
          $("#field").append(
            new Option(
              `${field.fieldCode} - ${field.fieldName}`,
              field.fieldCode
            )
          );
        });
      },
      error: function (xhr) {
        console.error("Failed to load fields:", xhr.responseText);
      },
    });
  }

  // Save Crop
  $("#cropForm").on("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(this);
    formData.append("cropCode", $("#cropCode").val());
    formData.append("cropCommonName", $("#cropCommonName").val());
    formData.append("cropScientificName", $("#cropScientificName").val());
    formData.append("category", $("#cropCategory").val());
    formData.append("cropSeason", $("#cropSeason").val());
    formData.append("fieldCode", $("#field").val());
    formData.append("cropImage", $("#cropImage")[0].files[0]);

    $.ajax({
      url: "http://localhost:5050/cropmonitoring/api/v1/crops",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
        alert("Crop saved successfully!");
        $("#cropForm")[0].reset();
      },
      error: function (xhr, status, error) {
        alert("Error saving crop: " + xhr.responseJSON.message);
      },
    });
  });

  
});
