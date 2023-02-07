module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@api": "./src/api",
            "@components": "./src/components",
            "@contexts": "./src/contexts",
            "@navigators": "./src/navigators",
            "@screens": "./src/screens",
            "@constants": "./src/constants",
            "@assets": "./assets",
            "@utils": "./src/utils",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          allowUndefined: false,
        },
      ],
    ],
  };
};
