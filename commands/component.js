// @cliDescription  Example AirshipBoilerplate command
// Generates a "component"

module.exports = async function (context) {
  const { parameters, strings, print, ignite, patching } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`ignite generate component <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const props = { name }

  const appNavFilePath = `${process.cwd()}/app/components/index.ts`
  const exportToAdd = `export { default as ${name} } from "./${name}";
`;

  patching.prependToFile(appNavFilePath, exportToAdd);

  const jobs = [{
    template: 'component.tsx.ejs',
    target: `app/components/${name}.tsx`
  }]

  await ignite.copyBatch(context, jobs, props)
}
