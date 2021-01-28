const path = require( 'path' );
const HtmlWebpackPlugin = require('html-webpack-plugin');

let htmlPageNames = [];
const multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // JS files
  })
});

module.exports = {

    //generate source map
    devtool: 'source-map',

    //add devServer
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },

    // entry files
    entry: {
        main: './src/assets/ts/main.ts'
    },

    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'assets/js/[name].js',
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
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/announcementsTeacher.html",
          chunks: ['main']
        })
      ].concat(multipleHtmlPlugins)
};