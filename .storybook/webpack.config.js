module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
          configFile: 'tsconfig.storybook.json'
        }
      },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
