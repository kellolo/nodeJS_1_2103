const minimist = require('minimist')
const fs = require('fs')
const path = require('path')
const htmlTemplate = require('./htmlTemp.js')

const args = minimist(process.argv.slice(2), {
    alias: {
        name: 'n',
    }
})

const projectName = args.name

fs.mkdirSync(
    path.resolve(__dirname, 'base', projectName)
)

fs.writeFileSync(
    path.resolve(__dirname, 'base', projectName, 'index.html'),
    htmlTemplate(projectName)
)