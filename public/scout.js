const style = 'https://s3.amazonaws.com/my-scout/main.be9e9a8594a8d24075eb.css';
const script = 'https://s3.amazonaws.com/my-scout/main.be9e9a8594a8d24075eb.js';
loadjs([style, script], {
  success: function() {
    window.handleLoaded();
  },
  async: false
});
