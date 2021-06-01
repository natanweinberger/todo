import { v4 as uuid } from 'uuid'
import { FILENAME, readFromFile, writeToFile } from '../../../../common'

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

const post = async (req, res) => {
    const { list_id } = req.query
    const card_id = uuid()
    const payload = JSON.parse(req.body)
    const newCard = { id: card_id, isBlocked: false, ...payload }
    const data = readFromFile(FILENAME)

    data.lists[list_id].cards.push(newCard)

    writeToFile(FILENAME, JSON.stringify(data))

    res.statusCode = 200
    res.json(data.lists[list_id].cards)
}

const del = (req, res) => {
    const { id } = req.query

    let data = readFromFile(FILENAME)
    delete data.lists[id]
    data.order = data.order.filter((item) => item != id)
    writeToFile(FILENAME, JSON.stringify(data))

    res.statusCode = 200
    res.json({ message: 'ok' })
}
