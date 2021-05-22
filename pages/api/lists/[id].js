import { FILENAME, readFromFile, writeToFile } from '../../common'

export default (req, res) => {
    switch (req.method) {
        case 'POST':
            post(req, res)
            break
        case 'PATCH':
            patch(req, res)
            break
        case 'DELETE':
            del(req, res)
            break
        case 'GET':
            get(req, res)
            break
    }
}

const patch = async (req, res) => {
    const { id } = req.query
    const updatedList = JSON.parse(req.body)

    updateListById(id, updatedList)

    res.statusCode = 200
    res.json({ message: 'ok' })
}

const get = (req, res) => {
    const { id } = req.query
    res.statusCode = 200
    res.json(readFromFile(FILENAME)[id])
}

const del = (req, res) => {
    const { id } = req.query

    let lists = readFromFile(FILENAME)
    delete lists[id]
    writeToFile(FILENAME, JSON.stringify(lists))

    res.statusCode = 200
    res.json({ message: 'ok' })
}

const updateListById = (id, updatedList) => {
    let lists = readFromFile(FILENAME)
    lists[id] = updatedList
    writeToFile(FILENAME, JSON.stringify(lists))
}
