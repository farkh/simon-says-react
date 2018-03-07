const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	source: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
};

module.exports = {
	entry: PATHS.source + '/index.js',
	output: {
		filename: '[name].js',
		path: PATHS.dist
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader', 'css-loader', 'sass-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: PATHS.source + '/index.html',
			filename: 'index.html'
		})
	],
	devServer: {
		stats: 'errors-only'
	}
}
