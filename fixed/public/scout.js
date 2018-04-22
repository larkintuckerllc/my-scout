'use strict';
(function () { 
  var STYLE = 'main.76310564c34c2af2ceeb.css';
  var SCRIPT = 'main.76310564c34c2af2ceeb.js';
  var scoutEl = document.getElementById('scout');
  var baseUrl = scoutEl.dataset.baseUrl;  
  var style = baseUrl + STYLE;
  var script = baseUrl + SCRIPT;
  loadjs([style, script], {
    success: function() {
      window.renderApplication();
    },
    async: false
  });
})();