import { FILENAME, readFromFile, writeToFile } from '../../common'

export default (req, res) => {
    if (req.method === 'PATCH') {
        return patch(req, res);
    } else if (req.method === 'GET') {
        return get(req, res);
    }
};

const patch = async (req, res) => {
    const { id } = req.query
    const updatedList = JSON.parse(req.body)

    update(id, updatedList)

    res.statusCode = 200;
    res.json({'message': 'ok'})
};

const get = (req, res) => {
    const { id } = req.query
    res.statusCode = 200;
    res.json(readFromFile(FILENAME)[id]);
};


const update = (id, updatedList) => {
    let lists = readFromFile(FILENAME)
    lists[id] = updatedList
    writeToFile(FILENAME, JSON.stringify(lists))
}