$('#hashgroup').hide()

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    $('#result').hide();
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
          if (typeof web3 !== 'undefined') {
            $('#hash').val(web3.sha3(e.target.result))
          } else if (typeof ethereumjs !== 'undefined') {
            var hash = ethereumjs.Util.sha3(e.target.result);
            hash = ethereumjs.Util.bufferToHex(hash)
            $('#hash').val(hash)
          }
          $('#hashgroup').show()
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

// document.getElementById('files').addEventListener('change', handleFileSelect, false);
$('#files').on('change', handleFileSelect);