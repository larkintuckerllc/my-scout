const CSS = /\.css$/;
const JS = /\.js$/;
const CHUNK_ONLY_CONFIG = {
};
const EMIT = 'emit';
const SCOUT_HEAD = [
  '\'use strict\';',
  '(function () {',
  '  var ASSETS = [',
  '',
];
const SCOUT_FOOT = [
  '  ];',
  '  var scoutEl = document.getElementById(\'scout\');',
  '  var baseUrl = scoutEl.dataset.baseUrl;',
  '  var assets = ASSETS.map(appendBaseUrl);',
  '  loadjs(assets, {',
  '    success: handleSuccess,',
  '    async: false,',
  '  });',
  '',
  '  function appendBaseUrl(asset) {',
  '    return baseUrl + asset;',
  '  }',
  '',
  '  function handleSuccess() {',
  '    window.renderApplication();',
  '  }',
  '})();',
  '',
];
const CHUNK_SORT_ORDER = 'auto';

function ScoutWebpackPlugin() {
}

ScoutWebpackPlugin.prototype.apply = function(compiler) {
  const self = this;

  const handleEmit = (compilation, callback) => {

    const filterChunks  = chunks => chunks.filter(chunk => {
      const chunkName = chunk.names[0];
      if (chunkName === undefined) {
        return false;
      }
      if (typeof chunk.isInitial === 'function') {
        if (!chunk.isInitial()) {
          return false;
        }
      } else if (!chunk.initial) {
        return false;
      }
      return true;
    });
   
    // CHUNKS
    const allChunks = compilation.getStats().toJson(CHUNK_ONLY_CONFIG).chunks;
    let chunks = filterChunks(allChunks);
    chunks = chunks.sort(CHUNK_SORT_ORDER);
    chunks = compilation.hooks.htmlWebpackPluginAlterChunks.call(chunks, { plugin: self });

    // ASSETS
    let assets = [];
    for (let i = 0; i < chunks.length; i += 1) {
      const chunk = chunks[i];
      const chunkAssets = chunk.files.filter(asset => CSS.test(asset) || JS.test(asset));
      assets = assets.concat(chunkAssets);
    }

    // OUTPUT
    let scoutAsset = SCOUT_HEAD.join('\n');
    for (let i = 0; i < assets.length; i += 1) {
      const asset = assets[i];
      scoutAsset += '    \'' + asset + '\',' + '\n';
    }
    scoutAsset += SCOUT_FOOT.join('\n');
    compilation.assets['scout.js'] = {
      source: () => scoutAsset,
      size: () => scoutAsset.length,
    };

    callback();
  }

  compiler.plugin(EMIT, handleEmit);
};

module.exports = ScoutWebpackPlugin;
