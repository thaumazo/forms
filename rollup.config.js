// based on tutorial at: 
// https://blog.harveydelaney.com/creating-your-own-react-component-library/

import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";
// import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';

import packageJson from "./package.json" assert { type: "json" };

export default {
  input: "src/index.js",
  output: [
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    // commonjs(),
    // typescript({ useTsconfigDeclarationDir: true }),
    postcss(),
    babel({
       babelHelpers: 'bundled',
       presets: ['@babel/preset-react'],
       extensions: ['.js'],
       plugins: [
        "@babel/plugin-proposal-export-default-from"
      ]

    }),
    replace({
       preventAssignment: false,
       'process.env.NODE_ENV': '"development"'
    })
  ],
  external: [
    'react',
    'react-redux',
    'react-router',
    'react-router-dom',
    'redux'
  ]
};


