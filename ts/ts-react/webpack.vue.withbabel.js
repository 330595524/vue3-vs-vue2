const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const  {VueLoaderPlugin} = require('vue-loader')

module.exports = {
  entry:{
    index: './src/main.ts'
  },
  mode: "development",
  module:{
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options:{
          appendTsSuffixTo:[/\.vue$/]
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve:{
    extensions:['.tsx','.ts','.js']
  },
  output :{
    filename:"bundle.[name].js",
    path: path.resolve(__dirname,'dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'template.html')
    }),
    new VueLoaderPlugin()
  ],
  devServer:{
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port:3020
  }

}
