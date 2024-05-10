const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.yaml$/,
    use: 'yaml-loader',
  })
);
