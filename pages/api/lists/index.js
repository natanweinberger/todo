import { v4 as uuid } from 'uuid'
import { FILENAME, readFromFile, writeToFile } from '../../common'
import { getSession } from 'next-auth/client'
import { prisma } from '@/lib/prisma'

export default async (req, res) => {
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

const post = async (req, res) => {
    // Get the user
    const session = await getSession({ req })

    const { title } = req.body
    const id = uuid()

    const result = await prisma.list.create({
        data: {
            id,
            title,
            creator_id: session.user.id,
        },
    })

    res.statusCode = 200
    res.json(result)
}

const get = async (req, res) => {
    const session = await getSession({ req })
    const response = await prisma.list.findMany({
        where: {
            creator_id: session.user.id,
        },
        include: {
            cards: {
                include: {
                    status: true,
                },
            },
        },
    })
    res.statusCode = 200
    res.json(response)
}

// Eliminates error message: "API resolved without sending a response for /api/lists, this may result in stalled requests."
export const config = {
    api: {
        externalResolver: true,
    },
}
