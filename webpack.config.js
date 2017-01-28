var path = require('path');

module.exports = {
  entry: './src/circos.js',
  output: {
    path: './dist',
    filename: 'circos.js',
    library: 'Circos',
    libraryTarget: 'var',
  },
  module: {
		loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(__dirname, 'src'),
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      }
    ]
  }
}
