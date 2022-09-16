const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path')

module.exports = merge(common, {
    mode: 'production',
    entry: './src/index.ts',
    performance: {
        hints: false
    },
});