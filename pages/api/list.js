const fs = require("fs");
import data from './cards.json';

const FILENAME = './contents.json'

export default (req, res) => {
    if (req.method === 'POST') {
        return post(req, res);
    } else if (req.method === 'GET') {
        return get(req, res);
    }
};

const post = async (req, res) => {
    const contents = req.body
    writeToFile(FILENAME, contents)
    res.statusCode = 200;
    res.json({'message': 'ok'})
};

const get = (req, res) => {
    res.statusCode = 200;
    res.json(readFromFile(FILENAME));
};

const readFromFile = (path) => {
    return fs.readFileSync(path)
}

const writeToFile = (path, contents) => {
    fs.writeFileSync(path, contents);
}
