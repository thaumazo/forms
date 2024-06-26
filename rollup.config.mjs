// import preserveDirectives from "rollup-plugin-preserve-directives";

// based on tutorial at:
// https://blog.harveydelaney.com/creating-your-own-react-component-library/

//import scss from 'rollup-plugin-scss';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";
// import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import del from 'rollup-plugin-delete';
//import packageJson from "./package.json" assert { type: "json" };

export default {
  input: [
    "src/Alert/index.jsx",
    "src/AutoForm/index.jsx",
    "src/Button/index.jsx",
    "src/Email/index.jsx",
    "src/Layout/index.jsx",
    "src/Select/index.jsx",
    "src/Error/index.jsx",
    "src/Grid/index.jsx",
    "src/base/Search.jsx",
    "src/lib/formSchema.js",
    "src/validity/checkServerValidity.js",
  ],
  output: [
    {
      dir: "dist",
      // entryFileNames: '[name].js',
      /*
      entryFileNames: (chunkInfo) => {
        const extension = chunkInfo.facadeModuleId.split('.').pop();
        return `${chunkInfo.name}.${extension}`;
      },
      */
      entryFileNames: '[name].js',
      format: "es",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src', 
      sourcemap: true,
      banner: (data) => {
        const clients = [
          "Provider.js",
          "AutoForm/index.js",
        ];
        if (clients.includes(data.fileName)) {
          return '"use client";';
        }
      },
    },
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    peerDepsExternal(),
    // preserveDirectives({}),
    /*
    scss({
      output: 'dist/bundle.css', 
    }),
    */
    resolve({
      extensions: [".mjs", ".js", ".json", ".node", ".jsx"],
    }),
    // commonjs(),
    /*
    typescript({
      noEmitOnError: true, 
      useTsconfigDeclarationDir: true 
    }),
    */
    postcss({
      modules: true,
      extract: "global.css",
      extensions: ['.scss', '.css'],
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: [
        "@babel/preset-env",
      /*
        [
          "@babel/preset-react",
          {
            runtime: "automatic",
          },
        ],
      */
      ],
      plugins: [
        "@babel/plugin-proposal-export-default-from",
        [
        "@babel/plugin-transform-react-jsx",
        {
          runtime: "automatic",
        },
        ]
      ],
    }),
    replace({
      preventAssignment: false,
      "process.env.NODE_ENV": '"development"',
    }),
  ],
  external: [
    "src/app",
    "react",
    "react-dom",
    "react-redux",
    "react-router",
    "react-router-dom",
    "redux",
    "react-is",
    "react/jsx-runtime",
  ],
  onwarn: function(warning, warn) {
    // suppress the "default imported from external module" warnings

    if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
      // get rid of warning on "use client" directive
      return;
    }

    if (
      warning.code === 'UNUSED_EXTERNAL_IMPORT' 
      && warning.message.includes("imported from external module \"react\" but never used")
    ) {
      return;
    }
    warn(warning);
  }
};
