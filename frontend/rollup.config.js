import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/main.jsx',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
  },
  plugins: [
    resolve({ extensions: ['.js', '.jsx'] }), // .jsx एक्सटेंशन को resolve करें
    commonjs(),
    babel({ exclude: 'node_modules/**', extensions: ['.js', '.jsx'] }), // .jsx एक्सटेंशन को ट्रांसपाइल करें
  ],
};