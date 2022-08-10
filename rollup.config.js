import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import svg from 'rollup-plugin-svg';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import sass from 'node-sass';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import packageJson from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/index.js',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    svg(),
    // This prevents needing an additional `external` prop in this config file by automaticall excluding peer dependencies
    peerDepsExternal(),
    // Convert CommonJS modules to ES6
    commonjs({
      include: 'node_modules/**',
      // This was required to fix some random errors while building
      namedExports: {
        'react-is': ['isForwardRef', 'isValidElementType'],
      },
    }),
    // "...locates modules using the Node resolution algorithm"
    resolve({ extensions }),
    image(),
    // Do Babel transpilation
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    // Does a number of things; Compiles sass, run autoprefixer, creates a sourcemap, and saves a .css file
    postcss({
      preprocessor: (content, id) =>
        new Promise((res) => {
          const result = sass.renderSync({ file: id });

          res({ code: result.css.toString() });
        }),
      plugins: [autoprefixer],
      modules: {
        scopeBehaviour: 'global',
      },
      sourceMap: true,
      extract: true,
    }),
  ],
};
