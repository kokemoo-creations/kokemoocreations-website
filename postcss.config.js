const path = require('path');
const fs = require('fs');

module.exports = {
  plugins: [
    require('postcss-import')({
      // This custom resolver forces Node to bypass standard import logic 
      // and mathematically build the absolute path for every CSS file.
      resolve: function (id) {
        // Remove any leading './' or '/' from the import name
        const cleanId = id.replace(/^\.\//, '').replace(/^\//, '');
        
        // 1. Check your root assets/css folder first
        const rootPath = path.join(__dirname, 'assets', 'css', cleanId);
        if (fs.existsSync(rootPath)) {
          return rootPath;
        }

        // 2. Check the theme's assets/css folder second
        const themePath = path.join(__dirname, 'themes', 'demius', 'assets', 'css', cleanId);
        if (fs.existsSync(themePath)) {
          return themePath;
        }

        // If it can't find it, return the original string so it fails normally
        return id;
      }
    }),
    require('autoprefixer')
  ]
};