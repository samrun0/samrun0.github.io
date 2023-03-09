const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const PUBLIC_PATH = path.join(__dirname, 'public');
const OUTPUT_PATH = path.join(__dirname, 'build'); // this is the output path for the html file

const htmlPlugin = new HtmlWebPackPlugin({
  template: path.join(PUBLIC_PATH, 'index.html'),
  filename: './index.html'
});

module.exports = {
  entry: {
    main: path.join(__dirname, 'src', 'index.js'),
  },
  
  output: {
    path: OUTPUT_PATH, // this is the actual path that it puts everything in (only js files defined in entry)
    filename: "[name].js",
  },

  devServer: {
    static: [PUBLIC_PATH],
  },

  resolve: {
    extensions: ['*', '.js', '.ts'],
    alias: {
      resources: path.resolve('./resources'),
    },
  },

  // Adding source map for better error logs (so not all point to bundler.js)
  devtool: 'inline-source-map', 

  plugins: [
    htmlPlugin,
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]?[hash]',
        },
      },
      {
        test: /\.(glb|gltf|bin)$/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]?[hash]',
        },
      },
    ]
  }
};
