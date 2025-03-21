module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      safe: false,
      allowUndefined: false,
    }],
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@app_model': './src/app_model',
        '@components': './src/components',
        '@api': './src/api',
      },
    }],
  ],
};
