const {
  readFile, 
  writeFile,
  appendFile
} = require('fs')

const path = require('path')
const process = require('process')
const { default: tokenize } = require('./transpiler')

readFile(path.join(__dirname, '.', 'nixix.js'), 'utf8', (err, module) => {
  if (err) throw err;
  const newModule = tokenize(module);
  console.log(newModule)
})