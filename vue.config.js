const config = module.exports = {
  outputDir: 'docs'
}

if (process.env.NODE_ENV === 'production') {
  config.publicPath = '/Phantom/'
} else {
  config.runtimeCompiler = true
}
