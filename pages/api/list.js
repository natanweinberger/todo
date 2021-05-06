import data from './cards.json';

export default (req, res) => {
    if (req.method === 'POST') {
        return post(req, res);
    } else if (req.method === 'GET') {
        return get(req, res);
    }
};

const post = (req, res) => {
    res.statusCode = 200;
    res.json({ message: 'Hello' });
};

const get = (req, res) => {
    res.statusCode = 200;
    res.json(data);
};
