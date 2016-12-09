const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const PlonePlugin = require('plonetheme-webpack-plugin');

const SITENAME = process.env.SITENAME || 'goodlife';
const THEMENAME = process.env.THEMENAME || 'goodlifetheme';
const PUBLICPATH = process.env.PUBLICPATH || '/' + SITENAME + '/++theme++' + THEMENAME + '/';

const PATHS = {
  src: path.join(__dirname, 'src', THEMENAME),
  build: path.join(__dirname, 'theme', THEMENAME)
};

const PLONE = new PlonePlugin({
  portalUrl: 'http://localhost:8080/' + SITENAME,
  publicPath: PUBLICPATH,
  sourcePath: PATHS.src,
  ignore: [
    path.join(THEMENAME, '?(*.js|*.jsx|*.less|*.scss)'),  // allow tinymce.css
    path.join(THEMENAME, '(icons|sass|fonts|js)', '*')
  ]
});

const common = {
  entry: {
    'default': path.join(PATHS.src, 'default'),
    'logged-in': path.join(PATHS.src, 'logged-in')
  },
  output: {
    path: PATHS.build
  },
  devServer: {
    outputPath: PATHS.build
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react': 'react',  // override react shipped in Plone
      'jqtree': '++plone++static/components/jqtree/lib/tree.jquery', // use src version
      'mockup-patterns-structure': path.join( // has dynamic requires
        __dirname, 'node_modules/mockup/mockup/patterns/structure/pattern'),
      'mockup-patterns-structure-url': path.join( // has dynamic requires
        __dirname, 'node_modules/mockup/mockup/patterns/structure'),
      'mosaic-base-url': path.join( // use master
        __dirname, '../src/plone.app.mosaic/src/plone/app/mosaic/browser/static/js'),
      'mosaic': path.join( // use master
        __dirname, '../src/plone.app.mosaic/src/plone/app/mosaic/browser/static/js/mosaic.pattern')
    }
  },
  module: {
    exprContextCritical: false,  // structure pattern has dynamic requires
    loaders: [
      { test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.src }
    ]
  }
};

switch(path.basename(process.argv[1])) {
  case 'webpack':
    module.exports = merge(PLONE.production, common, {
      resolve: {
        alias: {
          'react': 'react-lite',
          'react-dom': 'react-lite'
        }
      }
    });
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
