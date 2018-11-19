
document.addEventListener('DOMContentLoaded', function () {
    const apikey = 'A34w3w7mQfKchEtlXTaqGz';
    const client = filestack.init(apikey);
    const options = {
  uploadInBackground: false,
  onUploadDone: showFileData,
  maxFiles: 5,
  };

  client.picker(options).open();

  function showFileData(files) {
    console.log(files);

    var i
    for (i=0; i<files.filesUploaded.length; i++){
      var file = files.filesUploaded[i]; 
      var node = document.createElement("LI");
      node.classList.add("liElem")
      node.innerHTML += '<a target="_blank" href="' + file.url + '">'+'<img src="' + makeThumbnailURL(file.handle, file.mimetype) + '"> ' + file.filename + '</a>';
      document.getElementById("uploadedFiles").appendChild(node);
    }
  }

  function makeThumbnailURL(handle, mimetype) {

    var documentMimetypes = ['application/pdf','text/plain','text/html',
      'text/rtf; text/richtext; application/rtf; application/x-rtf',
      'application/msword', 'application/vnd.ms-word.document.macroenabled.12',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-powerpoint',
      'application/vnd.ms-powerpoint.presentation.macroenabled.12','application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel','application/vnd.ms-excel.sheet.macroenabled.12','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.oasis.opendocument.text','application/vnd.oasis.opendocument.presentation','application/vnd.oasis.opendocument.spreadsheet'];
    var baseURL = "http://cdn.filestackcontent.com/";

    if (mimetype.indexOf("image") > -1) {
      return baseURL + "resize=height:100,width:100,fit:crop/" + handle;
    } else if (documentMimetypes.indexOf(mimetype) > -1) {
      return baseURL + "output=format:jpg/resize=height:100,width:100,fit:crop/" + handle;
    } else {
      return ""
    }
  }
});
