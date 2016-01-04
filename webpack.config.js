module.exports = {
  entry: {
    build: './index.js',
  },

  output: {
    path: './',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
    ]
  },

  devServer: {
    contentBase: './',
  }
}
