'use strict';
(function () { 
  var style = 'https://s3.amazonaws.com/my-scout/main.76310564c34c2af2ceeb.css';
  var script = 'https://s3.amazonaws.com/my-scout/main.76310564c34c2af2ceeb.js';
  loadjs([style, script], {
    success: function() {
      window.renderApplication();
    },
    async: false
  });
})();
