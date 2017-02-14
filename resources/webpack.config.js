const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const PlonePlugin = require('plonetheme-webpack-plugin');

const SITENAME = process.env.SITENAME || 'goodlife';
const THEMENAME = process.env.THEMENAME || 'goodlifetheme';
const PUBLICPATH = process.env.PUBLICPATH || '/' + SITENAME + '/++theme++' + THEMENAME + '/';
const DISTPATH = process.env.DISTPATH || 'theme';

const PATHS = {
  src: path.join(__dirname, 'src', THEMENAME),
  build: path.join(__dirname, 'theme', THEMENAME),
  dist: path.join(__dirname, DISTPATH, THEMENAME)
};

const PLONE = new PlonePlugin({
  portalUrl: 'http://localhost:8080/' + SITENAME,
  publicPath: PUBLICPATH,
  sourcePath: PATHS.src,
  ignore: [
    path.join(THEMENAME, '?(*.js|*.jsx|*.less|*.scss)'),  // allow tinymce.css
    path.join(THEMENAME, 'bundles', '*'),
    path.join(THEMENAME, 'components', '*'),
    path.join(THEMENAME, 'components', 'icons', '*'),
    path.join(THEMENAME, 'fonts', '*'),
    path.join(THEMENAME, 'icons', '*'),
    path.join(THEMENAME, 'media', '*')
  ]
});

const common = {
  entry: {
    'default': path.join(PATHS.src, 'default'),
    'logged-in': path.join(PATHS.src, 'logged-in')
  },
  output: {
    path: PATHS.dist
  },
  devServer: {
    outputPath: PATHS.build
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      // use src version of tree.jquery
      'jqtree': '++plone++static/components/jqtree/lib/tree.jquery',
      // use fix importcss selector filter
      'mockup-patterns-tinymce': path.join(
        __dirname, 'node_modules', 'mockup', 'mockup', 'patterns', 'tinymce', 'pattern'),
      'mockup-patterns-tinymce-url': path.join(
        __dirname, 'node_modules', 'mockup', 'mockup', 'patterns', 'tinymce'),
      // fix issue with structure pattern using dynamic requires
      'mockup-patterns-structure': path.join(
        __dirname, 'node_modules', 'mockup', 'mockup', 'patterns', 'structure', 'pattern'),
      'mockup-patterns-structure-url': path.join(
        __dirname, 'node_modules', 'mockup', 'mockup', 'patterns', 'structure'),
      'mockup-patterns-livesearch': path.join(
        __dirname, 'node_modules', 'mockup', 'mockup', 'patterns', 'livesearch', 'pattern'),
      // use WIP mosaic
      'mosaic': path.join(
        __dirname, 'node_modules', 'plone-mosaic', 'src', 'plone', 'app', 'mosaic', 'browser', 'static', 'js', 'mosaic.pattern'),
      'mosaic-url': path.join(
        __dirname, 'node_modules', 'plone-mosaic', 'src', 'plone', 'app', 'mosaic', 'browser', 'static', 'js')
    }
  },
  module: {
    exprContextCritical: false,  // structure pattern has dynamic requires
    loaders: [
      { test: /\.js$/,
        loaders: ['babel?cacheDirectory'],
        include: [
          PATHS.src,
          path.join(__dirname, 'node_modules', 'bootstrap', 'js', 'src'),
        ]
      }
    ]
  }
};

switch(path.basename(process.argv[1])) {
  case 'webpack':
    module.exports = merge(PLONE.production, common);
    break;

  case 'webpack-dev-server':
    module.exports = merge(PLONE.development, common, {
      entry: [
        path.join(PATHS.src, 'default'),
        path.join(PATHS.src, 'logged-in')
      ]
    });
    break;
}
