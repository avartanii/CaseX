function submitTestRequest() {
    axios.get('http://localhost:3000/cases')
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
}

var uploadHandler = function (uploadRoute, uploader) {
    return function (event) {
        var $upload = $(this);
        var filename = submittedFilename($upload);
        var formData = createFileForm($upload);
        uploader(uploadRoute, filename, formData);
    };
};

var importGrn = function (uploadRoute, filename, formData) {
    var fullUrl = [ $("#service-root").val(), uploadRoute ].join("/");
    $.ajax({
        url: fullUrl,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        crossDomain: true
    }).done(function (network) {
        annotateLinks(network);
        displayNetwork(network, filename, normalization);
        reloader = function () {
            importGrn(uploadRoute, filename, formData);
        };
    }).error(networkErrorDisplayer);
};

$("#upload-pdf").on("change", uploadHandler("upload-pdf", importGrn));
