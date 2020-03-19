const path = require('path')

module.exports = {
  entry: './src/circos.js',
  output: {
    path: __dirname + '/dist',
    filename: 'circos.es6.js',
    libraryTarget: 'umd',
    library: 'Circos',
    umdNamedDefine: true
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
