const fs = require('fs')

export const FILENAME = '/Users/natan.weinberger/projects/todo/contents.json'

export const readFromFile = (path) => {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
}

export const writeToFile = (path, contents) => {
    fs.writeFileSync(path, contents)
}

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
