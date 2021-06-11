import { v4 as uuid } from 'uuid'
import { FILENAME, readFromFile, writeToFile } from '../../common'
import { firestore } from '@/lib/db'
import { getSession } from 'next-auth/client'

export default async (req, res) => {
    const session = await getSession({ req })
    console.log(session)
    res.end()
}

// export default async (req, res) => {
//     switch (req.method) {
//         case 'POST':
//             post(req, res)
//             break
//         case 'PATCH':
//             patch(req, res)
//             break
//         case 'GET':
//             get(req, res)
//             break
//     }
// }

const createList = async (uid, title) => {
    const id = uuid()
    const newList = { title, cards: [] }

    const result = await firestore
        .collection('users')
        .doc(uid)
        .collection('lists')
        .doc(id)
        .set(newList)

    return { [id]: newList }
}

const getLists = async (uid) => {
    const data = await firestore
        .collection('users')
        .doc(uid)
        .collection('lists')
        .get()

    let result = {}
    data.docs.forEach((doc) => (result[doc.id] = doc.data()))
    return result
}
const post = async (req, res) => {
    const { uid } = req.query
    const { title } = req.body
    const result = await createList(uid, title)

    res.statusCode = 200
    res.json(result)
}

const patch = (req, res) => {
    const contents = req.body
    writeToFile(FILENAME, contents)
    res.statusCode = 200
    res.json({ message: 'ok' })
}

const get = async (req, res) => {
    const { uid } = req.query
    const data = await getLists(uid)
    const response = { order: [], lists: data }
    res.statusCode = 200
    res.json(response)
}

// Eliminates error message: "API resolved without sending a response for /api/lists, this may result in stalled requests."
export const config = {
    api: {
        externalResolver: true,
    },
}
