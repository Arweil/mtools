const fs = require('fs');

class GenerateAssetWebpackPlugin {
  constructor(options) {
    this.filename = options.filename;
    this.fn = options.fn;
    this.files = options.extraFiles || [];
  }

  apply(compiler) {
    compiler.hooks.emit.tap('GenerateAssetWebpackPlugin', compilation => {
      this.fn(compilation, (err, body) => {
        if (err) {
          return err;
        }

        compilation.assets[this.filename] = {
          source: () => body,
          size: () => body.length,
        };

        this.files.forEach(file => {
          compilation.assets[file] = {
            source: () => fs.readFileSync(file),
            size: () => fs.statSync(file).size,
          };
        });
      });
    });
  }
}

module.exports = GenerateAssetWebpackPlugin;
