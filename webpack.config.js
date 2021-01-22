const path = require( 'path' );
const HtmlWebpackPlugin = require('html-webpack-plugin');

let htmlPageNames = [];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // JS files
  })
});

module.exports = {

    // bundling mode
    // mode: 'production',

    //generate source map
    devtool: 'source-map',

    //add devServer
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },

    //compile project when it changes
    // watch: true,

    // entry files
    entry: {
        main: './src/assets/ts/main.ts'
    },

    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist/assets/js' ),
        filename: '[name].js',
    },

    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ],
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html",
          chunks: ['main']
        })
      ].concat(multipleHtmlPlugins)
};