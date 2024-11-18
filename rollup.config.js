import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: [
    {
      file: './dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: './dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
  ],
  external: [
    'react', 
    'react-dom', 
    '@chakra-ui/react', 
    '@chakra-ui/icons', 
    'react-router-dom', 
    '@mui/icons-material', 
    'react-icons',
    'axios', 
    'lodash',
    'dayjs'
  ],
};
