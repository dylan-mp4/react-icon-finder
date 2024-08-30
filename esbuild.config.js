const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./extension.js'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/extension.js',
  external: ['vscode'], 
  minify: true,
  sourcemap: true,
}).catch(() => process.exit(1));