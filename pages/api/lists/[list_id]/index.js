import { FILENAME, readFromFile, writeToFile } from '../../../common'

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
    const { list_id } = req.query
    const updatedList = JSON.parse(req.body)

    updateListById(list_id, updatedList)

    res.statusCode = 200
    res.json({ message: 'ok' })
}

const get = (req, res) => {
    const { list_id } = req.query
    res.statusCode = 200
    res.json(readFromFile(FILENAME).lists[list_id])
}

const del = (req, res) => {
    const { list_id } = req.query

    let data = readFromFile(FILENAME)
    delete data.lists[list_id]
    data.order = data.order.filter((item) => item != list_id)
    writeToFile(FILENAME, JSON.stringify(data))

    res.statusCode = 200
    res.json({ message: 'ok' })
}

const updateListById = (id, updatedList) => {
    let data = readFromFile(FILENAME)
    data.lists[id] = updatedList
    writeToFile(FILENAME, JSON.stringify(data))
}
