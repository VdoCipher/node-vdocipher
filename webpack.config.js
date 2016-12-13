var webpack = require('webpack');

var environmentConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
});

var config= {
  entry: './index.js',
  output: {
    path: __dirname + '/lib',
    filename: 'vdocipher.js',
	library: 'vdocipher',
	libraryTarget: 'umd',
	umdNamedDefine: true
  },
  target: 'node',
	"externals" : [
		{
			"request" : "request"
		}
	],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    environmentConfig
  ]
};

module.exports = config;
