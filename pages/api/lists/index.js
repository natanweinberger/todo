import { v4 as uuid } from 'uuid'
import { FILENAME, readFromFile, writeToFile } from '../../common'

export default (req, res) => {
    switch (req.method) {
        case 'POST':
            post(req, res)
            break
        case 'PATCH':
            patch(req, res)
            break
        case 'GET':
            get(req, res)
            break
    }
}

const post = (req, res) => {
    const id = uuid()
    console.log(`Creating new list with id ${id}`)
    let contents = readFromFile(FILENAME)
    contents[id] = { title: 'New list', cards: [] }
    writeToFile(FILENAME, JSON.stringify(contents))

    res.statusCode = 200
    res.json({ message: 'ok' })
}

const patch = (req, res) => {
    const contents = req.body
    writeToFile(FILENAME, contents)
    res.statusCode = 200
    res.json({ message: 'ok' })
}

const get = async (req, res) => {
    res.statusCode = 200
    res.json(readFromFile(FILENAME))
}
