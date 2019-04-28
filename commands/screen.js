// @cliDescription  Example AirshipBoilerplate command
// Generates a "screen"

const patterns = require("../lib/patterns");

module.exports = async function(context) {
  const { parameters, strings, print, ignite, patching } = context;
  const { pascalCase, isBlank } = strings;

  // validation
  if (isBlank(parameters.first)) {
    print.info(`ignite generate screen <name>\n`);
    print.info("A name is required.");
    return;
  }

  const name = pascalCase(parameters.first);
  const props = { name };

  const appNavFilePath = `${process.cwd()}/app/navigation/index.ts`;
  const importToAdd = `import ${name} from "../screens/${name}";`;

  ignite.patchInFile(appNavFilePath, {
    after: patterns[patterns.constants.PATTERN_IMPORTS],
    insert: importToAdd
  });

  const jobs = [
    {
      template: "screen.tsx.ejs",
      target: `app/screens/${name}.tsx`
    }
  ];

  await ignite.copyBatch(context, jobs, props);
};
