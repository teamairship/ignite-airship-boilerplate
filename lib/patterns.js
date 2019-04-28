const constants = {
  PATTERN_IMPORTS: 'imports'
}

module.exports = {
  constants,
  [constants.PATTERN_IMPORTS]: `import[\\s\\S]*from\\s+"react-navigation";?`,
}
