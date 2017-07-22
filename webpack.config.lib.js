const path = require('path')

const filename = process.env.NODE_ENV === 'prod'
  ? 'circos.min.js' : 'circos.js'

module.exports = {
  entry: './src/circos.js',
  output: {
    path: __dirname + '/dist',
    filename: filename,
    library: 'Circos',
    libraryTarget: 'var'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
}
