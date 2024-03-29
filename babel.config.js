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
            "@hooks": "./src/hooks",
            "@navigators": "./src/navigators",
            "@screens": "./src/screens",
            "@constants": "./src/constants",
            "@assets": "./assets",
            "@utils": "./src/utils",
            "@atoms": "./src/recoil/atoms",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          blacklist: null, // DEPRECATED
          whitelist: null, // DEPRECATED
          safe: false,
          allowUndefined: false,
          verbose: false,
        },
      ],
    ],
  };
};
