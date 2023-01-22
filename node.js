import { readFile } from 'fs'
import path from 'path'
import process from 'process'
import tokenize from './transpiler.js'

readFile(path.join('./','nixix.js'), 'utf8', (err, module) => {
  if (err) throw err;
  const newModule = tokenize(module);
  console.log(newModule);
})

process.on('uncaughtException', err => {
  console.error(`There was an uncaught error: ${err.stack}`)
  process.exit(1);
})