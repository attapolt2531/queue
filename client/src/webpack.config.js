// webpack.config.js

module.exports = {
    // ... other configurations
    resolve: {
      fallback: {
        "https": require.resolve("https-browserify")
      }
    }
  };
  