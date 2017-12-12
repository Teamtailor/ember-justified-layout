/* eslint-env node */
'use strict';
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const Webpack = require('broccoli-webpack');
const justifiedLayout = new Funnel('node_modules/justified-layout/lib', {
  destDir: 'justified-layout',
  files: ['index.js'],
});

const PackOpts = {
  entry: 'justified-layout/lib/index.js',
  output: {
    filename: 'justified-layout/justified-layout.js',
    library: 'justified-layout',
    libraryTarget: 'umd',
  },
};

const packedJustifiedLayout = new Webpack([justifiedLayout], PackOpts);

const transformAMD = name => ({
  using: [{ transformation: 'amd', as: name }],
});

module.exports = {
  name: 'ember-justified-layout',

  included(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;

    const vendor = this.treePaths.vendor;
    // requires ember-cli 2.9+
    // https://github.com/ember-cli/ember-cli/pull/5976
    app.import(
      vendor + '/justified-layout/justified-layout.js',
      transformAMD('justified-layout')
    );

    return app;
  },

  treeForVendor(vendorTree) {
    const trees = [packedJustifiedLayout];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    return mergeTrees(trees);
  },

  isDevelopingAddon() {
    return true;
  },
};
