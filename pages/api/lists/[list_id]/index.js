import { getSession } from 'next-auth/client'
import { prisma } from '@/lib/prisma'

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            // post(req, res)
            break
        case 'PATCH':
            patch(req, res)
            break
        case 'DELETE':
            del(req, res)
            break
        case 'GET':
            // get(req, res)
            break
    }
}

const patch = async (req, res) => {
    const session = await getSession({ req })
    const { list_id } = req.query
    const { title } = req.body

    const result = await prisma.list.update({
        where: {
            id: list_id,
        },
        data: {
            title,
        },
    })

    res.statusCode = 200
    res.json(result)
}

const del = async (req, res) => {
    const session = await getSession({ req })
    const { list_id } = req.query

    await prisma.card.deleteMany({
        where: {
            list_id: list_id,
        },
    })
    const result = await prisma.list.delete({
        where: {
            id: list_id,
        },
    })

    res.statusCode = 200
    res.json(result)
}
