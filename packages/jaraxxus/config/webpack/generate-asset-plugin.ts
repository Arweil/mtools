import fs from 'fs';
import type { Compilation, Compiler } from 'webpack';
import { sources } from 'webpack';

interface GenerateAssetOptions {
  filename: string;
  fn: (compilation: Compilation, callback: (err: Error | null, body: string) => void) => void;
  extraFiles?: string[];
}

export default class GenerateAssetPlugin {
  private filename: string;
  private fn: GenerateAssetOptions['fn'];
  private files: string[];

  constructor(options: GenerateAssetOptions) {
    this.filename = options.filename;
    this.fn = options.fn;
    this.files = options.extraFiles || [];
  }

  apply(compiler: Compiler): void {
    compiler.hooks.emit.tap('GenerateAssetWebpackPlugin', (compilation: Compilation) => {
      this.fn(compilation, (err: Error | null, body: string) => {
        if (err) {
          compilation.errors.push(err);
          return;
        }

        compilation.assets[this.filename] = new sources.RawSource(body);

        this.files.forEach((file: string) => {
          const content = fs.readFileSync(file);
          compilation.assets[file] = new sources.RawSource(content);
        });
      });
    });
  }
}
