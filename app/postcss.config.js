const { resolve } = require("path");
const postcssPresetEnv = require("postcss-preset-env");
let path = require("path");
const atImport = require("postcss-import");
let fsp = require("fs/promises");

const workspaceFolder = resolve(__dirname + "/../node_modules/");
console.info("Using workspaceFolder", workspaceFolder);
module.exports = {
  plugins: [
    atImport({
      addModulesDirectories: [workspaceFolder],
    }),
    require("postcss-modules")({
      getJSON: async (cssFilename, json, outputFilename) => {
        console.log(cssFilename, json, outputFilename);
        await fsp
          .mkdir(path.dirname(outputFilename), { recursive: true })
          .catch(() => {});
        await fsp.writeFile(
          `${outputFilename.replace(/\.css$/, ".json")}`,
          JSON.stringify(json)
        );
      },
    }),
    postcssPresetEnv(),
  ],
};
