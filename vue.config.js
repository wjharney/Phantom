const config = module.exports = {
  outputDir: 'docs',
  runtimeCompiler: true
}

if (process.env.NODE_ENV === 'production') {
  config.publicPath = '/Phantom/'
}
