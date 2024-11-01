const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();
  defaultConfig.watchFolders = [];
  return defaultConfig;
})();
