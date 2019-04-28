/**
 * This file provides an `install` function that should install React Native,
 * copy over any folders and template files, and install any desired plugins.
 *
 * It's a simpler version of the one found in https://github.com/infinitered/ignite-ir-boilerplate.
 * Refer to that one to see a more full featured example of what you can do.
 *
 */

const REACT_NATIVE_VERSION = '0.59.5'

/**
 * Let's install.
 *
 * @param {any} context - The gluegun context. Docs: https://infinitered.github.io/gluegun/#/context-api.md
 */
async function install (context) {
  const APP_PATH = process.cwd()
  const PLUGIN_PATH = __dirname

  const {
    filesystem,
    parameters,
    ignite,
    reactNative,
    print,
    system
  } = context

  const name = parameters.third
  const spinner = print
    .spin(`using the ${print.colors.cyan('AirshipBoilerplate')} boilerplate`)
    .succeed()

  // attempt to install React Native or die trying
  // this will also chdir into the new directory
  const rnInstall = await reactNative.install({ name, version: REACT_NATIVE_VERSION })
  if (rnInstall.exitCode > 0) { process.exit(rnInstall.exitCode) }

  // remove the __tests__ directory, App.js, and unnecessary config files that come with React Native
  const filesToRemove = [
    '__tests__',
    'App.js',
    '.flowconfig',
    '.buckconfig',
  ]
  filesToRemove.map(filesystem.remove)

  // copy our App & Tests directories
  spinner.text = '▸ copying files'
  spinner.start()
  filesystem.copy(`${PLUGIN_PATH}/boilerplate/app`, `${APP_PATH}/app`, {
    overwrite: true
  })
  spinner.stop()

  // generate some templates
  spinner.text = '▸ generating files'
  spinner.start()
  const templates = [
    { template: '.env', target: '.env' },
    { template: '.eslintrc', target: '.eslintrc' },
    { template: '.gitattributes', target: '.gitattributes' },
    { template: '.gitignore', target: '.gitignore' },
    { template: '.watchmanconfig', target: '.watchmanconfig' },
    { template: 'app.json.ejs', target: 'app.json' },
    { template: 'babel.config.js', target: 'babel.config.js' },
    { template: 'index.js', target: 'index.js' },
    { template: 'package.json.ejs', target: 'package.json' },
    { template: 'tsconfig.json', target: 'tsconfig.json' }
  ]
  await ignite.copyBatch(context, templates, { name: name }, {
    quiet: true,
    directory: `${PLUGIN_PATH}/boilerplate`
  })
  spinner.stop()

  // run yarn
  spinner.text = '▸ installing ignite dependencies'
  spinner.start()
  await system.run('yarn')
  spinner.stop()

  // react native link -- must use spawn & stdio: ignore or it hangs!! :(
  spinner.text = `▸ linking native libraries`
  spinner.start()
  await system.spawn('react-native link', { stdio: 'ignore' })
  spinner.stop()

  // install any plugins, including ourselves if we have generators.
  // please note you should always do `stdio: 'inherit'` or it'll hang

  try {
    // pass along the debug flag if we're running in that mode
    const debugFlag = parameters.options.debug ? '--debug' : ''

    await system.spawn(`ignite add ${__dirname} ${debugFlag}`, { stdio: 'inherit' })

    // example of another plugin you could install
    // await system.spawn(`ignite add i18n ${debugFlag}`, { stdio: 'inherit' })
  } catch (e) {
    ignite.log(e)
    throw e
  }

  // Wrap it up with our success message.
  print.info('')
  print.info('🍽 Installed!')
  print.info('')
  print.info(print.colors.yellow(`  cd ${name}`))
  print.info(print.colors.yellow('  react-native run-ios'))
  print.info(print.colors.yellow('  react-native run-android'))
  print.info('')
}

module.exports = { install }
