module.exports = {
  entry: {
    tweezer: "./src/tweezer.js"
  },

  output: {
    library: 'Tweezer',
    libraryTarget: 'umd',
    filename: '[name].js',
    path: './build'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  },


}

// devServer: {
  //   historyApiFallback: true,
  //   contentBase: "build",
  // }
