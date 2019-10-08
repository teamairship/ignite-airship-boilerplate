const addBuildConfigurations = (toolbox, teamId) => {
  const { print, system, parameters } = toolbox
  return new Promise((resolve, reject) => {
    system.run(
      `ruby ${parameters.options.b}/lib/ios.rb make_new_build_configurations ${teamId}`
    )
    resolve()
  })
}

const addBundleIdSuffixes = async (toolbox) => {
  const { print, system, parameters } = toolbox
  return new Promise((resolve, reject) => {
    // TODO: there is some race condition going on here.
    // without setTimeout here, it won't be applied :shrug:
    setTimeout(() => {
      system.run(`ruby ${parameters.options.b}/lib/ios.rb add_bundle_id_suffixes`)
      resolve()
    }, 200)
  })
}
const addSchemes = async (toolbox) => {
  const { print, system, parameters } = toolbox
  return new Promise((resolve, reject) => {
    system.run(`ruby ${parameters.options.b}/lib/ios.rb add_schemes`)
    resolve()
  })
}

module.exports = {
  addBuildConfigurations,
  addBundleIdSuffixes,
  addSchemes
}
